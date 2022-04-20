<template>
  <div
    v-if="parsedContent.length > 0"
    class="wysiwyg"
    v-html="parsedContent"
  />
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
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
})
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
  li {
    > a {
      color: inherit !important;
      border-bottom: 1px solid;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
  blockquote {
    @apply pl-8 relative;
    &:before {
      @apply block absolute left-0 right-auto top-0;
      content: '\e9b5';
      font-family: 'SRP-Icons' !important;
      speak: never;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    + p i {
      @apply pl-8;
    }
  }
  figure.media {
    position: relative;
    padding-top: 56%;
    iframe {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>