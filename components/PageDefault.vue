<template>
  <div
    v-if="![null, undefined].includes(page)"
    :class="{
      'single-entry': isSingleEntry,
      [entryType]: isSingleEntry,
      'collection': !isSingleEntry,
      [entryType + 's']:  !!entryType && entryType.includes('Collection'),
      [pageClasses.container]: !!pageClasses.container
    }"
  >
    <Heading
      v-if="![null, undefined].includes(page)"
      :title="page.title"
      :heading-type="!!!entryType || !entryTypes.includes(entryType) ? 'collection' : 'page'"
      :description="page.description"
      :media="page.media"
      :class="{
        [pageClasses.heading]: !!pageClasses.heading && !!pageClasses.heading.length
      }"
      :title-classes="pageClasses.title"
      :overlay-classes="entryType === 'solution' ? 'solutions-header-media-overlay' : ''"
    />

    <Media
      v-if="entryType === 'datasheet'"
      :media="page.file"
      ratio="8:11"
      class="h-[calc(100vh-80px)] w-full rounded-md"
    />

    <CollectionsOnSupplier
      v-if="![undefined, null].includes(page) && entryType && entryType === 'supplier'"
      :entry="page"
    />

    <div
      v-if="![null, undefined].includes(page) && ((Array.isArray(page.blocks) && page.blocks.length > 0) || !!page.content || entryType === 'datasheet')"
      :class="{
        'blocks grid-cols-12': true,
        'hide-sidebar': entryType !== 'gasket'
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
      :v-if="!!page && ['gasket'].includes(entryType)"
      :entry="page"
    />

    <NextPreviousEntries v-if="isSingleEntry && ['solution', 'resource'].includes(entryType)" />

  </div>
</template>

<script>
import Vue from 'vue'
import { collectionTypes, entryTypes } from '~/models/entry.model'
import { getPageClasses } from '~/utils/get-classes'

export default Vue.extend({
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
  computed: {
    isSingleEntry () {
      return !!this?.page?.type && this.entryTypes.includes(this.entryType)
    }
  },
  watch: {
    pageData () {
      this.page = this.pageData;
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
  },
  mounted () {
    const { slug: initialSlug = null, collectionType = null, type: entryType = null, id } = this.pageData;
    const slug = !!!initialSlug && collectionTypes.includes(this.pageData?.title?.toLowerCase()) ? this.pageData.title.toLowerCase() : initialSlug;
    this.$store.commit('adminEdit/setAdminLink', {
      slug,
      collectionType,
      entryType, id: id * 1
    })
  }
})
</script>

<style lang="scss">
.single-entry {
  &.solution {
    .heading {
      .heading-content {
        @apply rounded relative sm:px-0 bg-opacity-50;
        .heading-text-content {
          @apply p-4 sm:p-8  mx-auto max-w-prose;
          .heading-title {
            @apply font-semibold text-2xl sm:text-3xl md:text-4xl;
          }
        }
      }
      .heading-media {
        @apply rounded absolute w-1/2 opacity-50;
        .overlay {
          @apply bg-gradient-to-l from-gray-900 to-transparent;
        }
      }
    }
    .blocks {
      @apply mx-auto px-3 pt-5;
      .entry-block {
        &[class*='block-ComponentSolutions'] {
          @apply max-w-prose mx-auto p-3 bg-transparent shadow-none w-full overflow-visible;
          .block-content {
            @apply p-7 rounded-md bg-gray-800 bg-opacity-50 shadow-xl w-full;
          }
        }
        .block-title {
          @apply mb-0;
          &:after {
            @apply relative;
            content: ':';
            left: -0.3ch;
          }
        }
        &.block-ComponentSolutionsChallenge {
          .block-title {
            @apply text-red-500;
          }
        }
        &.block-ComponentSolutionsSolution {
          .block-title {
            @apply text-green-500;
          }
        }
        &.block-ComponentSolutionsResults {
          .block-title {
            @apply text-blue-500;
          }
        }
        &.block-ComponentSolutionsUsed {
          .block-title {
            @apply text-cyan-600;
          }
        }
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
