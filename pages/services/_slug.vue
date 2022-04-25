<template>
  <div
    v-if="![null, undefined].includes(page)"
    class="single-entry service mb-10"
  >
    <Heading
      v-if="$route.path.split('/').length > 2"
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
      v-if="page !== null && typeof page.content === 'string'"
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
    const page = await store.dispatch('getEntry', { route })
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
        this.page = await store.dispatch('getEntry', { route: this.$route })
        return this.page;
      }
    }
  }
})
</script>

<style lang="scss">
.single-entry.service {
  @apply max-w-4xl mx-auto;
}
.collection {
  &.services {
    .single-entry {
      + .heading {
        max-width: 780px !important;
        margin-right: auto;
        margin-left: auto;
        + .blocks {
          max-width: 780px !important;
          margin-right: auto;
          margin-left: auto;
        }
      }
    }
  }
}
</style>