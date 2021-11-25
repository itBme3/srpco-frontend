
<template>
  <div class="collection gaskets">
    <!-- <BlockCollection
      :collection-type="'gaskets'"
      :search-bar="false"
      :sort="'order'"
      :limit="10"
    /> -->
    <Blocks v-if="typeof page !== undefined && typeof page.blocks !== undefined && page.blocks.length > 0" :blocks="page.blocks" />
  </div>
</template>

<script lang="js">
import { $graph } from '~/utils/graphql/init'
import { getMetaTags } from '~/utils/seo'
import { CollectionType } from '~/models/entry.model'
import { getCollectionPage } from '~/utils/graphql/requests/collection'
import { globalQuery } from '~/utils/graphql/queries/global'
/* eslint-disable no-extra-boolean-cast */
export default {
  scrollToTop: true,
  async asyncData () {
    const page = await getCollectionPage(CollectionType.GASKETS).then(res => res.collectionGasket)
    return {
      page,
      global: await $graph.request(globalQuery).then(res => res.global)
    }
  },
  head () {
    const { defaultSeo, siteName } = typeof this.global === 'undefined' || this.global === null ? {} : this.global
    const { seo } = this.page
    const fullSeo = {
      ...defaultSeo,
      ...Object.keys(seo).reduce((acc, key) => {
        if (seo[key] === null || typeof seo[key] === 'undefined') {
          return acc
        }
        return { ...acc, [key]: seo[key] }
      }, {})
    }
    const meta = getMetaTags(fullSeo)
    return {
      titleTemplate: `%s | ${siteName}`,
      title: fullSeo.title,
      meta
    }
  }
}
</script>
