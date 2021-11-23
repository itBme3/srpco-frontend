<template>
  <div class="page search">
    <div class="collections-toggle flex flex-nowrap max-w-full overflow-x-scroll">
      <gButton
        v-for="collection in collectionToggles"
        :key="collection"
        classes="pl-3 pr-2 py-1 hover:bg-red-500 hover:bg-opacity-100 rounded-md"
        :class="{
          'text-xs text-gray-200 flex content-between items-center uppercase font-normal tracking-wider m-1 hover:bg-opacity-100': true,
          'active bg-red-500 hover:bg-red-600 text-red-900': activeCollections.includes(collection),
          'bg-gray-700 bg-opacity-20 hover:bg-gray-500 hover:bg-opacity-100': !activeCollections.includes(collection)
        }"
        @click="toggleCollection(collection)"
      >
        {{ collection }} <i
          style="color: inherit"
          :class="{
            'my-auto mr-0 ml-2 relative -top-px text-xs': true,
            'gicon-close': activeCollections.includes(collection),
            'gicon-add': !activeCollections.includes(collection)
          }"
        />
      </gButton>
    </div>
    <div class="search-results flex flex-col w-full mx-auto">
      <template
        v-for="(collection, index) in collectionToggles"
      >
        <div
          v-if="activeCollections.includes(collection) || (activeCollections.length === 0 && index < 3)"
          :key="collection"
          class="collection"
          :class="{
            [collection]: true
          }"
        >
          <h3 class="collection-title font-bold text-lg md:text-xl w-full uppercase">
            {{ collection }}
          </h3>
          <BlockCollection
            :collection-type="collection"
            :limit="6"
            :sort="['gaskets', 'suppliers', 'materials', 'applications'].includes(collection) ? 'order:ASC' : 'published_at:DESC'"
            card-style="mediaLeft"
            :ratio="['datasheets'].includes(collection) ? '9:10' : ['services'].includes(collection) ? '16:9' : '5:4'"
            :search-bar="false"
            :infinite-scroll="false"
            :classes="{
              grid: 'w-full grid grid-cols-12 gap-4',
              card: 'col-span-12 sm:col-span-6 p-4',
              cardMedia: 'rounded',
              cardTitle: 'text-xl font-regular tracking-wide',
              cardText: ''
            }"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script>
const searchCollections = ['gaskets', 'resources', 'datasheets', 'materials', 'applications']
export default {
  data () {
    return {
      searchCollections,
      activeCollections: searchCollections.filter(c => ['gaskets', 'resources', 'datasheets'].includes(c))
    }
  },
  computed: {
    collectionToggles () {
      return [...this.activeCollections, ...searchCollections.filter(c => !this.activeCollections.includes(c))]
    }
  },
  methods: {
    toggleCollection (collection) {
      if (this.activeCollections.includes(collection)) {
        this.activeCollections = this.activeCollections.filter(c => c !== collection)
      } else {
        this.activeCollections.push(collection)
      }
    }
  }
}

</script>

<style lang="css">
.search-results .collection {
    @apply rounded my-4 p-2 sm:p-4;
}
.search-results .collection:nth-child(even) {
    @apply shadow-xl bg-gray-600 bg-opacity-5;
}
</style>
