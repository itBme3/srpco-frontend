<template>
  <div
    v-if="Array.isArray(entries) && entries.length > 0"
    class="entries"
    :class="{ [collectionType]: true }"
  >
    <Card
      v-for="entry in entries"
      :key="entry.id"
      :title="entry.title"
      :media="entry.media"
      card-style="mediaLeft"
      :link="collectionType + '/' + entry.slug"
      media-ratio="8.5:11"
      media-classes="shadow-2xl rounded my-2 ml-2 mr-4"
      class="col-span-12"
    />
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    block: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      collectionType: 'resources'
    }
  },
  computed: {
    entries () {
      return this.block !== undefined && this.block !== null && Array.isArray(this.block[this.collectionType]) ? this.block[this.collectionType] : null
    },
    cardClasses () {
      try {
        return block.cardSettings.classes.card
      } catch (err) {
        return null
      }
    },
    mediaClasses () {
      try {
        return block.cardSettings.classes.media
      } catch (err) {
        return null
      }
    },
    titleClasses () {
      try {
        return block.cardSettings.classes.title
      } catch (err) {
        return null
      }
    }
  }
})
</script>

