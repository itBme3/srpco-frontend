<template>
  <Card
    :title="title"
    :text="text"
    :media="!!media && media.url ? media : null"
    :class="{['' + cardClasses + '']: typeof cardClasses === 'string' && cardClasses.length > 0 }"
    :card-style="cardStyle"
    :title-classes="titleClasses"
    :text-classes="textClasses"
    :media-classes="mediaClasses"
    :youtube="youtube"
    :link="link"
    :open-new-tab="openNewTab === true"
  />
</template>

<script lang="js">
import { CardStyle } from '~/models/blocks.model'

export default {
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  data () {
    const block = typeof this.block === 'undefined' ? {} : this.block
    const blockClasses = `block-card ${block?.blockClasses?.length > 0 ? block?.blockClasses?.length : ''}`.trim()
    // const titleClasses:string = `card-title${this.block?.titleSettings?.titleClasses?.length > 0 ? ` ${this.block.titleSettings.titleClasses}` : ''}`
    // const textClasses:string = `card-text${this.block?.textSettings?.textClasses?.length > 0 ? ` ${this.block.textSettings.textClasses}` : ''}`

    return {
      blockClasses: {
        [blockClasses]: blockClasses.length > 0
      },
      cardStyle: Object.values(CardStyle).map(v => `${v}`).includes(block?.cardSettings?.style) ? block?.cardSettings?.style : CardStyle.MEDIA_ABOVE,
      media: block?.media?.url ? block.media : null,
      title: block?.title?.length > 0 ? block.title : null,
      text: block?.text?.length > 0 ? block.text : null,
      link: block?.link?.length > 0 ? block.link : '',
      mediaClasses: block?.cardSettings?.mediaClasses?.length > 0 ? block.cardSettings.mediaClasses : '',
      titleClasses: block?.cardSettings?.titleClasses?.length > 0 ? block.cardSettings.titleClasses : '',
      textClasses: block?.cardSettings?.textClasses?.length > 0 ? block.cardSettings.textClasses : '',
      cardClasses: block?.cardSettings?.cardClasses?.length > 0 ? block.cardSettings.cardClasses : '',
      youtube: block?.cardClasses?.length > 0 ? block.cardClasses : null,
      openNewTab: block?.openNewTab === true
    }
  }
}
</script>
