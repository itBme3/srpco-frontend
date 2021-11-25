<template>
  <div>
    <div
      v-if="Array.isArray(entries) && entries.length > 0"
      class="entries"
      :class="{ [collectionType]: true }"
    >
      <Card
        v-for="(entry, index) in entries"
        :key="entry.id"
        :title="entry.title"
        :media="index < 4 ? entry.file : 'gicon-datasheets'"
        card-style="mediaLeft"
        :link="'/' + collectionType + '/' + entry.slug"
        media-ratio="8.5:11"
        media-classes="shadow-2xl rounded my-2 ml-2 mr-4"
        class="col-span-12"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: Object,
    default: () => null
  },
  data () {
    return {
      collectionType: 'datasheets'
    }
  },
  computed: {
    entries () {
      return this.block !== undefined && this.block !== null && Array.isArray(this.block[this.collectionType]) ? this.block[this.collectionType] : null
    },
    cardClasses () {
      try {
        return block.cardSettings.cardClasses
      } catch (err) {
        return null
      }
    },
    mediaClasses () {
      try {
        return block.cardSettings.cardClasses
      } catch (err) {
        return null
      }
    },
    titleClasses () {
      try {
        return block.cardSettings.cardClasses
      } catch (err) {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
  .entries {
    @apply grid grid-cols-12 gap-3
  }
</style>
