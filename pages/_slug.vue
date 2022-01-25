<template>
  <div class="single-entry page">
    <div
      v-if="![null, undefined].includes(page) && Array.isArray(page.blocks) && page.blocks.length > 0"
      class="blocks grid-cols-12 before:box-inherit after:box-inherit"
    >
      <div
        v-if="![undefined, null].includes(page) && typeof page.content === 'string'"
        class="page-content entry-block col-span-12"
      >
        <BlockContent :block="{ content: page.content }" />
      </div>
      <template v-for="(block, index) in page.blocks">
        <Block
          v-if="![null, undefined].includes(block)"
          class="break-inside"
          :key="block.id + '-' + index"
          :block="block"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { EntryType } from '~/models/entry.model'
import { entryBySlug } from '~/utils/graphql/requests/single'
export default {
  scrollToTop: true,
  async asyncData ({ params }) {
    const slug = params.slug
    const page = slug !== undefined ? await entryBySlug(EntryType.PAGE, slug) : null
    return { slug, page }
  },
  watch: {
    slug: {
      immediate: true,
      async handler (slug) {
        this.page = slug !== undefined ? await entryBySlug(EntryType.PAGE, slug) : null
        return this.page
      }
    }
  }
}
</script>