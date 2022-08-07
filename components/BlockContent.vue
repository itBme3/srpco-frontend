<template>
  <div
    class="block-content"
  >
    <div
      v-if="![undefined, null].includes(content)"
      :class="{
        [contentClasses]: contentClasses.length > 0
      }"
      v-html="$md.render(content)"
    />
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    block: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    title () {
      return ![undefined,null].includes(this.block) && typeof this.block.title === 'string' && this.block.title?.length > 0
        ? this.block.title
        : ''
    },
    contentClasses () {
      return ![undefined, null].includes(this.block?.blockSettings) && typeof this.block.blockSettings?.classes?.content === 'string'
        ? this.block.blockSettings?.classes?.content
        : ''
    },
    content () {
      const txt = ![undefined,null].includes(this.block) && typeof this.block.content === 'string' && this.block.content?.length > 0
        ? this.block.content
        : ''
      const res = txt
      // res = txt.split('src="').reduce((acc, text) => {
      //   return [
      //     ...acc, `${text?.indexOf('/uploads') === 0 ? process.env.apiUrl : ''}${text}`
      //   ]
      // }, []).join('src="');
      // res = res.replace('oembed', 'iframe');
      // res = res.replace('url', 'src');
      // res = res.replace('watch?v=', 'embed/');
      // res = res.replace('oembed', 'iframe');
      return res
    }
  }
})
</script>

<style lang="scss">
.block-content {
  a {
    @apply text-blue;
  }
}
</style>
