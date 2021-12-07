<template>
  <client-only>
    <div
      class="video-embed w-full"
      :style="{ height: videoHeight }"
    >
      <youtube-media
        class="h-full w-full"
        :v-if="!!videoId"
        :video-id="videoId"
        :player-width="'100%'"
        :player-height="'100%'"
        :player-vars="playVars"
        :mute="mute"
        :host="'https://www.youtube-nocookie.com'"
      />
    </div>
  </client-only>
</template>

<script>
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
    return { videoId: null, videoHeight: 'auto', playVars: {} }
  },
  fetch () {
    console.log({ $route: this.$route })
    this.playVars = ['autoplay', 'controls', 'loop', 'autohide', 'showInfo', 'modestbranding'].reduce((acc, key) => {
      return { ...acc, [key]: this[key] === true ? 1 : 0 }
    }, {
      rel: 0,
      list: 'UUu_bAN6SQdiSWVR5TGJ1ELQ',
      origin: [null, undefined].includes(window) ? null : window.location.origin
    })
    this.videoId = null
    this.videoHeight = 'auto'
    this.videoId = !!this.videoId && this.videoId !== null
      ? this.videoId
      : typeof this.src === 'string' && typeof this?.$youtube !== 'undefined'
        ? this.$youtube.getIdFromURL(this.src)
        : null
  },
  mounted () {
    window.addEventListener('resize', this.setVideoHeight)
    setTimeout(() => {
      this.setVideoHeight()
    }, 100)
  },
  unmounted () {
    window.removeEventListener('resize', this.setVideoHeight)
  },
  methods: {
    setVideoHeight () {
      const elWidth = typeof this.$el !== 'undefined' && this.$el.offsetWidth > 0 ? this.$el.offsetWidth : null
      if (elWidth > 0) {
        const ratio = this.ratio && this.ratio?.indexOf(':') > -1 ? this.ratio.split(':') : '16:9'.split(':')
        this.videoHeight = `${Math.floor(elWidth / ratio[0] * ratio[1])}px`
      }
    }
  }
}
</script>
