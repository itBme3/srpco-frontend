
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

<script lang="js">
import { $graph } from '~/utils/graphql/init'
import { seoHead } from '~/utils/seo'
import { CollectionType } from '~/models/entry.model'
import { getCollectionPage } from '~/utils/graphql/requests/collection'
/* eslint-disable no-extra-boolean-cast */
export default {
  scrollToTop: true,
  async asyncData () {
    const page = await getCollectionPage(CollectionType.SERVICES).catch(console.error)
    return { page }
  },
  data () {
    return {
      active: null
    }
  },
  head () {
    return seoHead(this.page)
  },
  computed: {
    modal: {
      get () {
        return this.active
      },
      set (val) {
        this.active = val
      }
    }
  }
}
</script>

<style lang="scss">
.card-link {
  &.nuxt-link-exact-active {
    @apply hidden;
  }
}
</style>
