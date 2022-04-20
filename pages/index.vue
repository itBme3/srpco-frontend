<template>
  <Blocks
    v-if="!!page && Array.isArray(page.blocks) && !!page.blocks.length"
    :blocks="page.blocks"
  />
</template>

<script>
import Vue from 'vue'
import { seoHead } from '~/utils/seo'
import { getHomepage } from '~/utils/graphql/requests/pages'

export default Vue.extend({
  scrollToTop: true,
  async asyncData () {
    const page = await getHomepage()
    return { page }
  },
  head () {
    return seoHead(this.page)
  }

})
</script>
