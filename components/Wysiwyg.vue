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
      res = txt.split('src="').join('src="' + process.env.apiUrl)
      res = res.replace('oembed', 'iframe')
      res = res.replace('url', 'src')
      res = res.replace('watch?v=', 'embed/')
      res = res.replace('oembed', 'iframe')
      return res
    }
  }
}
</script>
