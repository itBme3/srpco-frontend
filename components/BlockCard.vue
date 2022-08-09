<template>
  <Card
    :title="title"
    :text="text"
    :media="!!media && media.url ? media : null"
    :card-style="cardStyle"
    :classes="cardClasses"
    :youtube="youtube"
    :link="link"
    :open-new-tab="openNewTab === true"
    :ratio="youtube && youtube.length && (!media || !media.url) ? '16:9' : '5:4'"
    :video-params="{
      mute: cardStyle === 'overlay',
      loop: cardStyle === 'overlay',
      autoplay: cardStyle === 'overlay',
      controls: false,
      autohide: false,
      showInfo: false,
      modestbranding: true,
    }"
  />
</template>

<script>
import Vue from 'vue'
import { CardStyle } from '~/models/blocks.model'
import { getCardClasses } from '~/utils/get-classes'
export default Vue.extend({
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  data () {
    const block = typeof this.block === 'undefined' ? {} : this.block
    const cardClasses = getCardClasses(block);
    return {
      cardStyle: Object.values(CardStyle).map(v => `${v}`).includes(block?.cardSettings?.style) ? block?.cardSettings?.style : CardStyle.MEDIA_LEFT,
      media: block?.media?.url ? block.media : block?.file?.url ? block.file : null,
      file: block?.file?.url ? block.file : null,
      title: block?.title?.length > 0 ? block.title : null,
      text: block?.text?.length > 0 ? block.text : null,
      link: block?.link?.length > 0 ? block.link : '',
      cardClasses,
      youtube: block?.youtube?.length > 0 ? block.youtube : null,
      openNewTab: block?.openNewTab === true
    }
  }
})
</script>
