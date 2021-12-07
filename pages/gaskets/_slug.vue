<template>
  <div class="single-entry gasket">
    <Heading
      v-if="![null, undefined].includes(page)"
      heading-type="page"
      :title="page.title"
      :description="page.description"
      :media="page.media"
      media-ratio="4:3"
      media-classes="rounded-mg shadow-2xl max-w-[280px]"
    />
    <div
      :v-if="!!page && page.content"
      class="page-content"
    >
      <BlockContent
        v-if="![undefined, null].includes(page) && typeof page.content === 'string'"
        :block="{ content: page.content }"
      />
    </div>
    <div
      v-if="![null, undefined].includes(page) && Array.isArray(page.blocks) && page.blocks.length > 0"
      class="blocks"
    >
      <template v-for="(block, index) in page.blocks">
        <Block
          v-if="![null, undefined].includes(block)"
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
    const page = slug !== undefined ? await entryBySlug(EntryType.GASKET, slug) : null
    return {
      slug: params.slug,
      page
    }
  },
  watch: {
    slug: {
      immediate: true,
      async handler (slug) {
        this.page = slug !== undefined ? await entryBySlug(EntryType.GASKET, slug) : null
        return this.page
      }
    }
  }
}
</script>
