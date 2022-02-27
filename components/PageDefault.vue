<template>
  <div
    v-if="![null, undefined].includes(page)"
    :class="{
      'single-entry': !!page.type && entryTypes.includes(page.type),
      [page.type]: !!page.type && entryTypes.includes(page.type),
      'collection': !!!page.type || !entryTypes.includes(page.type),
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
    <CollectionsOnSupplier
      v-if="![undefined, null].includes(page) && page.type && page.type === 'supplier'"
      :entry="page"
    />
    <div
      v-if="![null, undefined].includes(page) && Array.isArray(page.blocks) && page.blocks.length > 0"
      class="blocks grid-cols-12"
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
      :v-if="!!page && entryTypes.includes(page.type)"
      :entry="page"
    />

  </div>
</template>

<script>
import { collectionTypes, EntryType } from '~/models/entry.model'
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
    return {
      page: this.pageData,
      slug: !!!slug && collectionTypes.includes(this.pageData?.title?.toLowerCase()) ? this.pageData.title.toLowerCase() : slug,
      collectionType, entryType, id,
      entryTypes: Object.values(EntryType),
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
}
</style>
