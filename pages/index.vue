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
import { seoHead } from '~/utils/page-seo'
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
    return seoHead(this.global, this.page)
  }

}
</script>
