<template>
  <PageDefault
    v-if="pageData !== null"
    :pageData="pageData"
  />
</template>

<script>
import { getSingleEntry } from '~/utils/graphql/requests/single'
import { seoHead } from '~/utils/seo';
export default {
  scrollToTop: true,
  async asyncData ({ redirect, route }) {
    const pageData = await getSingleEntry(route.path, redirect);
    console.log({ pageData })
    return { pageData }
  },
  head () {
    return seoHead(this.pageData)
  }
}
</script>
