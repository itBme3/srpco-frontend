<template>
  <Blocks
    v-if="!!page && Array.isArray(page.blocks) && !!page.blocks.length"
    :blocks="page.blocks"
  />
</template>

<script>
import Vue from 'vue'
import { seoHead } from '~/utils/seo'

export default Vue.extend({
  scrollToTop: true,
  async asyncData ({ $content }) {
    const page = await $content('homepage').fetch()
    return { page }
  },
  head () {
    return seoHead(this.page)
  }

})
</script>
