<template>
  <div
    class="block-content"
  >
    <h3 
      v-if="title.length"
      class="block-title"
      :class="{
        [classes.title]: !!classes.title.length
      }">{{ title }}</h3>
    <div
      v-if="![undefined, null].includes(content)"
      :class="{
        [classes.content]: !!classes.content.length
      }"
      v-html="$md.render(content)"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { getCardClasses } from '~/utils/get-classes'
export default Vue.extend({
  props: {
    block: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      classes: getCardClasses(this.block)
    }  
  },
  computed: {
    title () {
      return ![undefined,null].includes(this.block) && typeof this.block.title === 'string' && this.block.title?.length > 0
        ? this.block.title
        : ''
    },
    contentClasses () {
      return this.block?.blockSettings?.classes?.content || ''
    },
    content () {
      const txt = ![undefined,null].includes(this.block) && typeof this.block.content === 'string' && this.block.content?.length > 0
        ? this.block.content
        : ''
      const res = txt
      return res
    }
  }
})
</script>

<style lang="scss">
.block-content {
  .block-title {
    color: var(--block-color, inherit);
  }
  a {
    @apply inline-block border border-t-0 border-l-0 border-r-0 text-opacity-80 hover:text-opacity-100;
    border-color: var(--block-color, inherit);
    &:hover {
      color: var(--block-color, inherit);
    }
  }
}

</style>
