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
import { seoHead } from '~/utils/seo'
import { getHomepage } from '~/utils/graphql/requests/pages'

export default {
  scrollToTop: true,
  async asyncData () {
    const page = await getHomepage()
    return { page }
  },
  head () {
    return seoHead(this.page)
  }

}
</script>
