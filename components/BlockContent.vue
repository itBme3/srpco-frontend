<template>
  <div
    class="block-content"
    :v-if="![undefined, null].includes(block)"
  >
    <Wysiwyg
      v-if="content !== null && content !== undefined"
      :class="{
        [contentClasses]: typeof contentClasses === 'string' && contentClasses.length > 0
      }"
      :content="content"
    />
  </div>
</template>

<script>
import Wysiwyg from './Wysiwyg.vue'
export default {
  components: { Wysiwyg },
  props: {
    block: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    title () {
      return this.block !== undefined && this.block !== null && typeof this.block.title === 'string' && this.block.title?.length > 0
        ? this.block.title
        : ''
    },
    titleClasses () {
      return this.block !== undefined && this.block !== null && typeof this.block.titleClasses === 'string' && this.block.titleClasses?.length > 0
        ? this.block.titleClasses
        : ''
    },
    contentClasses () {
      return this.block !== undefined && this.block !== null && typeof this.block.contentClasses === 'string' && this.block.contentClasses?.length > 0 ? this.block.contentClasses : ''
    },
    content () {
      const txt = this.block !== undefined && this.block !== null && typeof this.block.content === 'string' && this.block.content?.length > 0
        ? this.block.content
        : ''
      let res = txt
      res = txt.split('src="').reduce((acc, text) => {
        return [
          ...acc, `${text?.indexOf('/uploads') === 0 ? process.env.apiUrl : ''}${text}`
        ]
      }, []).join('src="')
      // if (txt.includes('src="/uploads')) {
      //   res = txt.split('src="').join('src="' + process.env.apiUrl)
      // }
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
.block-content {
  a {
    @apply text-blue;
  }
}
</style>
