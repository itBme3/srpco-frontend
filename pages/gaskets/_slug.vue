<template>
  <div class="single-entry gasket">
    <div class="page-heading flex">
      <div class="my-auto">
        <h1>{{ page.title }}</h1>
        <h5>{{ page.description }}</h5>
      </div>
      <Media
        :media="page.media"
      />
    </div>
    <div
      :v-if="!!page && page.content"
      class="page-content">
      <div :v-html="page.content"></div>
    </div>
    <Blocks :blocks="page !== null && page.blocks && page.blocks.length > 0" />
  </div>
</template>

<script>
import { EntryType } from '~/models/entry.model'
import { entryBySlug } from '~/utils/graphql/requests/single'

export default {
 scrollToTop: true,
  async asyncData ({ params }) {
    const slug = params.slug
    const page = slug !== undefined ? await entryBySlug(EntryType.GASKET, slug) : null
    return {
      slug: params.slug,
      page
    }
  },
  watch: {
    slug: {
      immediate: true,
      async handler(slug) {
        this.page = slug !== undefined ? await entryBySlug(EntryType.GASKET, slug) : null
      }
    }
  }
}
</script>