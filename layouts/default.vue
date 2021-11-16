<template>
  <div
    class="site-container w-screen flex flex-col sm:flex-row"
    :class="{ 'is-mobile': isMobile }"
  >
    <div class="side-nav side fixed sm:h-screen flex flex-row sm:flex-col w-screen sm:w-[90px] p-2 z-999999">
      <a
        href="/"
        class="mt-0"
      >
        <Logo class="w-20 h-12 mt-0 mr-auto" />
      </a>
      <SiteNav class="navigation ml-auto sm:ml-0" />
    </div>
    <div class="site-wrapper overflow-x-hidden w-screen sm:w-[calc(100vw-90px)] sm:ml-[90px] mt-12 sm:mt-0">
      <main>
        <Nuxt />
      </main>
      <SiteFooter />
    </div>
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
      console.log(document.documentElement.clientWidth)
      this.isMobile = document.documentElement.clientWidth < 640
      this.mobileNavOpened = false
    }
  }
}
</script>
