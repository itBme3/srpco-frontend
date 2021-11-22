
<template>
  <div
    class="site-navigation"
    :class="{ 'pr-18': navExpanded && !isMobile }"
    @mouseenter="!isMobile ? navHovered(true) : null"
    @mouseleave="!isMobile ? navHovered(false) : null"
  >
    <gButton
      v-if="isMobile"
      class="mobile-menu-trigger mr-px mt-1 px-3 ml-auto bg-transparent hover:bg-gray-800 hover:text-gray-900"
      @click="navExpanded = !navExpanded"
    >
      <i class="text-gray-400" :class="{ 'gicon-menu': !navExpanded, 'gicon-close': navExpanded }" />
    </gButton>
    <nav
      name="main navigation"
      class="fixed z-[1001] top-12"
      :class="{
        'right-0 left-auto top-12': isMobile,
        'left-2 right-auto top-14': !isMobile,
        'expanded shadow-2xl bg-white p-2': navExpanded,
        'bg-opacity-5 bg-block': !navExpanded
      }"
    >
      <template :v-if="navigation.links && navigation.links[0] && navigation.links[0].link">
        <div
          class="overlay absolute -inset-1 bg-transparent"
          :class="{
            'z-0': navExpanded,
            'z-1': !navExpanded,
          }"
          @click="expandNav()"
          @mouseenter="navExpanded = true"
        />
        <div
          v-for="navLink in navigation.links"
          :key="navLink.id"
          class="nav-link-item mb-1 relative"
          :class="{
            'z-0': !navExpanded,
            'z-1': navExpanded,
          }"
        >
          <div
            v-if="navLink !== undefined && navLink !== null"
            class="nav-link w-full flex content-between items-center"
          >
            <div
              class="w-full flex items-center content-start"
              @click="collapseNav()"
            >
              <Link
                :link="navLink.link"
                :new-tab="!!navLink.openNewTab"
                class="w-full flex content-state items-center"
              >
                <gButton
                  :class="{
                    'bg-opacity-100 bg-gray-100 flex content-start text-left w-full mr-0 px-2': true,
                    'bg-white bg-opacity-95': navLink.link === showNested,
                    'py-2': navExpanded
                  }"
                  :variant="'light'"
                >
                  <i
                    :class="{
                      ['my-auto mr-1 icon transition-all duration-200 ease-quick-in text-srp-red gicon-' + navLink.icon]: true,
                      'text-2xl ml-0': isMobile || navExpanded,
                      'text-3xl': !isMobile && !navExpanded
                    }"
                  />
                  <span :class="{'link-text my-auto': true, 'hidden': !isMobile && !navExpanded }">
                    {{ navLink.text }}
                  </span>
                </gButton>
              </Link>
            </div>
            <gButton
              v-if="Array.isArray(navLink.nested) && navLink.nested.length > 0 && (isMobile || navExpanded)"
              class="toggle-nested px-0 w-12 h-full my-0 ml-px hover:bg-white shadow-none hover:shadow-lg"
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
              'nested-links text-left': true,
              'hidden': !navExpanded || navLink.link !== showNested,
              'p-2 bg-white shadow-2xl mb-4 rounded-md overflow-hidden' : navLink.link === showNested
            }"
            @click="collapseNav()"
          >
            <template v-for="nestedLink in navLink.nested">
              <Link
                :key="nestedLink.id"
                :link="nestedLink.link"
                :new-tab="!!nestedLink.openNewTab"
              >
                <gButton
                  class="w-full mb-1 flex items-center content-start"
                  :variant="'secondary'"
                >
                  <i :class="'my-auto -ml-3 mr-1 icon text-srp-red gicon-' + nestedLink.icon" />
                  <span class="link-text my-auto">{{ nestedLink.text }}</span>
                </gButton>
              </Link>
            </template>
          </div>
        </div>
      </template>
    </nav>
    <div
      v-if="navExpanded && isMobile"
      class="overlay nav-overlay fixed z-[1000] -inset-1 cursor-pointer"
      @click="navExpanded = !navExpanded"
    />
  </div>
</template>

<script lang="js">
/* eslint-disable no-extra-boolean-cast */
import { $graph } from '~/utils/graphql/init'
import { navigationQuery } from '~/utils/graphql/queries/global'

export default {
  asyncData ({ route }) {
    console.log({ fullPath: route.fullPath })
    return { fullPath: route.fullPath }
  },
  data () {
    return {
      navigation: null,
      isMobile: false,
      showNested: null,
      navExpanded: false,
      hoveringNav: false
    }
  },
  async fetch () {
    this.navigation = await $graph.request(navigationQuery).then(res => res.navigation)
  },
  mounted () {
    this.getDocumentDimensions()
    window.addEventListener('resize', this.getDocumentDimensions)
    window.addEventListener('scroll', this.collapseNav)
  },
  unmounted () {
    window.removeEventListener('resize', this.getDocumentDimensions)
    window.removeEventListener('scroll', this.collapseNav)
  },
  methods: {
    toggleNested (val) {
      this.showNested = val === this.showNested ? null : val
    },
    expandNav () {
      if (!this.isMobile) {
        this.navExpanded = false
        return
      }
      this.navExpanded = !this.navExpanded
    },
    collapseNav () {
      if (this.showNested !== null || this.navExpanded === true) {
        this.showNested = null
        this.navExpanded = false
      }
    },
    navHovered (hovering) {
      this.navExpanded = hovering
    },
    getDocumentDimensions () {
      this.width = document.documentElement.clientWidth
      this.height = document.documentElement.clientHeight
      this.isMobile = this.width < 640
      this.navExpanded = false
    }
  }
}

</script>

<style lang="scss">
nav {
  @apply rounded shadow-xl bg-gray-900;
  .nav-link {
    button {
      @apply flex items-center content-start bg-gray-100 rounded;
    }
  }
  &:hover {
    .link-text {
      @apply text-base;
    }
  }
  @media screen and (min-width: 640px) {
    &:not(:hover) {
      .nav-link {
        button {
          @apply flex-col text-center content-center w-[60px];
        }
      }
      .link-text {
        @apply text-[7px];
      }
    }
  }
  @media screen and (max-width: 639px) {
    @apply w-[240px];
    &:not(.expanded) {
      @apply hidden;
    }
    &.expanded {
      @apply shadow-2xl rounded overflow-hidden p-2;
    }
  }
}
</style>
