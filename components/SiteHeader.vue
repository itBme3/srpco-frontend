<template>
  <div
    class="header ml-auto"
    :class="{ 
      'search-expanded': expanded, 
      'is-mobile': $store.state.window.isMobile
    }"
  >
    <div
:class="{
      'top-bar': true,
      'hidden': $store.state.scrolling.direction !== 'up' || expanded
    }">
      <div class="top-bar-content">
        <p>
          <span class="text-gray-500 whitespace-nowrap">{{ $store.state.window.width >= 480 ? 'Certified ISO' : 'ISO' }}:</span> 9001:2015
        </p>

        <p
          class="certified-iso flex"
          :class="{
            'hidden': $store.state.window.width < 600
          }">
          <Icon
            icon-name="location"
            class="text-gray-600 relative top-px mr-2 h-[.9rem]"
          /> Elk Grove Village, IL, USA
        </p>

        <Link
          to="tel:+18003336322"
          class="self-center flex"
          @click="$gtag.event('button_click_call', {
              event_category: 'contact us', 
              value: '18003336322', 
              event_label: $route.path,
              click_destination: '18003336322',
            })"
        >
          <Icon
            icon-name="call"
            class="text-gray-600 relative top-[.1rem] mr-2 h-[.9rem]"
          />
          800.333.6322
        </Link>
      </div>

      <gButton
        v-if="$store.state.window.width <= 1200"
        class="transform scale-100 hover:scale-97 py-[.1rem] px-[.25rem] rounded bg-green-400 hover:bg-green-500 w-auto text-green-900 uppercase font-bold whitespace-nowrap text-xs mr-0"
        :class="{
          'absolute right-3': $store.state.window.width > 850
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
        <Logo class="h-[38px] top-0 w-auto my-auto mr-auto" />
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
        </SearchInput>
        <gButton
          v-if="!expanded && $store.state.window.width > 1200"
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
import { asyncDelay, scrollToElement } from '~/utils/funcs'
export default Vue.extend({
  data () {
    const { q: searchValue = '' } = this.$route.query
    // const searchCollection = searchCollections.includes(this.$route.path.split('/')[1])
    //   ? this.$route.path.split('/')[1]
    //   : null;
    return {
      placeholder: 'What are you looking for?',
      expanded: false,
      searchValue,
      recentSearches: [],
      isMobile: false,
      shouldUpdateSearch: true
    }
  },
  watch: {
    '$route.path' () {
      this.expanded = false
      if (this.$route.path.split('/').length > 2) {
        this.shouldUpdateSearch = false;
        this.searchValue = '';
        setTimeout(() => (this.shouldUpdateSearch = true));
      }
    },
    '$route.hash' (val) {
      let lastOffsetTop = 0;
      const offset = 0;
      for (let i = 1; i < 10; i++) {
        asyncDelay(i * 200).then(() => {
          if (!window || val?.replace('#', '').length === 0) {
            return
          }
          const matchingEl = document?.querySelector(val);
          if (!matchingEl) {
            return
          }
          if (lastOffsetTop !== matchingEl.offsetTop - offset) {
            scrollToElement(matchingEl)
            lastOffsetTop = matchingEl.offsetTop - offset
          }
        })
      }

    },
    searchValue () {
      // if (!this.searchValue?.length && (!searchCollections.includes(this.searchCollection) || this.$route.path.split('/').length > 2)) {
      //   return;
      // }
      if (this.shouldUpdateSearch) {
        this.updateSearchValue()
      }
    }
  },
  mounted () {
    this.$store.commit('window/set')
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
      this.$store.commit('window/set')
    }, 250),
    inputFocused () {
      this.expanded = true
    },
    updateSearchValue () {
      const query = JSON.parse(JSON.stringify(this.$route.query));
      this.expanded = false;
      if ((typeof this.searchValue !== 'string' || this.searchValue.trim().length === 0) && Object.keys(query).includes('q')) {
        delete query.q
      } else if (this.searchValue.trim().length > 0 && query.q !== this.searchValue) {
        query.q = this.searchValue
      }
      const queryString = qs.stringify(query);
      const path = `/search${queryString.length > 1 ? `?${queryString}` : ''}`;
      console.log({ path, "$route.fullPath": this.$route.fullPath }, path === this.$route.fullPath);
      if (path === this.$route.fullPath) {
        return
      }
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
