<template>
  <div
    class="entries"
    :class="{ [collectionType]: true }"
    v-if="Array.isArray(entries) && entries.length > 0"
  >
    <Card
      v-for="entry in entries"
      :key="entry.id"
      :title="entry.title"
      :media="entry.media"
      card-style="mediaLeft"
      :link="collectionType + '/' + entry.slug"
      media-ratio="8.5:11"
      :classes="cardClasses"
      class="col-span-12"
    />
  </div>
</template>

<script>
import { getCardClasses } from '~/utils/get-classes'
export default {
  props: {
    block: Object,
    default: () => null
  },
  data () {
    return {
      collectionType: 'applications'
    }
  },
  computed: {
    entries () {
      return this.block !== undefined && this.block !== null && Array.isArray(this.block[this.collectionType]) ? this.block[this.collectionType] : null
    },
    cardClasses () {
      try {
        const c = getCardClasses(this.block);
        return c
      } catch (err) {
        return ''
      }
    }
  }
}
</script>
