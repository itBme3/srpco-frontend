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
    const mediaSrc = getStrapiMedia(this.src)
    return {
      mediaSrc, 
      embedSrc: `https://docs.google.com/viewer?url=${mediaSrc}&embedded=true`
    }
  },
  methods: {
    // checkIFrameLoaded(x = 0) {
    //   const i = x + 1;
    //   if ( i > 20 ) {
    //     return;
    //   }
    //   const iFrameDoc = [undefined, null].includes(this.$refs) || [undefined, null].includes(this.$refs.iFrame) 
    //     ? {} 
    //     : (this.$refs.iFrame.contentDocument || this.$refs.iFrame.contentWindow.document);
    //   // Check if loading is complete
    //   console.log(i)
    //   if (  iFrameDoc.readyState  == 'complete' ) {
    //       this.$refs.iFrame.contentWindow.onload = function(){
    //           console.log({iFrameDoc});
    //       };
    //       console.log({iFrameDoc});
    //       console.log('after load')
    //       return;
    //   } 

    //   // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
    //   setTimeout(() => { this.checkIFrameLoaded(i) }, 100);
    // }
  }
  // async mounted(context) {
  //   this.embedSrc = await this.getPdfPath(this.mediaSrc)
  //   return this.embedSrc
  // }
}
</script>
