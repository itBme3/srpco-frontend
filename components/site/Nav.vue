
<template>
  <div>
    <t-button
      v-if="isMobile"
      class="mobile-menu-trigger mr-0 ml-auto bg-transparent hover:bg-gray-100 hover:text-gray-900"
      @click="toggleMobileMenu()"
    >
      <i :class="{ 'gicon-menu': !mobileNavOpened, 'gicon-close': mobileNavOpened }"></i>
    </t-button>
    <nav
      name="main navigation"
      :class="{'mobile-opened': mobileNavOpened}"
    >
      <template :v-if="navigation.links && navigation.links[0] && navigation.links[0].link">
        <div
          v-for="navLink in navigation.links"
          :key="navLink.link"
          class="nav-link w-full"
        >
          <ButtonWithLink
            :link="navLink.link"
            :new-tab="!!navLink.openNewTab"
            :classes="{ button: 'w-full rounded-none' }"
          >
            <i :class="'my-auto -ml-3 mr-1 icon text-srp-red gicon-' + navLink.icon" />
            <span class="link-text my-auto">{{ navLink.text }}</span>
          </ButtonWithLink>
        </div>
      </template>
    </nav>
  </div>
</template>

<script lang="js">
/* eslint-disable no-extra-boolean-cast */
import { $graph } from '~/utils/graphql/init'
import { navigationQuery } from '~/utils/graphql/queries/global'

export default {
  data () {
    return {
      navigation: null,
      mobileNavOpened: false,
      isMobile: true
    }
  },
  async fetch () {
    this.navigation = await $graph.request(navigationQuery).then(res => res.navigation)
  },
  mounted () {
    this.getDocumentDimensions()
    window.addEventListener('resize', this.getDocumentDimensions)
  },
  unmounted () {
    window.removeEventListener('resize', this.getDocumentDimensions)
  },
  methods: {
    toggleMobileMenu () {
      // eslint-disable-next-line vue/no-mutating-props
      console.log({ mobileNavOpened: this.mobileNavOpened })
      if (!this.isMobile) {
        this.mobileNavOpened = false
        return
      }
      this.mobileNavOpened = !this.mobileNavOpened
    },
    getDocumentDimensions () {
      console.log(document.documentElement.clientWidth)
      this.width = document.documentElement.clientWidth
      this.height = document.documentElement.clientHeight
      this.isMobile = this.width < 640
      this.mobileNavOpened = false
      console.log(this.isMobile)
    }
  }
}

</script>

<style>
@media screen and (min-width: 640px) {
  nav:not(:hover) .link-text {
      @apply hidden;
  }
  /* nav:not(:hover) .nav-link {
      @apply hidden;
  } */
}
@media screen and (max-width: 639px) {
  nav:not(.mobile-opened) {
    @apply hidden;
  }
}
</style>
