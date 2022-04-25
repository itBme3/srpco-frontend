<template>
  <div
    :style="{ 
      height: imgHeight,
      backgroundImage: isBackground && typeof mediaSrc === 'string' && mediaSrc.length > 0 && !mediaSrc.includes('.pdf') ? 'url(' + mediaSrc + ')' : 'none'
    }"
    :class="{
      'overflow-hidden': !overlay,
      'media flex items-center justify-center': true
    }"
    style="background-repeat: no-repeat; background-size: cover; background-position: center;"
  >
    <client-only>
      <div
        v-if="!seen"
        v-view="visibilityHandler"
        class="loading-placeholder w-full py-[30%] bg-white bg-opacity-3 rounded"
      >
        <Loading class="m-auto" />
      </div>
      <template v-else-if="typeof mediaSrc === 'string'">
        <LazyMediaPdf
          v-if="![null, undefined].includes(media) && ![null, undefined].includes(media.mime) && media.mime.includes('pdf')"
          :src="mediaSrc"
        />
        <img
          v-else-if="mediaSrc.length > 0"
          :src="mediaSrc"
          class="media-image w-full h-auto relative z-0"
          :class="{ 'opacity-0': isBackground }"
          @load="imageLoaded"
        >
      </template>
      <LazyMediaYoutube
        v-else-if="typeof youtube === 'string' && youtube.length > 0"
        class="media-youtube"
        :src="youtube"
        :class="{ 'w-full my-auto height-full': true, 'relative z-0': !!!isBackground, 'absolute z-0 -inset-1': !!isBackground }"
        :ratio="'16:9'"
        :mute="!!videoParams.mute"
        :style="{ height: imgHeight }"
        :autoplay="!!videoParams.autoplay"
        :controls="!!videoParams.controls"
        :loop="!!videoParams.loop"
        :autohide="!!videoParams.autohide"
        :show-info="!!videoParams.showInfo"
        :modestbranding="!!videoParams.modestbranding"
      />
      <div
        v-if="overlay || (typeof youtube === 'string' && youtube.length > 0)"
        class="overlay absolute inset-0 z-1"
        :class="{[overlayClasses]: typeof overlayClasses === 'string' && overlayClasses.length > 0 }"
      >
        <Icon
          v-if="!!mediaSrc && !!youtube && !!youtube.length"
          :icon-name="'play'"
        />
      </div>
      <template #placeholder>
        <div
          v-if="!seen"
          v-view="visibilityHandler"
          class="loading-placeholder w-full py-[30%] bg-white bg-opacity-3 rounded"
        >
          <Loading class="m-auto" />
        </div>
      </template>
    </client-only>
  </div>
</template>

<script >
import Vue from 'vue'
import { getThumbImageUrl } from '~/utils/funcs'
import { getStrapiMedia } from '~/utils/medias'
export default Vue.extend({
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
    embed: {
      type: Boolean,
      default: false
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
    },
    videoParams: {
      type: Object,
      default: () => {
        return {
          mute: false,
          autoplay: false,
          controls: true,
          loop: false,
          autohide: false,
          showInfo: true,
          modestbranding: true,
        }
      }
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const mediaSrc = typeof this.mediaSrc !== 'undefined' ? this.mediaSrc : this.getImgSrc(this.media, typeof this.$el !== 'undefined' ? this.$el : { offsetWidth: 300, offsetHeight: 300 })
    const mediaRatio = this.youtube?.length && !this.mediaRatio?.includes(':') ? '16:9' : this.mediaRatio;
    return {
      mediaSrc,
      imgHeight: 'auto',
      mediaRatio,
      seen: !this.lazy
    }
  },
  watch: {
    '$store.state.screen' () {
      this.onResize()
    }
  },
  mounted () {
    this.setImgSrc()
  },
  methods: {
    visibilityHandler (e) {
      if (this.seen) {
        return
      };
      if (e.percentInView > 0.20) {
        this.seen = true
      }
    },
    imageLoaded () {
      this.setImgSrc()
    },
    onResize () {
      if ((!!!this.media && !!!this.youtube?.length) || this.media?.mime?.includes('pdf')) {
        return
      };
      setTimeout(() => {
        this.setImgSrc();
      }, 300)
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
      if (typeof this.mediaRatio !== 'string' || !this.mediaRatio.includes || !this.mediaRatio.includes(':') || typeof this.$el === 'undefined' || this.$el.offsetWidth < 0) {
        return
      }
      const ratio = this.mediaRatio.split(':')
      const width = this.$el.offsetWidth
      const height = Math.floor(width / ratio[0] * ratio[1])
      if (height > 0 && this.imgHeight !== `${height}px`) {
        this.imgHeight = `${height}px`
        return
      }
      if (this.imgHeight === `${height}px`) {
        return
      }
      this.imgHeight = 'auto'
    }
  }
})
</script>

<style lang="scss" scoped>
.media {
  @apply relative;
}
.overlay {
  @apply bg-opacity-5;
}
</style>
