<template>
  <div
    class="site-container w-screen block"
    :class="{ 'is-mobile': isMobile }"
  >

    <SiteHeader />
    <div class="site-wrapper overflow-visible mt-12 sm:mt-0 sm:w-[calc(100vw-100px)] sm:ml-[100px]">
      <main
        class="w-screen transform sm:translate-x-[45px] sm:w-[calc(100vw-100px)] mx-auto"
        style="display: block;"
      >
        <Nuxt :key="$route.fullPath" />
      </main>
    </div>
    <!-- <SiteFooter /> -->
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