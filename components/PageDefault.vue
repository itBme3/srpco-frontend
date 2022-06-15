<template>
  <div
v-if="![null, undefined].includes(page)"
       :class="{
         'single-entry': isSingleEntry,
         [entryType]: isSingleEntry,
         'collection': !isSingleEntry,
         [entryType + 's']: !!entryType && entryType.includes('Collection'),
         [pageClasses.container]: !!pageClasses.container
       }">
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
             :overlay-classes="entryType === 'solution' ? 'solutions-header-media-overlay' : ''" />

    <Media
v-if="entryType === 'datasheet'"
           :media="page.file"
           ratio="8:11"
           class="h-[calc(100vh-80px)] w-full rounded-md" />

    <CollectionsOnSupplier
v-if="![undefined, null].includes(page) && entryType && entryType === 'supplier'"
                           :entry="page" />

    <div
      v-if="![null, undefined].includes(page) && ((Array.isArray(page.blocks) && page.blocks.length > 0) || !!page.content || entryType === 'datasheet')"
         :class="{
           'blocks grid-cols-12': true,
           'hide-sidebar': entryType !== 'gasket'
         }">
      <div
        v-if="![undefined, null].includes(page) && typeof page.content === 'string'"
           class="page-content entry-block col-span-12"
           :class="{
             'hidden': page.content.trim().length === 0
           }">
        <BlockContent :block="{ content: page.content }" />
      </div>

      <template v-if="$route.params.slug === 'gaskets'">
        <TabsWrapper class="col-span-12">
          <TabPanel 
            v-for="(block, i) in gasketCollectionBlocks"
            :key="block.id"
            :title="block.title">
            <LazyBlock 
              v-if="![null, undefined].includes(block)"
              :key="block.id + '-' + i"
              :block="block" />
          </TabPanel>
        </TabsWrapper>
      </template>

      <template v-for="(block, index) in pageBlocks">
        <Block 
          v-if="![null, undefined].includes(block)"
          :key="block.id + '-' + index"
          :block="block" />
      </template>
    </div>

    <EntrySideBar
:v-if="!!page && typeof page !== 'string' && ['gasket'].includes(entryType)"
                  :entry="typeof page === 'object' ? page : {}" />

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
    data() {
        const { slug = null, collectionType = null, type: entryType = null, id } = this.pageData;
        this.$store.commit("nextPrevious/setCollectionType", collectionType);
        this.$store.commit("nextPrevious/setEntry", this.pageData);
        return {
            page: this.pageData,
            slug: !!!slug && collectionTypes.includes(this.pageData?.title?.toLowerCase()) ? this.pageData.title.toLowerCase() : slug,
            collectionType,
            entryType,
            id,
            entryTypes
        };
    },
    computed: {
        isSingleEntry() {
            return !!this?.page?.type && this.entryTypes.includes(this.entryType);
        },
        pageClasses() {
            return getPageClasses(this.page);
        },
        gasketCollectionBlocks() {
            return this.$route.params.slug === "gaskets"
                && this.page?.blocks?.length >= 2
                && this.page?.blocks[0].__component === "block.collection"
                && this.page?.blocks[1].__component === "block.collection"
                ? this.page?.blocks?.slice(0, 2)
                : [];
        },
        pageBlocks() {
            return this.$route.params.slug === "gaskets"
                && this.page?.blocks?.length >= 2
                && this.page?.blocks[0].__component === "block.collection"
                && this.page?.blocks[1].__component === "block.collection"
                ? this.page?.blocks?.slice(2)
                : this.page.blocks;
            // return this.$route.params.slug === 'gaskets'
            //   ? this.page?.blocks?.slice(0, 2).length === 2
            //   && this.page?.blocks[0].__component === 'block.collection'
            //   && this.page?.blocks[1].__component === 'block.collection'
            //   : [];
            // if (this.$route.params.slug === 'gaskets') {
            //   return this.page.blocks(2)
            // }
            // return this.page.blocks
        }
    },
    watch: {
        pageData() {
            this.page = this.pageData;
            const { collectionType = null } = this.pageData;
            this.$store.commit("nextPrevious/setCollectionType", collectionType);
            this.$store.commit("nextPrevious/setEntry", this.pageData);
        }
    },
    mounted() {
        const { slug: initialSlug = null } = this.pageData;
        let { collectionType = null } = this.pageData;
        if (!collectionType) {
            collectionType = this.$route.params.collection;
        }
        const slug = !!!initialSlug && collectionTypes.includes(this.pageData?.title?.toLowerCase()) ? this.pageData.title.toLowerCase() : initialSlug;
        this.$store.dispatch("getEntryUpdates", { slug: this.isSingleEntry ? slug : null, path: !!collectionType ? collectionType : initialSlug }).then((res) => {
            try {
                this.page = {
                    ...this.page,
                    ...res
                };
            }
            catch { }
        });
    }
})
</script>
