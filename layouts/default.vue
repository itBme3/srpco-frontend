<template>
  <div
    class="site-container w-screen block"
    :class="{ 'is-mobile': $store.state.window.isMobile }"
  >

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
  watch: {
    '$route.path' () {
      this.$store.dispatch('adminEdit/setLink', this.$route);
    }
  },
  mounted () {
    this.$store.dispatch('adminEdit/setLink', this.$route);
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