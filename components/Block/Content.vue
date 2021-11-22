<template>
  <div
    class="block-content"
    :v-if="block !== undefined && block !== null">
    <div
      v-if="content !== null && content !== undefined"
      :class="{
        'block-content': true,
        [contentClasses]: typeof contentClasses === 'string' && contentClasses.length > 0
      }"
      v-html="content"
    />
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    title: {
      get () {
        return this.block !== undefined && this.block !== null && typeof this.block.title === 'string' && this.block.title?.length > 0
          ? this.block.title
          : ''
      }
    },
    content: {
      get () {
        return this.block !== undefined && this.block !== null && typeof this.block.content === 'string' && this.block.content?.length > 0
          ? this.block.content.split('src="').join('src="' + process.env.apiUrl)
          : ''
      }
    },
    titleClasses: {
      get () {
        return this.block !== undefined && this.block !== null && typeof this.block.titleClasses === 'string' && this.block.titleClasses?.length > 0
          ? this.block.titleClasses
          : ''
      }
    },
    contentClasses: {
      get () {
        return this.block !== undefined && this.block !== null && typeof this.block.contentClasses === 'string' && this.block.contentClasses?.length > 0 ? this.block.contentClasses : ''
      }
    }
  }
}
</script>

<style lang="scss">
.block-content {
  a {
    @apply text-blue
  }
}
</style>
