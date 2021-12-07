<template>
  <div class="single-entry datasheet">
    <Heading
      v-if="![null, undefined].includes(page)"
      heading-type="simple"
      :media="null"
      :title="page.title"
      :description="page.description"
    />
    <div
      :v-if="!!page && page.content"
      class="page-content"
    >
      <div :v-html="page.content" />
    </div>
    <Media
      :media="page.file"
      :embed="true"
      ratio="8:11"
      class="w-full"
    />
    <div
      v-if="![undefined, null].includes(page) && Array.isArray(page.blocks) && page.blocks.length > 0"
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

export default {
  scrollToTop: true,
  async asyncData ({ params }) {
    const slug = params.slug
    const page = slug !== undefined ? await entryBySlug(EntryType.DATASHEET, slug) : null
    return {
      slug: params.slug,
      page
    }
  },
  watch: {
    slug: {
      immediate: true,
      async handler (slug) {
        this.page = slug !== undefined ? await entryBySlug(EntryType.DATASHEET, slug) : null
      }
    }
  }
}
</script>

<style lang="scss">
.single-entry.datasheet {
  .heading-title {
    @apply text-xl #{!important};
  }
}
</style>