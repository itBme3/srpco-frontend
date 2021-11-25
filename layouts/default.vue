<template>
  <div
    class="site-container w-screen flex flex-col"
    :class="{ 'is-mobile': isMobile }"
  >
    <div class="header-and-nav side fixed sm:h-screen flex flex-row sm:flex-col w-screen sm:w-[90px] bg-transparent p-1 z-999999">
      <a
        href="/"
        class="-mt-px"
      >
        <Logo class="h-[37px] top-[2px] w-auto my-auto mr-auto" />
      </a>
      <SiteNav class="navigation ml-auto sm:ml-0" />
      <SiteHeader />
    </div>
    <div class="site-wrapper overflow-x-hidden w-screen sm:w-[calc(100vw-90px)] sm:ml-[90px] mt-12 sm:mt-0">
      <main>
        <Nuxt :key="$route.fullPath" />
      </main>
    </div>
    <SiteFooter />
  </div>
</template>
<script>

export default {
  data () {
    // const isMobile = width < 640
    const isMobile = true
    return { isMobile }
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
