<template>
  <div
    v-if="['resources', 'solutions'].includes(collectionType) && (!!nextEntry || !!previousEntry)"
    class="next-previous-entries flex flex-wrap sm:flex-nowrap space-y-3 sm:space-y-0 sm:space-x-2"
  >

    <Card
      v-if="!!previousEntry"
      class="previous-entry w-full sm:w-1/2"
      :title="previousEntry.title"
      :media="previousEntry.media"
      :text="previousEntry.description"
      :link="'/' + collectionType + '/' + previousEntry.slug"
      style="media-right"
    />
    <Card
      v-if="!!nextEntry"
      class="next-entry w-full sm:w-1/2"
      :title="nextEntry.title"
      :media="nextEntry.media"
      :text="nextEntry.description"
      :link="'/' + collectionType + '/' + nextEntry.slug"
      style="media-left"
    />
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  computed: {
    nextEntry () {
      return this?.$store?.state?.nextPrevious?.next || null
    },
    previousEntry () {
      return this?.$store?.state?.nextPrevious?.previous || null
    },
    collectionType () {
      return this?.$store?.state?.nextPrevious?.collection
    }
  },
  mounted () {
    this.$store.dispatch('nextPrevious/getNextPreviousEntries');
  }
})
</script>