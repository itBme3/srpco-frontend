<template>
  <PageDefault
    v-if="!!pageData && typeof pageData !== 'string'"
    :page-data="typeof pageData !== 'string' ? pageData : {}"
  />
</template>

<script>
import Vue from 'vue'
import { seoHead } from '~/utils/seo';
export default Vue.extend({
  scrollToTop: true,
  async asyncData ({ route, store }) {
    const pageData = await store.dispatch('page/getEntry', { route });
    return { pageData }
  },
  head () {
    return seoHead(this.pageData)
  }
})
</script>
