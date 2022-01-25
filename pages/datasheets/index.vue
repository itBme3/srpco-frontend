
<template>
  <div class="collection datasheets">
    <Heading
      v-if="page !== null"
      :title="page.title"
      heading-type="collection"
      :description="page.description"
      :media="page.media"
      titleClassses="text-gray-400"
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

<script>
import { $graph } from '~/utils/graphql/init'
import { getMetaTags } from '~/utils/seo'
import { CollectionType } from '~/models/entry.model'
import { getCollectionPage } from '~/utils/graphql/requests/collection'
import { getGlobalInfo } from '~/utils/graphql/requests/global'
import { globalQuery } from '~/utils/graphql/queries/global'
/* eslint-disable no-extra-boolean-cast */
export default {
  scrollToTop: true,
  async asyncData () {
    const page = await getCollectionPage(CollectionType.DATASHEETS)
    console.log({ page });
    const global = await getGlobalInfo()
    return {
      page, global
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
