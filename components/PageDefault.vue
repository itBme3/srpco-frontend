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
import { EntryType } from '~/models/entry.model'
import { getPageClasses } from '~/utils/get-classes'
import { getSingleEntry } from '~/utils/graphql/requests/single'
import { getGlobalInfo } from '~/utils/graphql/requests/global'
import { seoHead } from '~/utils/page-seo'

export default {
  scrollToTop: true,
  async fetch () {
    this.pageData = await getSingleEntry(this.$route.path, this.redirect);
    // console.log({ pageData: this.pageData })
    // this.global = await getGlobalInfo()
    // this.$store.commit("pageData/SET_PAGE_DATA", this.pageData)
    // return { global, pageData }
  },
  data () {
    return {
      pageData: null,
      entryTypes: Object.values(EntryType)
    }
  },
  watch: {
    '$route.path': '$fetch'
  },
  computed: {
    pageClasses () {
      return getPageClasses(this.pageData)
    },
    page () {
      return this.pageData
      // return this.$store.state.pageData.data
    },
    seo () {
      return null
      // return this.$store.state.pageData.seo
    }
  },
  head () {
    if (!!this.seo) return this.seo;
    return null;
  }
}
</script>
