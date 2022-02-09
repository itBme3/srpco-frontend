<template>
  <div
    v-if="![null, undefined].includes(page)"
    :class="{
      'single-entry': !!page.type && entryTypes.includes(page.type),
      [page.type]: !!page.type && entryTypes.includes(page.type),
      'collection': !!!page.type || !entryTypes.includes(page.type),
      [page.type + 's']:  !!page.type && page.type.includes('Collection'),
      [pageClasses.container]: !!pageClasses.container
    }"
  >
    <!-- {{JSON.stringify(page.type)}} -->
    <Heading
      v-if="![null, undefined].includes(page)"
      :title="page.title"
      heading-type="collection"
      :description="page.description"
      :media="page.media"
      :class="{
        [pageClasses.heading]: !!pageClasses.heading && !!ageClasses.heading.length
      }"
      :titleClasses="pageClasses.title"
    />
    <MediaYoutube
      v-if="![null, undefined].includes(page) && typeof page.youtube === 'string' && page.youtube !== null"
      :src="page.youtube"
      :autoplay="true"
      :loop="true"
      :mute="true"
    />
    <div
      v-if="![null, undefined].includes(page) && Array.isArray(page.blocks) && page.blocks.length > 0"
      :class="{
        'blocks grid-cols-12': true,
        [pageClasses.blocks]: !!pageClasses.blocks
      }"
    >
      <div
        v-if="![undefined, null].includes(page) && typeof page.content === 'string'"
        :class="{
          'entry-content entry-block': true,
          [pageClasses.content]: !!pageClasses.content
        }"
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
  </div>
</template>

<script>
import { CollectionType, EntryType } from '~/models/entry.model'
import { getPageClasses } from '~/utils/get-classes'
import { getMetaTags } from '~/utils/seo'
import { getSingleEntry } from '~/utils/graphql/requests/single'
import { getGlobalInfo } from '~/utils/graphql/requests/global'
import { getCollectionPage } from '~/utils/graphql/requests/collection'

export default {
  scrollToTop: true,
  async asyncData ({ params, redirect, route }) {
    const slug = params.slug
    const page = Object.values(CollectionType).includes(slug)
      ? await getCollectionPage(slug).catch(console.error)
      : await getSingleEntry(route.path, redirect).catch(console.error);
    const global = await getGlobalInfo().catch(console.error);
    return { slug, page, redirect, global, entryTypes: Object.values(EntryType) }
  },
  computed: {
    pageClasses () {
      return getPageClasses(this.page)
    }
  },
  // watch: {
  //   '$route.fullPath': {
  //     immediate: true,
  //     async handler (val) {
  //       console.log(val)
  //       const slug = this.$route.path.split('/').pop();
  //       return Object.values(CollectionType).includes(slug)
  //         ? await getCollectionPage(slug)
  //           .then(res => this.page = parseResponse(res[`${slug}Collection`]))
  //           .catch(console.error)
  //         : await getSingleEntry(this.$route.path, redirect)
  //           .then(res => this.page = parseResponse(res[`${slug}`]))
  //           .catch(console.error)
  //       return this.page
  //     }
  //   }
  // },
  head () {
    const { defaultSeo = {}, siteName = 'SRPCO' } = [null, undefined].includes(this.global) ? {} : this.global
    const { seo = {} } = !!this.page && !!this.page.seo ? this.page : {}
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
