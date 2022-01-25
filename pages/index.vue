<template>
  <div
    v-if="!!page && !!page.blocks && !!page.blocks.length"
    class="blocks"
  >
    <Block
      v-for="block in page.blocks"
      :key="block.__typename + '-' + block.id"
      :block="block"
    />
  </div>
</template>

<script lang="js">
import { getMetaTags } from '~/utils/seo'
import { getGlobalInfo } from '~/utils/graphql/requests/global'
import { getHomepage } from '~/utils/graphql/requests/pages'

export default {
  scrollToTop: true,
  async asyncData () {
    const page = await getHomepage()
    const global = await getGlobalInfo()
    return { page, global }
  },
  head () {
    const { defaultSeo, siteName } = typeof this.global === 'undefined' ? {} : this.global
    let { seo } = !!this.page?.seo ? this.page : { seo: defaultSeo }
    if (seo === undefined || seo === null) {
      seo = {}
    }
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
