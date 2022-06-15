<template>
  <div class="entries-on-entry">

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    onEntryType: {
      type: String,
      default: null
    },
    collectionType: {
      type: String,
      default: null
    },
    ids: {
      type: Array,
      default: () => null
    }
  },
  data() {
    return {

    }
  }
})
</script>

<style scoped>
</style>