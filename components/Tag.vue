<template>
  <Link
    :link="link"
    class="tag-link"
    :open-new-tab="openNewTab"
  >
  <slot />
  </Link>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    link: {
      type: String,
      default: null
    },
    openNewTab: {
      type: Boolean,
      default: false
    },
    variation: {
      type: String,
      default: null
    }
  }
})
</script>

<style lang="scss">
.tag-link {
  @apply inline-block transform scale-[.98] mx-0 mb-1 hover:shadow-xl hover:scale-100 bg-opacity-30 rounded bg-gray-700 text-gray-400 px-2 py-1 text-xs;
}
</style>
