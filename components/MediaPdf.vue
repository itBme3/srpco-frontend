<template>
  <pdf :src="src" />
</template>

<script lang="js">

export default {
  props: {
    src: {
      type: String,
      default: null
    }
  }
}
</script>
