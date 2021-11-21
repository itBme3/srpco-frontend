
<template>
  <div>
    <NuxtChild :key="$route.fullPath" />
    <div
      v-if="page !== undefined && page !== null"
      class="page-heading flex flex-wrap items-center content-start">
      <h1
        v-if="!!page && page.title !== null"
        class="page-title"
      >
        {{ page.title }}
      </h1>
      <h5
        v-if="!!page && page.description !== null"
        class="page-description"
      >
        {{ page.description }}
      </h5>
    </div>
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
    return {
      page: await getCollectionPage(CollectionType.SERVICES).then(res => res.collectionService),
      global: await $graph.request(globalQuery).then(res => res.global)
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
