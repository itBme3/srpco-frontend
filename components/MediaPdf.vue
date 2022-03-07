<template>
  <div class="media-pdf w-full h-full">
    <div v-if="loading">{{ loading }}</div>
    <iframe
      v-if="![undefined, null].includes(mediaSrc)"
      ref="iFrame"
      :src="embedSrc"
      frameborder="0"
      height="100%"
      width="100%"
    />
  </div>
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
      embedSrc: null,
      loading: 'loading...'
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
      console.log({ tried })
      if (tried > 20) {
        this.loading = 'Error loading pdf.'
        return
      };
      const delay = 2000;
      setTimeout(() => {
        // console.log({ Iframe: this.$refs.iFrame });
        try {
          if (this.$refs.iFrame.contentWindow.document.querySelector('body').innerHTML.length === 0) {
            this.mediaSrc = null;
            this.embedSrc = null;
            setTimeout(() => {
              this.setSrc(tried + 1)
            }, delay + 250);
            return
          }
          this.loading = false
        } catch (err) {
          this.loading = false
        }
      }, delay)

    }
  },
  errorCaptured () {
    return false
  }
}
</script>
