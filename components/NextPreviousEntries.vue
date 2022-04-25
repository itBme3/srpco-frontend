<template>
  <div
    v-if="['resources', 'solutions'].includes(collectionType) && (!!nextEntry || !!previousEntry)"
    class="next-previous-entries flex flex-wrap sm:flex-nowrap space-y-3 sm:space-y-0 sm:space-x-2"
  >

    <template v-for="direction in ['previous', 'next']">
      <Card
        v-if="(direction === 'next' && !!nextEntry) || (direction === 'previous' && !!previousEntry)"
        :key="direction"
        class="next-entry w-full sm:w-1/2 p-3"
        :title="direction === 'next' ? nextEntry.title : previousEntry.title"
        :media="direction === 'next' ? nextEntry.media : previousEntry.media"
        :text="direction === 'next' ? nextEntry.description : previousEntry.description"
        :link="'/' + collectionType + '/' + (direction === 'next' ? nextEntry.slug : previousEntry.slug)"
        title-tag="h5"
        :classes="{
          title: 'my-auto font-medium text-base',
          content: 'flex flex-col content-center'
        }"
        :card-style="direction === 'previous' ? 'mediaLeft' : 'mediaRight'"
      />
    </template>
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

<style lang="scss" scoped>
.next-previous-entries {
  @apply border-4 border-dashed border-x-0 border-b-0 border-gray-800 my-14 mx-8 py-14;
}
</style>