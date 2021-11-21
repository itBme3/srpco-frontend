<template>
  <div class="single-entry gasket">
    <PageHeading
      v-if="page !== null"
      :title="page.title"
      :description="page.description"
      :media="page.media"
    />
    <div
      :v-if="!!page && page.content"
      class="page-content">
      <div :v-html="page.content"></div>
    </div>
    <Blocks
      :v-if="page !== null && page.blocks && page.blocks.length > 0"
      :blocks="page.blocks"
    />
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