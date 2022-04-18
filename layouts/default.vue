<template>
  <div
    class="site-container w-screen block"
    :class="{ 'is-mobile': $store.state.screen.isMobile }"
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
    <!-- <SiteFooter /> -->
    <client-only>
      <!-- <ChatBox /> -->
      <div class="modals">
        <Modals />
      </div>
      <AdminEditButton />
    </client-only>
  </div>
</template>
<script>

export default {
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