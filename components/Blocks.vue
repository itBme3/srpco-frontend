<template>
  <div
    class="blocks"
    v-if="Array.isArray(blocks) && blocks.length > 0"
  >
    <Block
      v-for="block in blocks"
      :key="block.__typename + '-' + block.id"
      :block="block"
    />
  </div>
</template>

<script>
export default {
  props: {
    blocks: {
      type: Object,
      default: () => null
    }
  }
}
</script>