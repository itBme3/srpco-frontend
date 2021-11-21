<template>
  <div>
    <Blocks v-if="typeof page !== undefined && typeof page.blocks !== undefined && page.blocks.length > 0" :blocks="page.blocks" />
  </div>
</template>

<script lang="js">
import { $graph } from '~/utils/graphql/init'
import { homepageQuery } from '~/utils/graphql/queries/pages'
import { globalQuery } from '~/utils/graphql/queries/global'
import { getMetaTags } from '~/utils/seo'
export default {

  async asyncData () {
    return {
      page: await $graph.request(homepageQuery).then(res => res.homepage),
      global: await $graph.request(globalQuery).then(res => res.global)
    }
  },
  head () {
    const { defaultSeo, siteName } = typeof this.global === 'undefined' ? {} : this.global
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
