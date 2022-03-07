<template>
  <iframe
    v-if="![undefined, null].includes(mediaSrc)"
    ref="iFrame"
    :src="embedSrc"
    samesite="strict"
    frameborder="0"
    height="100%"
    width="100%"
  />
</template>

<script>
import { getStrapiMedia } from '~/utils/medias'
export default {
  props: {
    src: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      mediaSrc: null,
      embedSrc: null
    }
  },
  mounted () {
    this.setSrc();
  },
  methods: {
    setSrc (tried = 0) {
      this.mediaSrc = getStrapiMedia(this.src)
      this.embedSrc = `https://docs.google.com/viewer?url=${this.mediaSrc}&embedded=true`
      this.checkIframeLoaded(tried);
    },
    checkIframeLoaded (tried) {
      if (tried > 20) {
        return
      };
      const delay = 500;
      setTimeout(() => {
        // console.log({ Iframe: this.$refs.iFrame });
        if (this.$refs.iFrame.contentWindow.document.querySelector('body').innerHTML.length === 0) {
          this.mediaSrc = null;
          this.embedSrc = null;
          setTimeout(() => {
            this.setSrc(tried + 1)
          }, delay + 250);
        }
      }, delay)

    }
  },
  errorCaptured () {
    return false
  }
}
</script>
