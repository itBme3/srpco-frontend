<template>
  <div
    v-if="![null, undefined].includes(page)"
    class="single-entry service"
  >
    <Heading
      :title="page.title"
      :description="page.description"
      heading-type="page"
      :class="{
        [pageClasses.heading]: !!pageClasses && !!pageClasses.heading && !!pageClasses.heading.length
      }"
    />

    <MediaYoutube
      v-if="![null, undefined].includes(page) && typeof page.youtube === 'string' && page.youtube !== null"
      :src="page.youtube"
      :autoplay="true"
      :loop="true"
      :mute="true"
    />
    <div
      v-if="page !== null && typeof page.content === 'string' && content !== null"
      class="page-content"
      v-html="page.content"
    />
  </div>
</template>

<script>
import { getPageClasses } from '~/utils/get-classes'
import { getSingleEntry } from '~/utils/graphql/requests/single'
import { getGlobalInfo } from '~/utils/graphql/requests/global'
import { getMetaTags } from '~/utils/seo'

export default {
  scrollToTop: true,
  async asyncData ({ route, params, redirect }) {
    const slug = params.slug
    const page = await getSingleEntry(route.path, redirect)
    const global = await getGlobalInfo()
    return { slug, page, redirect, global }
  },
  computed: {
    pageClasses () {
      return getPageClasses(this.page)
    }
  },
  watch: {
    $route: {
      immediate: false,
      async handler () {
        this.page = await getSingleEntry(this.$route.path, this.redirect)
        return this.page;
      }
    }
  },
  head () {
    const { defaultSeo = {}, siteName = 'SRPCO' } = [null, undefined].includes(this.global) ? {} : this.global
    let { title = this.page?.title || null, image = this.page?.media || null, description = this.page?.description || null } = !!this.page && !!this.page.seo ? this.page.seo : {}
    if (!!!image && !!this.page?.image) { image = this.page?.image; }
    if (!!!image && !!defaultSeo.image) { image = defaultSeo.image; }
    if (!!!title && !!this.page?.title) { title = this.page?.title; }
    if (!!!title && !!defaultSeo?.title) { title = defaultSeo?.title; }
    if (!!!description && !!this.page?.description) { description = this.page?.description; }
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

