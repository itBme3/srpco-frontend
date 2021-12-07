<template>
  <div
    class="header ml-auto"
    :class="{ 
      'search-expanded': expanded, 
      'w-full sm:w-auto mr-1': !expanded,
    }"
  >
    <div class="site-search px-1 w-full flex items-center content-end">
      <SearchInput
        :autocomplete="'off'"
        :placeholder="placeholder"
        :tabindex="0"
        :search="searchValue"
        class="site-search-input bg-gray-800 hover:bg-opacity-100 z-[1005]"
        :class="{ 'bg-opacity-40': !expanded }"
        variant="header"
        @clear="updateSearchValue('')"
        @focus="inputFocused"
        @search="updateSearchValue($event)"
        @blur="storeSearch()"
      />
      <Link
        v-if="!expanded"
        :link="'/contact'"
        class="transform scale-95 hover:scale-100"
      >
      <gButton class="header-contact-button hidden sm:inline rounded-full bg-green-400 hover:bg-opacity-100 bg-opacity-80 text-green-900 uppercase font-bold whitespace-nowrap mx-2 text-sm py-2">
        <i class="gicon-contact"></i>
        <span class="hidden sm:inline">let's talk</span>
      </gButton>
      </Link>
    </div>
    <SiteHeaderSearchBox
      class="site-search-expanded"
      :expanded="expanded"
      @close="expanded = false"
    />
    <div
      v-if="expanded"
      class="backdrop bg-gray-900 bg-opacity-70 z-[1003] fixed w-screen h-screen inset-0 cursor-pointer"
      @click="expanded = false"
    />
  </div>
</template>

<script>
const searchCollections = ['search', 'gaskets', 'datasheets', 'resources', 'materials', 'applications']
export default {
  data () {
    const { q: searchValue = '' } = this.$router.currentRoute.query
    return {
      placeholder: 'What are you looking for?',
      searchCollection: null,
      expanded: false,
      searchValue,
      recentSearches: []
    }
  },
  fetch ({ route }) {
    this.searchCollection = searchCollections.includes(route.split('/')[1])
      ? route.split('/')[1]
      : null
    const { q: searchValue = '' } = [null, undefined].includes(route.query) ? {} : route.query
    this.searchValue = searchValue
    return { searchValue }
  },
  computed: {
    path () {
      const root = this.$route.fullPath.split('/')[1].split('?')[0]
      if (searchCollections.includes(root) && this.$route.fullPath.split('/').length === 2) {
        return null
      }
      return searchCollections.includes(root) ? `/${root}` : '/search'
    }
  },
  watch: {
    '$route.query': {
      immediate: false,
      handler ({ q }) {
        if (typeof q !== 'string' || q === '') {
          this.searchValue = ''
        }
        this.storeSearch()
      }
    },
    '$route.fullPath': {
      handler () {
        this.expanded = false
      }
    }
  },
  mounted () {
    if (typeof this.searchValue === 'string' && this.searchValue !== '') {
      this.storeSearch()
    }
  },
  methods: {
    inputFocused () {
      this.expanded = true
    },
    updateSearchValue (val) {
      const { query = {} } = this.$router
      if (this.searchValue !== val) {
        this.searchValue = val
      }
      if ((typeof val !== 'string' || val.trim().length === 0) && Object.keys(query).includes('q')) {
        delete query.q
      } else if (query.q !== val) {
        query.q = val
      }
      this.expanded = false
      if (['', null, undefined].includes(query.q)) {
        delete query.q
      }
      if (this.path === null) {
        this.$router.push({ name: 'search', query },
          success => success,
          err => console.error(err))
      } else {
        this.$router.replace({ path: this.path, query })
      }
    },
    storeSearch () {
      const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || []
      const searchValue = this.searchValue.toLowerCase()
      this.recentSearches = storedSearches
      if (typeof this.searchValue === 'string' && this.searchValue !== '') {
        this.recentSearches = this.recentSearches.filter(s => searchValue.indexOf(s.toLowerCase()) !== 0)
        if (this.recentSearches.filter(s => s.toLowerCase().indexOf(searchValue) === 0).length === 0) {
          this.recentSearches.push(this.searchValue)
        }
      }
      localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches))
    }
  }
}
</script>

<style lang="scss">
.header {
  @apply relative sm:fixed sm:left-[96px] p-1 top-0 bg-gray-900 sm:right-0;
  .site-search {
    @apply max-w-6xl mx-auto;
  }
  &.search-expanded {
    @apply fixed top-2 left-0 transform w-screen z-99999;
    .site-search,
    .site-search-expanded {
      @apply mt-0 mx-auto;
    }
    input {
      @apply text-center;
    }
    @media screen and (max-width: 639px) {
      @apply bg-transparent;
    }
  }
}
.site-search-expanded {
  @apply max-w-6xl;
  @apply rounded-t-sm rounded-b-lg;
  @apply transition duration-200 ease-quick-in p-4 z-[1005] bg-gray-800 shadow-2xl transform;
  @apply fixed sm:absolute left-1 right-1;
}

.site-search-input {
  input {
    @apply relative top-px py-[.45em] sm:placeholder-gray-500 placeholder-gray-800;
  }
  i[class*="gicon-"] {
    @apply text-gray-300;
  }
  .action-button {
    @apply px-2 bg-gray-800;
    box-shadow: -3px 0 6px 0px rgba(31, 41, 55, 1) !important;
  }
}
</style>
