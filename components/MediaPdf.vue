<template>
  <client-only>
    <template v-if="![undefined, null].includes(mediaSrc)">
      <iframe
        ref="iFrame"
        v-if="embed"
        samesite="strict"
        :src="embedSrc"
        frameborder="0"
        height="100%"
        width="100%"
      />
      <pdf
        v-else
        :src="mediaSrc"
      />
    </template>
  </client-only>
</template>

<script lang="js">
import {getStrapiMedia} from '~/utils/medias'
export default {
  props: {
    src: {
      type: String,
      default: null
    },
    embed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mediaSrc: null, 
      embedSrc: null
    }
  },
  created() {
      this.mediaSrc = getStrapiMedia(this.src)
      this.embedSrc = `https://docs.google.com/viewer?url=${this.mediaSrc}&embedded=true`
  }
  // async mounted(context) {
  //   this.embedSrc = await this.getPdfPath(this.mediaSrc)
  //   return this.embedSrc
  // }
}
</script>
