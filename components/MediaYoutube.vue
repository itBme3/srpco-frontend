<template>
  <div
    class="video-embed w-full"
    :style="{ height: videoHeight }"
  >
    <client-only>
      <youtube-media
        :v-if="!!videoId"
        ref="videoFrame"
        class="h-full w-full"
        :video-id="videoId"
        :player-width="'100%'"
        :player-height="'100%'"
        :player-vars="playerVars"
        :mute="mute"
      />
    </client-only>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
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
      default: false
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
      default: false
    }
  },
  data () {
    return {
      videoId: null,
      videoHeight: 'auto',
      playerVars: {},
      origin: process.env.baseUrl
    }
  },
  data () {
    return {
      videoId: !!this.videoId && this.videoId !== null ? this.videoId
        : typeof this.src === 'string' && typeof this?.$youtube !== 'undefined'
          ? this.$youtube.getIdFromURL(this.src)
          : null,
      videoHeight: 'auto',
      playerVars: {
        rel: 0,
        list: 'UUu_bAN6SQdiSWVR5TGJ1ELQ',
        origin: this.origin,
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
  beforeMount () {
    const origin = window !== undefined ? window.location.origin : process.env.baseUrl
    this.origin = origin
    this.videoId = !!this.videoId && this.videoId !== null
      ? this.videoId
      : typeof this.src === 'string' && typeof this?.$youtube !== 'undefined'
        ? this.$youtube.getIdFromURL(this.src)
        : null
  },
  methods: {
    setVideoHeight: _.debounce(function () {
      const elWidth = typeof this.$el !== 'undefined' && this.$el.offsetWidth > 0 ? this.$el.offsetWidth : null
      if (elWidth > 0) {
        const ratio = this.ratio && this.ratio?.indexOf(':') > -1 ? this.ratio.split(':') : '16:9'.split(':')
        this.videoHeight = '' + Math.floor(elWidth / ratio[0] * ratio[1]) + 'px'
      }
    }, 250)
  }
}
</script>
