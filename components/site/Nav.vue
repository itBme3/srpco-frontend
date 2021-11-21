
<template>
  <div>
    <t-button
      v-if="isMobile"
      class="mobile-menu-trigger mr-0 ml-auto bg-transparent hover:bg-gray-100 hover:text-gray-900"
      @click="toggleMobileMenu()"
    >
      <i :class="{ 'gicon-menu': !mobileNavOpened, 'gicon-close': mobileNavOpened }" />
    </t-button>
    <nav
      name="main navigation"
      class="fixed z-[1001] right-0 top-12 bg-gray-100"
      :class="{'mobile-opened': mobileNavOpened}"
    >
      <template :v-if="navigation.links && navigation.links[0] && navigation.links[0].link">
        <div
          v-for="navLink in navigation.links"
          :key="navLink.id"
          class="nav-link-item mb-1"
        >
          <div
            v-if="navLink !== undefined && navLink !== null"
            class="nav-link w-full flex content-between items-center"
          >
            <div
              class="w-full"
              @click="closeMobileMenu()"
            >
              <Link
                :link="navLink.link"
                :new-tab="!!navLink.openNewTab"
                class="w-full"
              >
                <t-button
                  class="w-full"
                  :class="{ 'bg-white': navLink.link === showNested }"
                  :classes="'w-full rounded bg-white shadow'"
                  :variant="'secondary'"
                >
                  <i :class="'my-auto -ml-3 mr-1 icon text-srp-red gicon-' + navLink.icon" />
                  <span class="link-text my-auto">{{ navLink.text }}</span>
                </t-button>
              </Link>
            </div>
            <t-button
              v-if="Array.isArray(navLink.nested) && navLink.nested.length > 0"
              class="px-0 w-8 ml-px hover:bg-white hover:shadow-lg"
              :class="{ '!bg-white bg-opacity-100': showNested !== null && navLink.link === showNested }"
              @click="toggleNested(navLink.link)"
              :variant="'secondary'"
            >
              <i :class="{ 'gicon-angle-down': showNested !== navLink.link, 'gicon-angle-up': showNested === navLink.link }" />
            </t-button>
          </div>
          <div
            :v-if="Array.isArray(navLink.nested) && navLink.nested.length > 0"
            :class="{
              'nested-links': true,
              'hidden': navLink.link !== showNested,
              'p-2 bg-white shadow-2xl mb-4 rounded-md overflow-hidden' : navLink.link === showNested
            }"
            @click="closeMobileMenu()"
          >
            <template
              v-for="nestedLink in navLink.nested"
            >
              <Link
                :key="nestedLink.id"
                :link="nestedLink.link"
                :new-tab="!!nestedLink.openNewTab"
              >
                <t-button
                  class="w-full mb-1"
                  :variant="'secondary'">
                  <i :class="'my-auto -ml-3 mr-1 icon text-srp-red gicon-' + nestedLink.icon" />
                  <span class="link-text my-auto">{{ nestedLink.text }}</span>
                </t-button>
              </Link>
            </template>
          </div>
        </div>
      </template>
    </nav>
    <div
      v-if="mobileNavOpened && isMobile"
      class="overlay nav-overlay fixed z-[1000] -inset-1"
      @click="mobileNavOpened = false"
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
      mobileNavOpened: false,
      isMobile: true,
      showNested: null
    }
  },
  async fetch () {
    this.navigation = await $graph.request(navigationQuery).then(res => res.navigation)
  },
  // watch: {
  //   fullPath: {
  //     immediate: true,
  //     handler (e) {
  //       console.log(e)
  //       this.mobileNavOpened = false
  //     }
  //   }
  // },
  mounted () {
    this.getDocumentDimensions()
    window.addEventListener('resize', this.getDocumentDimensions)
  },
  unmounted () {
    window.removeEventListener('resize', this.getDocumentDimensions)
  },
  methods: {
    toggleNested (val) {
      this.showNested = val === this.showNested ? null : val
    },
    toggleMobileMenu () {
      if (!this.isMobile) {
        this.mobileNavOpened = false
        return
      }
      this.mobileNavOpened = !this.mobileNavOpened
    },
    closeMobileMenu () {
      this.showNested = null
      this.mobileNavOpened = false
    },
    getDocumentDimensions () {
      this.width = document.documentElement.clientWidth
      this.height = document.documentElement.clientHeight
      this.isMobile = this.width < 640
      this.mobileNavOpened = false
    }
  }
}

</script>

<style lang="scss">
nav {
  @apply rounded shadow-md;
  .navLink {
    @apply bg-gray-100 rounded shadow;
  }
  @media screen and (min-width: 640px) {
    &:not(:hover) {
      .link-text {
        @apply hidden;
      }
    }
  }
  @media screen and (max-width: 639px) {
    @apply w-[240px];
    &:not(.mobile-opened) {
        @apply hidden;
    }
    &.mobile-opened {
        @apply shadow-2xl rounded overflow-hidden p-2
    }
  }
}
</style>
