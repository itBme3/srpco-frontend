<template>
  <div
      class="tab-panel transition-all transform duration-200"
      :class="{
        'translate-y-0 opacity-100 scale-100': isActive,
        'h-0 p-0 m-0 overflow-hidden translate-y-6 opacity-0 scale-75': !isActive
      }">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isActive: !!this.active
    }
  }
})
</script>

<style lang="scss">
.tab {
  @apply text-gray-200;
}
</style>