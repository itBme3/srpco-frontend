<template>
  <div class="page search">
    <div class="collections-toggle flex flex-nowrap max-w-full overflow-x-scroll">
      <gButton
        v-for="collection in searchCollections"
        :key="collection"
        :variant="activeCollections.includes(collection) ? 'secondary' : 'bordered'"
        :class="{
          'text-sm text-gray-200 flex content-between items-center uppercase font-normal tracking-wider': true,
          'active bg-red': activeCollections.includes(collection),
          'bg-gray-700 bg-opacity-50 hover:bg-opacity-100': !activeCollections.includes(collection)
        }"
        @click="toggleCollection(collection)"
      >
        {{ collection }} <i
          style="color: inherit"
          :class="{
            'my-auto mr-0 ml-3 relative text-xs': true,
            'gicon-close': activeCollections.includes(collection),
            'gicon-add': !activeCollections.includes(collection)
          }"
        />
      </gButton>
    </div>
  </div>
</template>
<script>
const searchCollections = ['gaskets', 'resources', 'datasheets', 'materials', 'applications']
export default {
  data () {
    return {
      searchCollections,
      activeCollections: searchCollections
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

<style>
.collection-toggle button.active {
      @apply bg-red-400 !important;
}
</style>
