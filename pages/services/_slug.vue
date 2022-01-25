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
      v-if="page !== null && typeof page.youtube === 'string' && page.youtube !== null"
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
import { EntryType } from '~/models/entry.model'
import { entryBySlug } from '~/utils/graphql/requests/single'
import { getPageClasses } from '~/utils/get-classes'

export default {
  scrollToTop: true,
  asyncData ({ params }) {
    return {
      slug: params.slug,
      page: null
    }
  },
  watch: {
    slug: {
      immediate: true,
      async handler (slug) {
        this.page = slug !== undefined ? await entryBySlug(EntryType.SERVICE, slug) : null
      }
    }
  },
  computed: {
    pageClasses () {
      return getPageClasses(this.page)
    }
  },
  // data () {
  //   return {
  //     youtubeSrc: this?.page?.youtube ? this.page.youtube : null,
  //     title: this?.page?.title ? this.page.title : null,
  //     description: this?.page?.description ? this.page.description : null,
  //     content: this?.page?.content ? this.page.content : null,
  //     loading: false
  //   }
  // }
}
</script>
