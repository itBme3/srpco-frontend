<template>
  <div
    class="site-container w-screen block"
    :class="{ 'is-mobile': isMobile }"
  >
    <div class="header-and-nav side fixed sm:h-screen flex flex-row top-0 sm:flex-col w-screen sm:w-[90px] bg-gray-900 sm:bg-transparent px-1 py-2 z-[1004]">
      <a
        href="/"
        class="my-auto sm:mt-0"
      >
        <Logo class="h-[38px] ml-1 top-0 w-auto my-auto mr-auto" />
      </a>
      <SiteNav class="navigation ml-auto sm:ml-0 order-last" />
      <SiteHeader />
    </div>
    <div class="site-wrapper overflow-visible mt-12 sm:mt-0 sm:w-[calc(100vw-90px)] sm:ml-[90px]">
      <main
        class="w-screen transform sm:translate-x-[45px] sm:w-[calc(100vw-90px)] mx-auto"
        style="display: block;"
      >
        <Nuxt :key="$route.fullPath" />
      </main>
    </div>
    <SiteFooter />
    <client-only>
      <ChatBox />
      <div class="modals">
        <Modals />
      </div>
    </client-only>
  </div>
</template>
<script>

export default {
  data () {
    return {
      isMobile: true
    }
  },
  mounted () {
    this.getDocumentDimensions()
    window.addEventListener('resize', this.getDocumentDimensions)
  },
  unmounted () {
    window.removeEventListener('resize', this.getDocumentDimensions)
  },
  methods: {
    getDocumentDimensions () {
      this.isMobile = document.documentElement.clientWidth < 640
      this.mobileNavOpened = false
    }
  }
}
</script>

<style lang="scss">
.site-container {
  display: block;
  height: auto;
}
.site-wrapper {
  overflow-y: visible;
  display: contents;
}
</style>