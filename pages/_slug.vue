<template>
  <PageDefault
    v-if="pageData !== null"
    :page-data="pageData"
  />
</template>

<script>
import Vue from 'vue'
import { seoHead } from '~/utils/seo';
export default Vue.extend({
  scrollToTop: true,
  async asyncData ({ redirect, route, store }) {
    const pageData = await store.dispatch('getEntry', { path: route.path, redirect });
    return { pageData }
  },
  head () {
    return seoHead(this.pageData)
  }
})
</script>
