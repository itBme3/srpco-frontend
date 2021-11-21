<template>
  <div class="blocks">
    <Block
      v-for="block in blocks"
      :key="block.id"
      :block="block"
    />
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
