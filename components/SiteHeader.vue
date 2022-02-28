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
        class="site-search-input bg-gray-800 hover:bg-opacity-100 z-[1005] flex items-center pr-12"
        :class="{ 'bg-opacity-40': !expanded }"
        variant="header"
        @clear="searchValue = ''"
        @focus="inputFocused"
        @search="searchValue = $event"
        @blur="storeSearch()"
      >
        <gButton
          @click="() => {
            searchCollection = 'search';
            if(!!searchValue && !!searchValue.length) {
              updateSearchValue()
            }
          }"
          v-if="![null, 'search'].includes(searchCollection)"
          class="scale-80 text-sm bg-orange-400 text-orange-900 p-1 w-auto"
        ><span class="my-auto">{{ searchCollection }}</span>
          <Icon
            class="my-auto ml-2 text-orange-900"
            icon-name="close"
          />
        </gButton>
      </SearchInput>
      <Link
        v-if="!expanded"
        :link="'/contact'"
        class="transform scale-95 hover:scale-100"
      >
      <gButton class="header-contact-button hidden sm:flex rounded-full bg-green-400 hover:bg-opacity-100 bg-opacity-80 text-green-900 uppercase font-bold whitespace-nowrap mx-2 text-sm py-2">
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
import qs from 'qs'
const searchCollections = ['search', 'gaskets', 'datasheets', 'resources']
export default {
  data () {
    const { q: searchValue = '' } = this.$route.query
    const searchCollection = searchCollections.includes(this.$route.path.split('/')[1])
      ? this.$route.path.split('/')[1]
      : null;
    return {
      placeholder: 'What are you looking for?',
      searchCollection,
      expanded: false,
      searchValue,
      recentSearches: []
    }
  },
  watch: {
    '$route.path' () {
      this.expanded = false
      this.searchCollection = searchCollections.includes(this.$route.path.split('/')[1])
        ? this.$route.path.split('/')[1]
        : null
      if (!searchCollections.includes(this.searchCollection) || this.$route.path.split('/').length > 2) {
        this.searchValue = ''
      }
    },
    searchValue () {
      if (!this.searchValue?.length && (!searchCollections.includes(this.searchCollection) || this.$route.path.split('/').length > 2)) {
        return;
      }
      this.updateSearchValue()
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
    updateSearchValue () {
      const query = JSON.parse(JSON.stringify(this.$route.query))
      this.expanded = false
      if ((typeof this.searchValue !== 'string' || this.searchValue.trim().length === 0) && Object.keys(query).includes('q')) {
        delete query.q
      } else if (query.q !== this.searchValue) {
        query.q = this.searchValue
      }
      const searchCollection = this.searchCollection === null ? 'search' : this.searchCollection
      const queryString = qs.stringify(query)
      const path = !queryString?.length ? `/${searchCollection}` : `/${searchCollection}?${queryString}`
      if (path === this.$route.fullPath) return;
      this.$router.replace(path, success => success, console.error)
    },
    storeSearch () {
      const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || []
      const searchValue = this.searchValue.toLowerCase()
      this.recentSearches = storedSearches
      if (typeof this.searchValue === 'string' && this.searchValue !== '') {
        this.recentSearches = this.recentSearches.filter(s => searchValue?.indexOf(s.toLowerCase()) !== 0)
        if (this.recentSearches.filter(s => s.toLowerCase()?.indexOf(searchValue) === 0).length === 0) {
          this.recentSearches.push(this.searchValue)
        }
      }
      localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches))
    }
  }
}
</script>

<style lang="scss">
.header,
.header-and-nav {
  background-color: rgba(7, 14, 29, 1) !important;
}
.header {
  @apply relative sm:fixed sm:left-[96px] p-1 top-0 sm:right-0;
  .site-search {
    @apply max-w-6xl mx-auto;
    input {
      @apply text-center;
    }
  }
  &.search-expanded {
    @apply fixed top-2 left-0 transform w-screen z-99999;
    .site-search,
    .site-search-expanded {
      @apply mt-0 mx-auto;
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
:not(.search-expanded) {
  .site-search {
    @apply max-w-[1150px] mx-auto right-auto left-auto;
    .search-input {
      @apply bg-transparent #{!important};
      i[class*="gicon-"] {
        @apply text-gray-300;
      }
      .action-button {
        @apply px-2 bg-transparent;
      }
    }
  }
}
</style>
