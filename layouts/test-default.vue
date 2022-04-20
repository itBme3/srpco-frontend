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

import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      isMobile: true
    }
  }
})
</script>
