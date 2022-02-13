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
import { seoHead } from '~/utils/seo'

export default {
  scrollToTop: true,
  async asyncData ({ route, params, redirect }) {
    const slug = params.slug
    const page = await getSingleEntry(route.path, redirect)
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
    return seoHead(this.page)
  }
}
</script>

