<template>
  <div
    :style="{ height: imgHeight, backgroundImage: isBackground && typeof mediaSrc === 'string' && mediaSrc.length > 0 ? 'url(' + mediaSrc + ')' : 'none' }"
    class="overflow-hidden relative flex items-center content-center"
  >
    <template v-if="typeof mediaSrc === 'string'">
      <MediaPdf
        v-if="![null, undefined].includes(media) && ![null, undefined].includes(media.mime) && media.mime.includes('pdf')"
        :src="mediaSrc"
      />
      <img
        v-else-if="mediaSrc.length > 0"
        :src="mediaSrc"
        class="w-full h-auto relative z-0"
        :class="{ 'opacity-0': isBackground }"
        @load="imageLoaded"
      >
    </template>
    <MediaYoutube
      v-else-if="typeof youtube === 'string' && youtube.length > 0"
      :src="youtube"
      :class="{ 'w-full my-auto height-full': true, 'relative z-0': !!!isBackground, 'absolute z-0 -inset-1': !!isBackground }"
      :ratio="ratio"
      :style="{ height: imgHeight }"
    />
    <div
      v-if="overlay || (typeof youtube === 'string' && youtube.length > 0)"
      class="overlay absolute -inset-1 z-1"
      :class="{['' + overlayClasses + '']: overlayClasses !== null && typeof overlayClasses === 'string'}"
    />
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
    youtube: {
      type: String,
      default: null
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
    const mediaSrc = typeof this.mediaSrc !== 'undefined' ? this.mediaSrc : this.getImgSrc(this.media, typeof this.$el !== 'undefined' ? this.$el : { offsetWidth: 300, offsetHeight: 300 })
    return { mediaSrc, imgHeight: 'auto' }
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
      if (![null, undefined].includes(this.media) && ![null, undefined].includes(this.media.mime) && this.media.mime.includes('pdf')) {
        this.mediaSrc = this.media.url
        return
      }
      const mediaSrc = this.getImgSrc(this.media, typeof this.$el !== 'undefined' ? this.$el : { offsetWidth: 300, offsetHeight: 300 })
      if (this.mediaSrc === mediaSrc) {
        return
      };
      this.mediaSrc = mediaSrc
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
      if (typeof this.ratio !== 'string' || !this.ratio.includes || !this.ratio.includes(':') || typeof this.$el === 'undefined' || this.$el.offsetWidth < 0) {
        return
      }
      const ratio = this.ratio.split(':')
      const width = this.$el.offsetWidth
      const height = Math.floor(width / ratio[0] * ratio[1])
      if (height > 0 && this.imgHeight !== `${height}px`) {
        this.imgHeight = `${height}px`
        return
      }
      if(this.imgHeight === `${height}px`) {
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
