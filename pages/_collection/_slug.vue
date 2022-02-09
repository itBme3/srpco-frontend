<template>
  <div
    class="single-entry"
    v-if="![null, undefined].includes(page)"
    :class="{ [page.type]: true }"
  >
    <Heading
      v-if="![null, undefined].includes(page)"
      heading-type="page"
      :title="page.title"
      :description="page.description"
      :media="page.media"
      media-ratio="4:3"
      media-classes="rounded-mg shadow-2xl max-w-[380px]"
    />
    <CollectionsOnSupplier
      v-if="![undefined, null].includes(page) && page.type && page.type === 'supplier'"
      :entry="page"
    />
    <div
      v-if="![null, undefined].includes(page) && Array.isArray(page.blocks) && page.blocks.length > 0"
      class="blocks grid-cols-12"
    >
      <div
        v-if="![undefined, null].includes(page) && typeof page.content === 'string'"
        class="page-content entry-block col-span-12"
      >
        <BlockContent :block="{ content: page.content }" />
      </div>
      <template v-for="(block, index) in page.blocks">
        <Block
          v-if="![null, undefined].includes(block)"
          :key="block.id + '-' + index"
          :block="block"
        />
      </template>
    </div>
    <EntrySideBar
      :v-if="!!page"
      :entry="page"
    />

  </div>
</template>

<script>

import { getSingleEntry } from '~/utils/graphql/requests/single'
import { getGlobalInfo } from '~/utils/graphql/requests/global'
import { getPageClasses } from '~/utils/get-classes'
import { getMetaTags } from '~/utils/seo'

export default {
  scrollToTop: true,
  async asyncData ({ route, params, redirect }) {
    const slug = params.slug
    const page = await getSingleEntry(route.path, redirect).catch(console.error)
    const global = await getGlobalInfo()
    return { slug, page, redirect, global }
  },
  computed: {
    pageClasses () {
      return getPageClasses(this.page)
    }
  },
  // watch: {
  //   '$route.fullPath': {
  //     immediate: true,
  //     async handler () {
  //       this.page = await getSingleEntry(this.$route.path, this.redirect)
  //       return this.page;
  //     }
  //   }
  // },
  head () {
    const { defaultSeo = {}, siteName = 'SRPCO' } = [null, undefined].includes(this.global) ? {} : this.global
    let { title = this.page.title, image = this.page.media, description = this.page.description } = !!this.page && !!this.page.seo ? this.page.seo : {}
    if (!!!image && !!this.page.image) { image = this.page.image; }
    if (!!!image && !!defaultSeo.image) { image = defaultSeo.image; }
    if (!!!title && !!this.page.title) { title = this.page.title; }
    if (!!!title && !!defaultSeo.title) { title = defaultSeo.title; }
    if (!!!description && !!this.page.description) { description = this.page.description; }
    if (!!!description && !!defaultSeo.description) { description = defaultSeo.description; }
    const seo = { title, image, description };

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
