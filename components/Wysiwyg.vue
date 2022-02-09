<template>
  <div
    v-if="parsedContent.length > 0"
    class="wysiwyg"
    v-html="parsedContent"
  />
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: null
    }
  },
  computed: {
    parsedContent () {
      const txt = typeof this.content === 'string' && this.content?.length > 0
        ? this.content
        : ''
      let res = txt
      if (txt.includes('src="/uploads')) {
        res = txt.split('src="/uploads').join(`src="${process.env.apiUrl}/uploads`)
      }
      res = res.replace('oembed', 'iframe')
      res = res.replace('url', 'src')
      res = res.replace('watch?v=', 'embed/')
      res = res.replace('oembed', 'iframe')
      return res
    }
  }
}
</script>

<style lang="scss">
.wysiwyg {
  h1,
  h2,
  h3 {
    @apply mb-4;
  }
  h4,
  h5,
  h6 {
    @apply mb-3;
  }
  &.block-content {
    @apply leading-relaxed;
  }
}
</style>