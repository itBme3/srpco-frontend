<template>
  <i :class="{
      'icon': true,
      ['gicon-' + iconName]: true
    }" />
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    iconName: {
      type: String,
      default: 'plus'
    }
  }
})
</script>
