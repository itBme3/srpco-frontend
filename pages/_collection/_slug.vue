<template>
  <PageSingleService
     v-if="pageReady && pageData.collectionType === 'services'"
    :page-data="typeof pageData === 'string' ? {} : pageData"
  />
  <PageDefault
    v-else-if="pageReady"
    :page-data="typeof pageData === 'string' ? {} : pageData"
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
  },
  computed: {
    pageReady () {
      return !!this.pageData && typeof this.pageData !== 'string'
    }
  }
})
</script>
