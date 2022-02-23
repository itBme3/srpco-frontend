<template>
  <div
    class="site-container w-screen block"
    :class="{ 'is-mobile': isMobile }"
  >
    <div class="header-and-nav side fixed sm:h-screen flex flex-row top-0 sm:flex-col w-screen sm:w-[90px] bg-gray-900 sm:bg-transparent px-1 py-2 z-[1004]">
      <a
        href="/"
        class="my-auto sm:my-0"
      >
        <Logo class="h-[38px] ml-1 top-0 w-auto my-auto mr-auto" />
      </a>
      <small class="certified-iso block max-w-[100px] text-xs my-auto ml-2 sm:ml-1 sm:mt-1 sm:mb-auto text-gray-400">
        <span class="text-red-srp whitespace-nowrap">Certified ISO</span> 9001:2015</small>
      <SiteNav class="navigation ml-auto sm:ml-0 mr-1 sm:mr-0 order-2" />
      <SiteHeader />
    </div>
    <div class="site-wrapper overflow-visible mt-12 sm:mt-0 sm:w-[calc(100vw-100px)] sm:ml-[100px]">
      <main
        class="w-screen transform sm:translate-x-[45px] sm:w-[calc(100vw-100px)] mx-auto"
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
      <AdminEditButton />
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
    if (!!window) return;
    window.addEventListener('resize', this.getDocumentDimensions)
  },
  methods: {
    getDocumentDimensions () {
      if (!!document) {
        this.isMobile = window.innerWidth < 640
        this.mobileNavOpened = false
      }
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