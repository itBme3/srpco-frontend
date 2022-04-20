<template>
  <div
    v-if="Array.isArray(blocks) && blocks.length > 0"
    class="blocks"
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
import Vue from 'vue'
export default Vue.extend({
  props: {
    blocks: {
      type: Array,
      default: () => []
    }
  }
})
</script>