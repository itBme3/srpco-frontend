<template>
  <div class="page search">
    <ToggleButtons
      v-if="Array.isArray(searchCollections)"
      :items="searchCollections.map(collection => {
        return { value: collection, classes: { 
          active: `hover:bg-red-400 bg-orange-400 text-orange-900 hover:bg-opacity-80`,
          hidden: ![undefined, null].includes(emptyCollections) && emptyCollections[collection]
        } }
      })"
      :active="activeCollections"
      color="orange"
      @update="updateActive"
    />
    <div class="search-results flex flex-col w-full mx-auto">
      <template v-for="(collection, index) in searchCollections">
        <div
          v-if="([undefined, null].includes(emptyCollections) || !emptyCollections[collection]) && (activeCollections.includes(collection) || (activeCollections.length === 0 && index < 3))"
          ref="searchCollection"
          :key="collection"
          :class="{
            'collection': true,
            [collection]: true
          }"
        >
          <h3 class="collection-title font-black text-lg md:text-xl w-full uppercase mb-2">
            {{ collection }}:
          </h3>
          <BlockCollection
            :collection-type="collection"
            :limit="6"
            :sort="['gaskets', 'suppliers', 'materials', 'applications'].includes(collection) ? ['order:ASC'] : ['publishedAt:DESC']"
            card-style="mediaLeft"
            :ratio="['datasheets'].includes(collection) ? '9:10' : ['services'].includes(collection) ? '16:9' : '5:4'"
            :search-bar="false"
            :infinite-scroll="false"
            :classes="{
              grid: 'w-full grid grid-cols-12 gap-4',
              card: 'col-span-12 sm:col-span-6 p-4',
              media: 'rounded',
              title: 'text-xl font-regular tracking-wide',
              text: ''
            }"
            @updateEntries="(e) => updatingEntries(e, collection)"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import ToggleButtons from '../../components/ToggleButtons.vue'
const searchCollections = ['gaskets', 'resources', 'datasheets', 'materials', 'applications']
export default {
  components: { ToggleButtons },
  data () {
    return {
      searchCollections,
      activeCollections: searchCollections.filter(c => ['gaskets', 'resources', 'datasheets'].includes(c)),
      emptyCollections: searchCollections.reduce((acc, handle) => {
        return { ...acc, [handle]: false }
      }, {})
    }
  },
  methods: {
    updateActive (val) {
      console.log({ searchCollection: this.$refs.searchCollection });
      this.activeCollections = val
    },
    updatingEntries (e, collection) {
      this.emptyCollections[collection] = e.length === 0
    }
  }
}

</script>

<style lang="css">
.search-results .collection {
  @apply rounded my-4 p-1 border-4 border-t-0 border-r-0 border-l-0 border-dotted border-gray-800 pb-10;
}
.search-results .collection:nth-last-child(1) {
  @apply border-b-0;
}
</style>
