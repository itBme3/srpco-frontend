<template>
  <div 
    v-if="entry && entries.length"
    class="entries-on-entry">
    <BlockCollection
      :collection-type="collectionType"
      :limit="3"
      card-style="mediaLeft"
      :ratio="['datasheets'].includes(collectionType) ? '9:10' : ['services'].includes(collectionType) ? '16:9' : '5:4'"
      :search-bar="false"
      :infinite-scroll="false"
      :update-url="false"
      :entries="entries"
      :classes="{
        grid: 'w-full grid grid-cols-1 gap-4',
        card: 'col-span-1 p-1 bg-gray-900',
        media: 'rounded',
        title: 'text-xl font-regular tracking-wide',
        text: ''
      }"
    />
  </div>
</template>

<script>
import Vue from 'vue'

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
        return this.entry[this.collectionType]
      }
      this.$emit('noEntries', true)
      return []
    }
  }
})
</script>

<style scoped>
</style>