<template>
  <div class="media-pdf w-full h-full">
    <Loading v-if="loading" />
    <iframe
      v-if="![undefined, null].includes(mediaSrc)"
      ref="iFrame"
      :src="embedSrc"
      frameborder="0"
      height="100%"
      width="100%"
      :class="{
        'opacity-0': loading,
        'opacity-100': !loading
      }"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { getStrapiMedia } from '~/utils/medias'
import { asyncDelay } from '~/utils/funcs'
export default Vue.extend({
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
      loading: true
    }
  },
  mounted () {
    this.setSrc();
  },
  errorCaptured () {
    return false
  },
  methods: {
    setSrc (tried = 0) {
      this.mediaSrc = getStrapiMedia(this.src)
      this.embedSrc = `https://docs.google.com/viewer?url=${this.mediaSrc}&embedded=true`
      this.checkIframeLoaded(tried);
    },
    async checkIframeLoaded (tried) {
      if (tried > 10) {
        this.loading = 'Error loading pdf.'
        return
      };
      const delay = 1000
      await asyncDelay(delay);
      try {
        if (this.$refs.iFrame.contentWindow.document.querySelector('body').innerHTML.length === 0) {
          this.mediaSrc = null;
          this.embedSrc = null;
          await asyncDelay(delay);
          this.setSrc(tried + 1)
          console.log({ tried, iFrame: this.$refs.iFrame })
          this.loading = !this.$refs?.iFrame?.contentWindow?.document?.querySelector('body')?.innerHTML?.length
          return this.loading
        }
        this.loading = false
        return this.loading
      } catch (err) {
        this.loading = false
        return this.loading
      }

    }
  }
})
</script>
