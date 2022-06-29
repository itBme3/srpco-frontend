
<template>
  <div
:class="{
      'site-navigation': true,
      'is-mobile': $store.state.window.isMobile,
      'expanded': navExpanded
    }">
    <gButton
      v-if="$store.state.window.isMobile"
      class="mobile-menu-trigger flex items-center justify-center h-full mr-px px-3 py-3 ml-auto bg-gray-800 bg-opacity-50 hover:bg-opacity-100 hover:text-gray-900"
      @click="navExpanded = !navExpanded"
    >
      <i
        class="text-gray-400"
        :class="{ 'gicon-menu': !navExpanded, 'gicon-close': navExpanded }"
      />
    </gButton>
    <nav name="main navigation">
      <template 
        v-if="navLinks && navLinks[0] && navLinks[0].link">
        <div
          v-for="navLink in navLinks"
          :key="navLink.id"
          :class="{
            'nav-link-item': true,
            'has-nested-links': Array.isArray(navLink.nested) && navLink.nested.length > 0,
            'bg-gray-200 text-gray-700': showNested === navLink.link
          }"
          @mouseenter="!$store.state.window.isMobile ? toggleNested(navLink.link) : ''"
          @mouseleave="showNested = $store.state.window.isMobile ? showNested : nestedHovered !== navLink.link ? false : navLink.link;"
        >
          <div
            v-if="navLink !== undefined && navLink !== null"
            class="nav-link w-full flex content-between items-center"
          >
            <div class="w-full flex items-center content-start">
              <Link
                :to="navLink.link"
                :new-tab="!!navLink.openNewTab"
                :is-button="true"
                class="w-full flex content-state items-center"
                :class="{
                    'whitespace-nowrap bg-opacity-100 bg-transparent text-center w-full mr-0 px-2 hover:bg-white': true,
                    'bg-white bg-opacity-95': navLink.link === showNested,
                    'pr-1': Array.isArray(navLink.nested) && navLink.nested.length > 0
                  }"
                :variant="'light'"
              >
                {{ navLink.text }}
              </Link>
            </div>
            <gButton
              v-if="Array.isArray(navLink.nested) && navLink.nested.length > 0"
              class="toggle-nested whitespace-nowrap px-0 w-8 h-full my-0 ml-px bg-transparent hover:bg-white shadow-none hover:shadow-lg"
              :class="{ '!bg-white bg-opacity-100': showNested !== null && navLink.link === showNested }"
              :variant="'secondary'"
              @click="toggleNested(navLink.link)"
            >
              <i :class="{ 'gicon-angle-down': showNested !== navLink.link, 'gicon-angle-up': showNested === navLink.link }" />
            </gButton>
          </div>
          <div
            v-if="Array.isArray(navLink.nested) && navLink.nested.length > 0"
            :class="{
              'nested-links-wrapper': true,
              'hidden': navLink.link !== showNested,
            }"
            @click="collapseNav()"
            @mouseenter="nestedHovered = navLink.link"
            @mouseleave="nestedHovered = false"
          >
            <div class="nested-links">
              <Link
                  v-for="nestedLink in navLink.nested"
                :key="nestedLink.id"
                :to="nestedLink.link"
                :new-tab="!!nestedLink.openNewTab"
                :is-button="true"
                class="w-full mb-1 text-center whitespace-nowrap hover:bg-white px-2"
              >
                {{ nestedLink.text }}
              </Link>
            </div>
          </div>
          <div
            v-if="Array.isArray(navLink.nested) && navLink.nested.length > 0 && $store.state.window.isMobile && showNested !== navLink.link"
            class="bg-transparent absolute inset-0 left-1/2"
            @click="showNested = navLink.link"
          />
        </div>
      </template>
    </nav>
    <div
      v-if="navExpanded && $store.state.window.isMobile || !!showNested"
      class="overlay nav-overlay fixed z-9999 -inset-1 cursor-pointer bg-gray-900 md:bg-transparent bg-opacity-70"
      @click="collapseNav"
    />
  </div>
</template>

<script>

import Vue from 'vue'
export default Vue.extend({
  props: {
    mobile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fullPath: this.$route.fullPath,
      navigation: null,
      showNested: null,
      navExpanded: false,
      nestedHovered: false
    }
  },
  async fetch () {
    this.navigation = await this.$content('navigation').fetch()
  },
  computed: {
    navLinks () {
      return Array.isArray(this.navigation?.links) ? this.navigation?.links : []
    }
  },
  watch: {
    '$route.fullPath' () {
      this.collapseNav();
      window.scrollTo({ top: 0 });
    }
  },
  methods: {
    toggleNested (val) {
      this.showNested = val === this.showNested ? null : val
      this.nestedHovered = !this.showNested ? false : this.nestedHovered
    },
    collapseNav () {
      if (this.showNested !== null || this.navExpanded === true) {
        this.showNested = null
        this.navExpanded = false
      }
    },
    navHovered (hovering) {
      this.navExpanded = hovering
    }
  }
})

</script>

<style lang="scss">
// .header {
//   &:not(.is-mobile) {
//     .nested-links {
//       @apply absolute top-11 z-999999;
//     }
//   }
// }
</style>
