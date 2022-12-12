<template>
    <div
      v-if="entries.length > 0"
      class="entries"
      :class="{ [collectionType]: true }"
    >
      <Card
        v-for="entry in entries"
        :key="entry.id"
        :title="entry.title"
        :media="entry.media"
        :card-style="cardStyle"
        :link="entry.collectionType + '/' + entry.slug"
        :media-ratio="ratio"
				:classes="classes"
      />
    </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  scrollToTop: true,
  props: {
    block: {
      type: Object,
      default: () => null
    },
    collectionType: {
      type: String,
      default: () => null
    }
  },
  computed: {
    entries () {
      return this.block?.entries?.length ? this.block.entries : this.block?.[this.collectionType] || []
    },
    classes () {
      return {
        card: this.block?.cardSettings?.classes?.card || null,
        media: this.block?.cardSettings?.classes?.media || "shadow-2xl rounded my-2 ml-2 mr-4",
        title: this.block?.cardSettings?.classes?.title || null
      }
    },
    ratio () {
      return this.block?.cardSettings?.classes?.media || "auto"
    },
    cardStyle () {
      return this.block?.cardSettings?.cardStyle || "mediaLeft"
    }
  }
})
</script>

<style lang="scss" scoped>
.entries {
	@apply grid gap-4;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
</style>
