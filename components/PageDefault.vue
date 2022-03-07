<template>
  <div
    v-if="![null, undefined].includes(page)"
    :class="{
      'single-entry': isSingleEntry,
      [page.type]: isSingleEntry,
      'collection': !isSingleEntry,
      [page.type + 's']:  !!page.type && page.type.includes('Collection'),
      [pageClasses.container]: !!pageClasses.container
    }"
  >
    <Heading
      v-if="![null, undefined].includes(page)"
      :title="page.title"
      :heading-type="!!!page.type || !entryTypes.includes(page.type) ? 'collection' : 'page'"
      :description="page.description"
      :media="page.media"
      :class="{
        [pageClasses.heading]: !!pageClasses.heading && !!ageClasses.heading.length
      }"
      :titleClasses="pageClasses.title"
    />

    <Media
      v-if="page.type === 'datasheet'"
      :media="page.file"
      ratio="8:11"
      class="h-[calc(100vh-80px)] w-full rounded-md"
    />

    <CollectionsOnSupplier
      v-if="![undefined, null].includes(page) && page.type && page.type === 'supplier'"
      :entry="page"
    />

    <div
      v-if="![null, undefined].includes(page) && ((Array.isArray(page.blocks) && page.blocks.length > 0) || !!page.content || type === 'datasheet')"
      :class="{
        'blocks grid-cols-12': true,
        'hide-sidebar': page.type !== 'gaskets'
      }"
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
          :key="block.id + '-' + index"
          :block="block"
        />
      </template>
    </div>

    <EntrySideBar
      :v-if="!!page && ['gasket'].includes(page.type)"
      :entry="page"
    />

    <NextPreviousEntries v-if="isSingleEntry && ['solution', 'resource'].includes(page.type)" />

  </div>
</template>

<script>
import { collectionTypes, entryTypes } from '~/models/entry.model'
import { getPageClasses } from '~/utils/get-classes'

export default {
  scrollToTop: true,
  props: {
    pageData: {
      type: Object,
      default: () => null
    }
  },
  data () {
    const { slug = null, collectionType = null, type: entryType = null, id } = this.pageData;
    this.$store.commit('adminEdit/setAdminLink', { slug, collectionType, entryType, id })
    this.$store.commit('nextPrevious/setCollectionType', collectionType)
    this.$store.commit('nextPrevious/setEntry', this.pageData)
    return {
      page: this.pageData,
      slug: !!!slug && collectionTypes.includes(this.pageData?.title?.toLowerCase()) ? this.pageData.title.toLowerCase() : slug,
      collectionType, entryType, id,
      entryTypes,
      pageClasses: getPageClasses(this.pageData)
    }
  },
  mounted () {
    const { slug = null, collectionType = null, type: entryType = null, id } = this.pageData;
    this.$store.commit('adminEdit/setAdminLink', {
      slug: !!!slug && collectionTypes.includes(this.pageData?.title?.toLowerCase()) ? this.pageData.title.toLowerCase() : slug,
      collectionType, entryType, id: id * 1
    })
  },
  computed: {
    isSingleEntry () {
      return !!this?.page?.type && this.entryTypes.includes(this.page.type)
    }
  },
  watch: {
    pageData () {
      this.page = this.pageData;
      console.log({ pageData: this.pageData })
      const { slug = null, collectionType = null, type: entryType = null, id } = this.pageData;
      this.pageClasses = getPageClasses(this.pageData);
      this.$store.commit('adminEdit/setAdminLink', {
        id,
        slug: !!!slug && collectionTypes.includes(this.pageData?.title?.toLowerCase()) ? this.pageData.title.toLowerCase() : slug,
        collectionType, entryType
      })
      this.$store.commit('nextPrevious/setCollectionType', collectionType)
      this.$store.commit('nextPrevious/setEntry', this.pageData)
    }
  }
}
</script>

<style lang="scss">
.single-entry {
  &.solution {
    .heading {
      .heading-content {
        @apply rounded bg-gray-800 bg-opacity-50;
        .heading-text-content {
          @apply p-4 sm:p-8;
          .heading-title {
            @apply font-semibold text-2xl sm:text-3xl md:text-4xl;
          }
        }
      }
      .heading-media {
        @apply rounded opacity-100;
      }
    }
  }
  &.supplier {
    .heading-media {
      max-width: 200px;
      max-height: 200px;
    }
  }
}
</style>
