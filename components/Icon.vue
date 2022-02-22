<template>
  <i :class="{
      'icon': true,
      ['gicon-' + iconName]: true
    }" />
</template>

<script lang="js">
export default {
  props: {
    iconName: {
      type: String
    }
  }
}
</script>
