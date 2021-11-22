
<template>
  <div
    class="block"
    :class="{ [blockClasses]: !!blockClasses && blockClasses.length > 0 }"
  >
    <BlockCard
      v-if="block.__typename === 'ComponentBlocksBlockCard'"
      :block="block"
    />
    <BlockContent
      v-if="block.__typename === 'ComponentBlocksBlockContent'"
      :block="block"
    />
    <BlockDatasheets
      v-if="block.__typename === 'ComponentBlocksBlockDatasheets'"
      :block="block"
    />
    <BlockCollection
      v-if="block.__typename === 'ComponentBlocksBlockCollection'"
      :collection-type="block.collectionType"
      :limit="6"
      :sort="'published_at:ASC'"
      :card-style="!!block.cardSettings && typeof block.cardSettings.style !== 'undefined' && block.cardSettings.style !== null ? block.cardSettings.style : 'mediaAbove'"
      :classes="classes"
    />
  </div>
</template>

<script>
/* eslint-disable no-constant-condition */
export default {
  props: {
    block: {
      type: Object,
      default: () => { return { } }
    }
  },
  data () {
    const blockClasses = typeof this?.block?.blockSettings?.blockClasses === 'string' ? this.block.blockSettings.blockClasses : ''
    const classes = {
      grid: 'w-full',
      card: typeof this?.block?.cardSettings?.cardClasses === 'string' ? this.block.cardSettings.cardClasses : '',
      cardTitle: typeof this?.block?.cardSettings?.titleClasses === 'string' ? this.block.cardSettings.titleClasses : '',
      cardMedia: typeof this?.block?.cardSettings?.mediaClasses === 'string' ? this.block.cardSettings.mediaClasses : '',
      cardText: typeof this?.block?.cardSettings?.textClasses === 'string' ? this.block.cardSettings.textClasses : ''
    }
    return {
      blockClasses, classes
    }
  }
}
</script>
