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
import Vue from 'vue'
import { getPageClasses } from '~/utils/get-classes'
import { seoHead } from '~/utils/seo'

export default Vue.extend({
  scrollToTop: true,
  async asyncData ({ route, params, redirect, store }) {
    const slug = params.slug
    const page = await store.dispatch('getEntry', { path: route.path, redirect })
    return { slug, page, redirect }
  },
  head () {
    return seoHead(this.page)
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
        this.page = await store.dispatch('getEntry', { path: this.$route.path, redirect: this.redirect })
        return this.page;
      }
    }
  }
})
</script>

