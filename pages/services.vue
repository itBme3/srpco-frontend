
<template>
  <div>

    <NuxtChild :key="$route.fullPath" />

    <Heading
      v-if="page !== null && page !== undefined"
      :title="![undefined, null].includes(page) ? page.title : null"
      :description="![undefined, null].includes(page) ? page.description : null"
      :media="![undefined, null].includes(page) ? page.media : null"
      :breadcrumbs="false"
      heading-type="collection"
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
import Vue from 'vue'
import { seoHead } from '~/utils/seo'
import { CollectionType } from '~/models/entry.model'
/* eslint-disable no-extra-boolean-cast */
export default Vue.extend({
  scrollToTop: true,
  async asyncData ({ $content }) {
    const page = await $content(`collection/${CollectionType.SERVICES}`).fetch()
    return { page }
  },
  data () {
    return {
      active: null
    }
  },
  head () {
    return seoHead(this.page)
  }
})
</script>

<style lang="scss">
.card-link {
  &.nuxt-link-exact-active {
    @apply hidden;
  }
}
</style>
