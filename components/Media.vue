<template>
  <div
    :style="{ height: imgHeight, backgroundImage: isBackground ? 'url(' + imgSrc + ')' : 'none' }"
    class="overflow-hidden relative flex items-center content-center"
  >
    <img
      v-if="imgSrc !== null"
      :src="imgSrc"
      class="w-full h-auto relative z-0"
      :class="{ 'opacity-0': isBackground }"
      @load="imageLoaded"
    >
    <div
      v-if="overlay"
      class="overlay absolute -inset-1 z-1"
      :class="{['' + overlayClasses + '']: overlayClasses !== null && typeof overlayClasses === 'string'}"></div>
  </div>
</template>

<script lang="js">
import { getThumbImageUrl } from '~/utils/funcs'
import { getStrapiMedia } from '~/utils/medias'
export default {
  props: {
    media: {
      type: Object,
      default: () => null
    },
    ratio: {
      type: String,
      default: 'auto'
    },
    isBackground: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    },
    overlayClasses: {
      type: String,
      default: null
    }
  },
  data () {
    const imgSrc = typeof this.imgSrc !== 'undefined' ? this.imgSrc : this.getImgSrc(this.media, typeof this.$el !== 'undefined' ? this.$el : { offsetWidth: 300, offsetHeight: 300 })
    return { imgSrc, imgHeight: 'auto' }
  },
  mounted () {
    this.setImgSrc()
    window.addEventListener('resize', this.setImgSrc)
  },
  unmounted () {
    window.removeEventListener('resize', this.setImgSrc)
  },
  methods: {
    imageLoaded () {
      this.setImgSrc()
    },
    setImgSrc () {
      this.setImgHeight()
      const imgSrc = this.getImgSrc(this.media, typeof this.$el !== 'undefined' ? this.$el : { offsetWidth: 300, offsetHeight: 300 })
      if (this.imgSrc === imgSrc) {
        return
      };
      this.imgSrc = imgSrc
    },
    getImgSrc (media, el) {
      if (media === null) {
        return null
      }
      const thumb = getThumbImageUrl(media, el)
      if (typeof thumb === 'undefined') {
        return null
      }
      return getStrapiMedia(thumb.url)
    },
    setImgHeight () {
      if (!this.ratio.includes(':') || typeof this.$el === 'undefined' || this.$el.offsetWidth < 0) {
        return
      }
      const ratio = this.ratio.split(':')
      const width = this.$el.offsetWidth
      const height = Math.floor(width / ratio[0] * ratio[1])
      if (height > 0) {
        this.imgHeight = `${height}px`
        return
      }
      this.imgHeight = 'auto'
    }
  }
}
</script>

<style>
[style*="background-image: url("] {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.overlay {
  @apply bg-gray-900 bg-opacity-10
}
</style>
