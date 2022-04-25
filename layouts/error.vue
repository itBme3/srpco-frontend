<template>
  <div
    class="site-container w-screen block"
    :class="{ 'is-mobile': $store.state.screen.isMobile }"
  >
    <!-- <SiteHeader />
    <div class="site-wrapper overflow-visible mt-12 sm:mt-0 mx-auto">
      <main
        class="w-screen transform mx-auto text-center"
        style="display: block;"
      > -->
    <template v-if="error.statusCode === 404">
      <h1 class="font-black text-gray-500 text-6xl">404</h1>
      <h3>Page not found</h3>
    </template>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
    <!-- </main>
    </div>
    <SiteFooter /> -->
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => null
    },
  },
})
</script>
