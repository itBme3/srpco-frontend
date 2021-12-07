<template>
  <div
    class="site-container w-screen flex flex-col"
    :class="{ 'is-mobile': isMobile }"
  >
    <div class="header-and-nav xl:left-[5%] side fixed sm:h-screen flex flex-row sm:flex-col w-screen sm:w-[90px] bg-gray-900 sm:bg-transparent px-1 py-2 z-[1004]">
      <a
        href="/"
        class="my-auto sm:mt-0"
      >
        <Logo class="h-[38px] ml-1 top-0 w-auto my-auto mr-auto" />
      </a>
      <SiteNav class="navigation ml-auto sm:ml-0 order-last xl:left-[5%]" />
      <SiteHeader />
    </div>
    <div class="site-wrapper overflow-x-hidden w-screen sm:w-[calc(100vw-90px)] sm:ml-[90px] mt-12 sm:mt-0">
      <main>
        <Nuxt :key="$route.fullPath" />
      </main>
    </div>
    <SiteFooter />
    <client-only>
      <ChatBox />
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
