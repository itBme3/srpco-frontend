<template>
  <div class="single-entry material">
    <Heading
      v-if="page !== null"
      heading-type="page"
      :title="page.title"
      :description="page.description"
      :media="page.media"
    />
    <div
      :v-if="!!page && page.content"
      class="page-content"
    >
      <div :v-html="page.content"></div>
    </div>
    <div
      v-if="![null, undefined].includes(page) && Array.isArray(page.blocks) && page.blocks.length > 0"
      class="blocks"
    >
      <Block
        v-for="block in page.blocks"
        :key="block.__typename + '-' + block.id"
        :block="block"
      />
    </div>
  </div>
</template>

<script>
import { EntryType } from '~/models/entry.model'
import { entryBySlug } from '~/utils/graphql/requests/single'
import { getPageClasses } from '~/utils/get-classes'
export default {
  scrollToTop: true,
  async asyncData ({ params }) {
    const slug = params.slug
    const page = slug !== undefined ? await entryBySlug(EntryType.MATERIAL, slug) : null
    return {
      slug: params.slug,
      page
    }
  },
  computed: {
    pageClasses () {
      return getPageClasses(this.page)
    }
  },
  watch: {
    slug: {
      immediate: true,
      async handler (slug) {
        this.page = slug !== undefined ? await entryBySlug(EntryType.MATERIAL, slug) : null
      }
    }
  }
}
</script>
