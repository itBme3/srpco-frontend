<template>
  <div 
    v-if="entry && entries.length"
    class="entries-on-entry">
    <BlockCollection
      :collection-type="collectionType"
      :limit="8"
      card-style="mediaLeft"
      :ratio="['datasheets'].includes(collectionType) ? '9:10' : ['services'].includes(collectionType) ? '16:9' : '5:4'"
      :search-bar="false"
      :infinite-scroll="false"
      :update-url="false"
      :entries="entries"
      :classes="{
        grid: 'w-full grid grid-cols-12 gap-2',
        card: 'col-span-full sm:col-span-6 p-1 bg-gray-900',
        media: 'rounded',
        title: 'text-xl font-regular tracking-wide',
        text: ''
      }"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { sortCompare } from '~/utils/funcs'

export default Vue.extend({
  props: {
    entry: {
      type: Object,
      default: () => null
    },
    collectionType: {
      type: String,
      default: null
    },
  },
  computed: {
    entries () {
      if (this.entry && Array.isArray(this.entry[this.collectionType]) && this.entry[this.collectionType].length) {
        return [...this.entry[this.collectionType]].sort(sortCompare('title', 'asc'))
      }
      this.$emit('noEntries', true)
      return []
    }
  }
})
</script>

<style scoped>
</style>