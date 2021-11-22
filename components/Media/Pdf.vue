<template>
  <pdf
    v-if="src !== null && src !== undefined"
    :src="src"
  />
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  props: {
    src: {
      type: String,
      default: null
    }
  }
}
</script>
