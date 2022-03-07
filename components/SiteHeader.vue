<template>
  <div
    class="header ml-auto"
    :class="{ 
      'search-expanded': expanded, 
      'w-full sm:w-auto mr-1': !expanded,
      'is-mobile': isMobile,
      'pt-6': scrolling.direction === 'up' && !expanded,
    }"
  >
    <div :class="{
      'top-bar h-6 absolute top-0 left-0 right-0 overflow-hidden text-xs text-gray-400': true,
      '-top-8': scrolling.direction !== 'up'
    }">
      <p class="certified-iso my-auto ml-2 sm:ml-1 sm:mt-1 sm:mb-auto">
        <span class="text-red-srp whitespace-nowrap">Certified ISO</span> 9001:2015
      </p>

      <a
        href="tel:+18003336322"
        class="flex items-center justify-start whitespace-nowrap"
      >
        Call Us: 800.333.6322
      </a>

      <gButton
        v-if="isMobile"
        class="transform scale-80 translate-x-[10%] hover:scale-95 header-contact-button rounded bg-green-400 w-auto text-green-900 uppercase font-bold whitespace-nowrap mx-2 text-sm py-2"
        @click="$router.push('/contact')"
      >
        let's talk
      </gButton>

    </div>
    <div class="header-content flex flex-nowrap items-center content-start">
      <a
        href="/"
        class="header-logo my-auto sm:my-0 mr-2"
      >
        <Logo class="h-[38px] ml-1 top-0 w-auto my-auto mr-auto" />
      </a>

      <SiteNav :mobile="isMobile" />

      <div class="site-search px-1 w-full flex items-center content-end">
        <SearchInput
          :autocomplete="'off'"
          :placeholder="placeholder"
          :tabindex="0"
          :search="searchValue"
          class="site-search-input bg-gray-800 hover:bg-opacity-100 z-[1005] flex items-center pr-12"
          :class="{ 'bg-opacity-70': !expanded }"
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
        <gButton
          v-if="!expanded && !isMobile"
          class="transform scale-95 hover:scale-100 header-contact-button hidden sm:flex rounded-full bg-green-400 w-auto text-green-900 uppercase font-bold whitespace-nowrap mx-2 text-sm py-2"
          @click="$router.push('/contact')"
        >
          <i class="gicon-contact"></i>
          <span class="hidden sm:inline">let's talk</span>
        </gButton>
      </div>
      <SiteHeaderSearchBox
        class="site-search-box"
        :expanded="expanded"
        @close="expanded = false"
      />
    </div>
    <div
      v-if="expanded"
      class="backdrop bg-gray-900 bg-opacity-70 z-[1003] fixed w-screen h-screen inset-0 cursor-pointer"
      @click="expanded = false"
    />
  </div>
</template>

<script>
import qs from 'qs'
import _ from 'lodash'
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
      recentSearches: [],
      scrolling: {
        last: 0,
        direction: 'up'
      },
      isMobile: false
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
    this.getDocumentDimensions()
    window.addEventListener('resize', this.getDocumentDimensions)
    window.addEventListener('scroll', this.getScrollDirection)
  },
  unmounted () {
    window.removeEventListener('resize', this.getDocumentDimensions)
    window.removeEventListener('scroll', this.getScrollDirection)
  },
  methods: {
    getScrollDirection () {
      this.scrolling.direction = window.scrollY <= this.scrolling.last ? 'up' : 'down';
      this.scrolling.last = window.scrollY;
    },
    getDocumentDimensions: _.debounce(function () {
      if (document === undefined) return;
      this.width = document.documentElement.clientWidth
      this.isMobile = this.width < 640
    }, 250),
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
</style>
