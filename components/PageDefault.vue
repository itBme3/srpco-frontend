<template>
  <article
    v-if="![null, undefined].includes(page)"
    :class="{
      'single-entry': isSingleEntry,
      [entryType]: isSingleEntry,
      collection: !isSingleEntry,
      [entryType + 's']: !!entryType && entryType.includes('Collection'),
      [pageClasses.container]: !!pageClasses.container,
      [`resource-${resourceType}`]: !!resourceType
    }"
  >
    <Heading
      v-if="![null, undefined].includes(page)"
      :title="page.title"
      :heading-type="
        !entryType || !entryType.length || !entryTypes.includes(entryType)
          ? 'collection'
          : 'page'
      "
      :description="resourceType === 'video' && page.youtube ? null : page.description"
      :media="resourceType === 'ebook' ? null :
        (!entryType || !entryTypes.includes(entryType)) &&
        page.seo &&
        page.seo.image
          ? page.seo.image
          : page.media
      "
      :class="{
        [pageClasses.heading]: !!pageClasses.heading
      }"
      :divider="!entryType || !entryTypes.includes(entryType)"
      :classes="{
        title: pageClasses.title,
        description: pageClasses.description,
        media: pageClasses.media,
        overlay: pageClasses.overlay
      }"
    >
      <template #breadcrumbs>
        <Breadcrumbs />
      </template>
      <template #preTitle>
        <time
          v-if="resourceType"
          class="mb-4 opacity-60"
          :datetime="formatDate(new Date(page.publishedAt), true)"
        >
          {{ formatDate(new Date(page.publishedAt)) }}
        </time>
      </template>
    </Heading>

    <div v-if="pageMedia && resourceType === 'video'" class="page-media">
      <Media
        :youtube="pageMedia.youtube"
        :ratio="pageMedia.ratio"
        class="rounded-md w-full"
      />
      <h6 class="description">
        {{ page.description }}
      </h6>
    </div>

    <Media
      v-if="page && page.media && (entryType === 'datasheet' || resourceType === 'ebook')"
      :media="page.media"
      ratio="8:11"
      class="h-[calc(100vh-80px)] w-full rounded-md col-span-full"
    />

    <Blocks
      v-if="
        ![null, undefined].includes(page) &&
        ((Array.isArray(page.blocks) && page.blocks.length > 0) ||
          !!page.content ||
          entryType === 'datasheet')
      "
      :class="{
        'blocks grid-cols-12': true,
        'hide-sidebar': entryType !== 'gasket'
      }"
      :blocks="page.blocks"
    >
      <div
        v-if="typeof page.content === 'string' && page.content.length"
        class="page-content entry-block col-span-full"
        :class="{
          hidden: page.content && page.content.trim().length === 0,
          [pageClasses.content]: !!pageClasses.content
        }"
      >
        <BlockContent :block="{ content: page.content }" />
      </div>
    </Blocks>
    <EntrySideBar
      v-if="
        !!page &&
        typeof page !== 'string' &&
        ['gasket', 'material', 'application'].includes(entryType)
      "
      :entry="typeof page === 'object' ? page : {}"
    />

    <template v-for="collection in ['materials', 'applications', 'gaskets']">
      <section
        v-if="page && page[collection] && page[collection].length"
        :key="collection"
        class="entries-on-entry-section col-span-full"
        :class="{ [collection]: true }"
      >
        <h6 class="font-bold mb-2 capitalize">Related {{ collection }}:</h6>
        <EntriesOnEntry
          ref="entriesOnEntry"
          :collection-type="collection"
          :entry="page"
        />
      </section>
    </template>

    <NextPreviousEntries
      v-if="isSingleEntry && ['solution', 'resource'].includes(entryType)"
    />
  </article>
</template>

<script>
import Vue from 'vue'
import { collectionTypes, entryTypes } from '~/models/entry.model'
import { getPageClasses } from '~/utils/get-classes'
import { formatDate } from '~/utils/funcs'

export default Vue.extend({
  scrollToTop: true,
  props: {
    pageData: {
      type: Object,
      default: () => null
    }
  },
  data() {
    const {
      slug = null,
      collectionType = null,
      type: entryType = null,
      id,
      resourceType
    } = this.pageData
    this.$store.commit('page/setCollectionType', collectionType)
    this.$store.commit('page/setEntry', this.pageData)
    return {
      page: this.pageData,
      slug:
        !slug && collectionTypes.includes(this.pageData?.title?.toLowerCase())
          ? this.pageData.title.toLowerCase()
          : slug,
      collectionType,
      entryType,
      id,
      entryTypes,
      resourceType
    }
  },
  computed: {
    isSingleEntry() {
      return !!this.page?.type && this.entryTypes.includes(this.entryType)
    },
    pageMedia() {
      if (!this.page?.media || (!this.page?.youtube && !this.page?.file)) {
        return null
      }
      return {
        youtube: this.page?.youtube || null,
        file: this.page?.file || this.page?.media || null,
        ratio: this.page?.file ? '8:11' : null
      }
    },
    pageClasses() {
      const defaults = {}
      if (['page', 'resource'].includes(this.page?.type)) {
        defaults.overlay = 'bg-gradient-to-b from-transparent to-gray-900'
      }
      return getPageClasses(this.page, defaults)
    },
    gasketCollectionBlocks() {
      return this.$route.params.slug === 'gaskets' &&
        this.page?.blocks?.length >= 2 &&
        this.page?.blocks[0].__component === 'block.collection' &&
        this.page?.blocks[1].__component === 'block.collection'
        ? this.page?.blocks?.slice(0, 2)
        : []
    },
    pageBlocks() {
      return this.$route.params.slug === 'gaskets' &&
        this.page?.blocks?.length >= 2 &&
        this.page?.blocks[0].__component === 'block.collection' &&
        this.page?.blocks[1].__component === 'block.collection'
        ? this.page?.blocks?.slice(2)
        : this.page.blocks
    }
  },
  watch: {
    pageData() {
      this.page = this.pageData
      const { collectionType = null } = this.pageData
      this.$store.commit('page/setCollectionType', collectionType)
      this.$store.commit('page/setEntry', this.pageData)
    }
  },
  mounted() {
    const { slug: initialSlug = null } = this.pageData
    let { collectionType = null } = this.pageData
    if (!collectionType) {
      collectionType = this.$route.params.collection
    }
    const slug =
      !initialSlug &&
      collectionTypes.includes(this.pageData?.title?.toLowerCase())
        ? this.pageData.title.toLowerCase()
        : initialSlug;
    this.$store
      .dispatch('page/getUpdates', {
        slug: this.isSingleEntry ? slug : null,
        path: !!collectionType ? collectionType : initialSlug
      })
      .then((res) => {
        this.page = {
          ...this.page,
          ...(res || {})
        }
      })
  },
  methods: {
    formatDate
  }
})
</script>

<style lang="scss">
.page-content {
  @apply bg-gray-900 rounded py-8 px-6 h-auto;
}
.single-entry,
.collection {
  @apply pt-0 w-full;
  padding-left: var(--grid-gap);
  padding-right: var(--grid-gap);
}
.single-entry {
  @apply flex flex-wrap rounded-lg shadow-lg;
  column-gap: var(--grid-gap);
  &.resource {
    .page-media {
      @apply mx-6 -mt-12;
      .description {
        @apply mt-4;
      }
    }
    .blocks {
      @apply bg-gray-900 rounded shadow;
    }
  }
}
</style>
