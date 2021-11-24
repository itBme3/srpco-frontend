<template>
  <div class="header">
    <SearchInput
      class="site-search-input bg-gray-800 z-[1003]"
      :autocomplete="'off'"
      :placeholder="placeholder"
      :tabindex="0"
      :search="searchValue"
      variant="header"
      @clear="updateSearchValue('')"
      @focus="inputFocused"
      @search="updateSearchValue($event)"
      @blur="storeSearch()"
    />
    <div
      class="header-search-box"
      :class="{
        'expanded opacity-100 translate-y-0 top-12 animate-fade-in-down': expanded,
        'opacity-0 -translate-y-full -top-40': !expanded
      }"
    >
      search box
      <gButton
        classes="rounded-lg p-4 hover:bg-gray-200 hover:bg-opacity-5 absolute right-2 top-2"
        @click="expanded = false"
      >
        <i class="gicon-close text-red-400" />
      </gButton>
    </div>
    <div
      v-if="expanded"
      class="backdrop bg-gray-900 bg-opacity-70 z-[1000] fixed inset-0 cursor-pointer"
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
        console.log({ q })
        if (typeof q !== 'string' || q === '') {
          this.searchValue = ''
        }
        this.storeSearch()
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
  @apply fixed left-[102px] right-[50px] sm:right-0
}
.header-search-box {
  @apply w-full max-w-[1080px];
  @apply transition duration-200 ease-quick-in p-4 z-[1001] bg-gray-800 rounded-lg shadow-2xl transform;
  @apply fixed sm:absolute left-1 sm:left-0 md:-translate-x-1/2 md:left-1/2;
}
.site-search-input i[class*="gicon-"] {
  @apply text-gray-300
}
</style>
