<template>
  <div>
    <img
      v-if="imgSrc !== null"
      :src="imgSrc"
      @load="imageLoaded"
    >
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
    }
  },
  data () {
    console.log('DATA: ', this.media)
    const imgSrc = this.getImgSrc(this.media, typeof this.$el !== 'undefined' ? this.$el : { offsetWidth: 300, offsetHeight: 300 })
    console.log({imgSrc})
    return { imgSrc }
  },
  mounted () {
    this.setImgSrc()
    window.addEventListener('resize', this.setImgSrc)
  },
  unmounted () {
    window.removeEventListener('resize', this.setImgSrc)
  },
  methods: {
    imageLoaded (e) {
      console.log('LOADED: ', e)
    },
    setImgSrc () {
      this.imgSrc = this.getImgSrc(this.media, typeof this.$el !== 'undefined' ? this.$el : { offsetWidth: 300, offsetHeight: 300 })
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
    }
  }
}
</script>
