<template>
  <PageDefault
    v-if="pageData !== null"
    :page-data="pageData"
  />
</template>

<script>
import Vue from 'vue'
import { getSingleEntry } from '~/utils/graphql/requests/single'
import { seoHead } from '~/utils/seo';
export default Vue.extend({
  scrollToTop: true,
  async asyncData ({ redirect, route }) {
    const pageData = await getSingleEntry(route.path, redirect);
    return { pageData }
  },
  head () {
    return seoHead(this.pageData)
  }
})
</script>
