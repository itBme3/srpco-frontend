<template>
  <div
    class="header ml-auto"
    :class="{ 
      'search-expanded': expanded, 
      'is-mobile': $store.state.screen.isMobile
    }"
  >
    <div
:class="{
      'top-bar': true,
      'hidden': $store.state.scrolling.direction !== 'up' || expanded
    }">
      <div class="top-bar-content">
        <p>
          <span class="text-gray-500 whitespace-nowrap">{{ $store.state.screen.width >= 480 ? 'Certified ISO' : 'ISO' }}:</span> 9001:2015
        </p>

        <p
:class="{
            'certified-iso': true,
            'hidden': $store.state.screen.width < 600
          }">
          <Icon
            icon-name="location"
            class="text-gray-600 relative top-px"
          /> Elk Grove Village, IL, USA
        </p>

        <a
          href="tel:+18003336322"
          class="self-center"
        >
          <Icon
            icon-name="call"
            class="text-gray-600 relative top-[.1rem]"
          /> 800.333.6322
        </a>
      </div>

      <gButton
        v-if="$store.state.screen.width <= 1200"
        class="transform scale-100 hover:scale-97 py-[.1rem] px-[.25rem] rounded bg-green-400 hover:bg-green-500 w-auto text-green-900 uppercase font-bold whitespace-nowrap text-xs mr-0"
        :class="{
          'absolute right-3': $store.state.screen.width > 850
        }"
        @click="$router.push('/contact')"
      >
        Get a Quote
      </gButton>

    </div>
    <div class="header-content flex flex-nowrap items-center content-start">
      <a
        href="/"
        class="header-logo my-auto sm:my-0 mr-2"
      >
        <Logo class="h-[38px] ml-1 top-0 w-auto my-auto mr-auto" />
      </a>

      <SiteNav :class="{'hidden': expanded}" />

      <div class="site-search px-1 w-full flex items-center content-end">
        <SearchInput
          :autocomplete="'off'"
          :placeholder="placeholder"
          :tabindex="0"
          :search="searchValue"
          class="site-search-input bg-gray-800 hover:bg-opacity-100 z-[1005] flex items-center"
          :class="{ 'bg-opacity-70': !expanded }"
          variant="header"
          @clear="searchValue = ''"
          @focus="inputFocused"
          @search="searchValue = $event"
          @blur="storeSearch()"
        >
          <gButton
            v-if="![null, 'search'].includes(searchCollection)"
            :class="{
              'scale-80 text-sm bg-orange-400 text-orange-900 p-1 w-auto mr-8': true,
              'hidden': !expanded
              }"
            @click="() => {
              searchCollection = 'search';
              if(!!searchValue && !!searchValue.length) {
                updateSearchValue()
              }
            }"
          >
            <span class="my-auto">{{ searchCollection }}</span>
            <Icon
              class="my-auto ml-2 text-orange-900"
              icon-name="close"
            />
          </gButton>
        </SearchInput>
        <gButton
          v-if="!expanded && $store.state.screen.width > 1200"
          class="transform scale-95 hover:scale-100 header-contact-button hidden sm:flex rounded-full bg-green-400 w-auto text-green-900 uppercase font-bold whitespace-nowrap mx-2 text-sm py-2"
          @click="$router.push('/contact')"
        >
          get a quote
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
import Vue from 'vue'
const searchCollections = ['search', 'gaskets', 'datasheets', 'resources']
export default Vue.extend({
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
    this.$store.commit('screen/set')
    window.addEventListener('resize', this.getDocumentDimensions, { passive: true })
    window.addEventListener('scroll', this.setScrolling, { passive: true })
    window.addEventListener('keyup', this.handleKeyupEsc, {passive: true})
  },
  unmounted () {
    window.removeEventListener('resize', this.getDocumentDimensions)
    window.removeEventListener('scroll', this.setScrolling)
    window.removeEventListener('keyup', this.handleKeyupEsc)
  },
  methods: {
    setScrolling () {
      this.$store.commit('scrolling/set')
    },
    getDocumentDimensions: _.debounce(function () {
      this.$store.commit('screen/set')
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
    },
    handleKeyupEsc (e) {
      const key = e.key || e.keyCode;
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        this.expanded = false
      }
    }
  }
})
</script>

<style lang="scss">
.header,
.header-and-nav {
  background-color: rgba(7, 14, 29, 1) !important;
}
</style>
