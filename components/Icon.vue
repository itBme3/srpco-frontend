<template>
  <div>
    <i :class="'gicon-' + iconName" />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    iconName: {
      type: String
    },
    classes: {
      type: String,
      default: 'srp-red'
    }
  }
}
</script>
