
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
import { getMetaTags } from '~/utils/seo'
import { CollectionType } from '~/models/entry.model'
import { getCollectionPage } from '~/utils/graphql/requests/collection'
import { getGlobalInfo } from '~/utils/graphql/requests/global'
/* eslint-disable no-extra-boolean-cast */
export default {
  scrollToTop: true,
  async asyncData () {
    return {
      page: await getCollectionPage(CollectionType.SERVICES).catch(console.error),
      global: await getGlobalInfo().catch(console.error)
    }
  },
  data () {
    return {
      active: null
    }
  },
  head () {
    const { defaultSeo, siteName } = typeof this.global === 'undefined' || this.global === null ? {} : this.global
    const { seo = {} } = this.page
    const fullSeo = {
      ...defaultSeo,
      ...Object.keys(seo === null || typeof seo === 'undefined' ? {} : seo).reduce((acc, key) => {
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
