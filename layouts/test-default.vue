<template>
  <div
    class="site-container w-screen flex flex-col"
    :class="{ 'is-mobile': isMobile }"
  >
    <div class="site-wrapper overflow-x-hidden w-screen sm:w-[calc(100vw-90px)] sm:ml-[90px] mt-12 sm:mt-0">
      <main>
        <Nuxt :key="$route.fullPath" />
      </main>
    </div>
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
