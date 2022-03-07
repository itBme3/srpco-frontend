<template>
  <div
    class="blocks"
    v-if="Array.isArray(blocks) && blocks.length > 0"
  >
    <template v-for="(block, i) in blocks">
      <Block
        :key="block.__typename + '-' + block.id"
        :block="block"
        :lazy="i >= 3"
      />
    </template>

  </div>
</template>

<script>
export default {
  props: {
    blocks: {
      type: Array,
      default: () => []
    }
  }
}
</script>