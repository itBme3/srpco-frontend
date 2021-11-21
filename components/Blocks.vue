<template>
  <div class="blocks">
    <div
      v-for="block in blocks"
      :key="block.id"
      class="block"
      :class="{ ['' + block.blockClasses + '']: block.blockClasses && block.blockClasses.length > 0 }"
    >
      <BlockCard
        v-if="block.__typename === 'ComponentBlocksBlockCard'"
        :block="block"
      />
      <BlockCollection
        v-if="block.__typename === 'ComponentBlocksBlockCollection'"
        :collection-type="block.collectionType"
        :limit="6"
        :sort="'published_at:ASC'"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blocks: {
      type: Array,
      default: null
    }
  }
}
</script>
