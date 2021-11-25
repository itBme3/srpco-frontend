
<template>
  <div class="collection materials">
    <Heading
      v-if="page !== null && page !== undefined"
      heading-type="collection"
      :title="!!page.title ? page.title : null"
      :description="!!page.description ? page.description : null"
    />
    <div
      v-if="page !== null && page !== undefined && typeof page.blocks !== undefined && page.blocks.length > 0"
      class="blocks"
    >
      <Block
        v-for="block in page.blocks"
        :key="block.__typename + '-' + block.id"
        :block="block"
      />
    </div>
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
    return {
      page: await getCollectionPage(CollectionType.MATERIALS).then(res => res.collectionMaterial),
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
