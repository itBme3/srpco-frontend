<template>
  <div
    class="site-container w-screen block"
    :class="{ 'is-mobile': $store.state.window.isMobile }"
  >
  <ClientOnly>
    <link rel="stylesheet" defer href="https://d1azc1qln24ryf.cloudfront.net/99224/SRPMicrosites/style-cf.css?vcqm1a" />
  </ClientOnly>

    <SiteHeader />
    <div class="site-wrapper overflow-visible mt-12 sm:mt-0 mx-auto">
      <main
        class="w-screen transform mx-auto"
        style="display: block;"
      >
        <Nuxt :key="$route.fullPath" />
      </main>
    </div>
    <SiteFooter />
    <client-only>
      <div class="modals">
        <Modals />
      </div>
      <AdminEditButton />
    </client-only>
  </div>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  computed: {
    browserName () {
      const userAgent = window.navigator.userAgent;
      const vendor = window.navigator.vendor;
      switch (true) {
        case /Edge|Edg|EdgiOS/.test(userAgent):
          return 'Edge';
        case /OPR|Opera/.test(userAgent) && isOpera():
          return 'Opera';
        case /CriOS/.test(userAgent):
        case /Chrome/.test(userAgent) && vendor === GOOGLE_VENDOR_NAME && isChromium():
          return 'Chrome';
        case /Vivaldi/.test(userAgent):
          return 'Vivaldi';
        case /YaBrowser/.test(userAgent):
          return 'Yandex';
        case /Firefox|FxiOS/.test(userAgent):
          return 'Firefox';
        case /Safari/.test(userAgent):
          return 'Safari';
        case /MSIE|Trident/.test(userAgent):
          return 'Internet Explorer';
        default:
          return 'Unknown';
      }
    }
  },
  watch: {
    '$route.path' () {
      this.$store.dispatch('adminEdit/setLink', this.$route);
    }
  },
  mounted () {
    this.$store.dispatch('adminEdit/setLink', this.$route);
    console.log({ userAgent: navigator.userAgent })
  },
})
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