<template>
  <div
    v-if="['resources', 'solutions'].includes(collectionType) && nextEntries && nextEntries.length"
    class="next-entries"
  >
  <h2 v-if="label" class="mb-6">{{ label }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <template v-for="entry in nextEntries">
        <Card
          v-if="entry"
          :key="entry.id"
          class="next-entry w-full col-span-1"
          :title="entry.title"
          :media="entry.media"
          :link="`/${collectionType}/${entry.slug}`"
          title-tag="h5"
          :classes="{
            title: 'my-auto font-medium text-base',
            content: 'flex flex-col content-center'
          }"
          card-style="mediaAbove"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { capitalize } from '~/utils/funcs';
export default Vue.extend({
  computed: {
    nextEntries () {
      return this.$store?.state?.page?.next
    },
    collectionType () {
      return this.$store?.state?.page?.collectionType
    },
    resourceType () {
      return this.$store?.state?.page?.entry?.resourceType
    },
    label () {
      let label = this.resourceType || this.collectionType;
      if (!label) {
        return null;
      }
      if (label[label.length - 1] !== "s") {
        label = `${label}s`
      }
      return `More ${capitalize(label)}:`;
    }
  },
  mounted () {
    this.$store.dispatch('page/getNextEntries').catch(console.error);
  }
})
</script>

<style lang="scss" scoped>
.next-entries {
  @apply border-4 border-dashed border-x-0 border-b-0 border-gray-800 my-14 mx-8 py-14;
}
</style>