<template>
  <pdf :src="src" />
  <!-- <client-only>
  </client-only> -->
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
