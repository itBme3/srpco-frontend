<template>
  <div
    class="single-entry service"
    :v-if="page !== null && page !== undefined"
  >
    <div class="page-heading flex flex-wrap items-center content-start">
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
      async handler(slug) {
        this.page = slug !== undefined ? await entryBySlug(EntryType.SERVICE, slug) : null
      }
    }
  }
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
