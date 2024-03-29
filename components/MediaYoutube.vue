<template>
  <div
    class="video-embed w-full"
    :style="{ height: videoHeight }"
  >
    <client-only>
      <iframe
        v-if="embedSrc !== null"
        ref="iFrame"
        class="w-full h-full"
        :src="embedSrc"
        allowfullscreen
      />
    </client-only>
  </div>
</template>

<script>
import qs from 'qs'

import Vue from 'vue'
export default Vue.extend({
  props: {
    src: {
      type: String,
      default: null
    },
    ratio: {
      type: String,
      default: '16:9'
    },
    mute: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    autohide: {
      type: Boolean,
      default: true
    },
    showInfo: {
      type: Boolean,
      default: false
    },
    modestbranding: {
      type: Boolean,
      default: true
    }
  },
  data () {
    const paramsFromSrc = qs.parse((this.src?.split("?")[1] || ''));
    const videoId = paramsFromSrc.v || this.src?.split('/').pop()?.split('?')[0] || null;
    delete paramsFromSrc.v;
    return {
      // origin: null,
      paramsFromSrc, 
      videoId,
      videoHeight: 'auto',
      host: 'https://www.youtube-nocookie.com',
      embedSrc: null,
      playerVars: {
        rel: 0,
        list: 'UUu_bAN6SQdiSWVR5TGJ1ELQ',
        // origin: null,
        wmode: 'opaque',
        mute: !!this.mute ? 1 : 0,
        autoplay: !!this.autoplay ? 1 : 0,
        controls: !!this.controls ? 1 : 0,
        loop: !!this.loop ? 1 : 0,
        autohide: !!this.autohide ? 1 : 0,
        showInfo: !!this.showInfo ? 1 : 0,
        modestbranding: !!this.modestbranding ? 1 : 0,
      }
    }
  },
  mounted () {
    this.setSrc();
    this.setVideoHeight();
  },
  methods: {
    setSrc () {
      this.playerVars.origin = this.origin;
      this.embedSrc = `${this.host}/embed/${this.videoId}?${qs.stringify({...this.playerVars, ...(this.paramsFromSrc || {})})}`
    },
    setVideoHeight () {
      const elWidth = typeof this.$el !== 'undefined' && this.$el.offsetWidth > 0 ? this.$el.offsetWidth : null
      if (elWidth > 0) {
        const ratio = this.ratio && this.ratio?.indexOf(':') > -1 ? this.ratio.split(':') : '16:9'.split(':')
        this.videoHeight = '' + Math.floor(elWidth / ratio[0] * ratio[1]) + 'px'
      }
    }
  }
})
</script>

<style lang="scss">
.video-embed {
  > div {
    @apply relative pt-[56%];
    iframe {
      @apply absolute inset-0;
    }
  }
}
</style>
