<template>
  <div class="entry-sidebar"
    v-if="Array.isArray(blocks) && blocks.length > 0">
    {{ blocks.join(', ') }}
  </div>
</template>

<script>
export default {
  props: {
    blocks: {
      type: Array,
      default: () => null
    }
  }
}
</script>