
<template>
  <div
    class="block"
    :class="{ [blockClasses]: !!blockClasses && blockClasses.length > 0 }"
  >
    <BlockCard
      v-if="block.__typename === 'ComponentBlocksBlockCard'"
      :block="block"
    />
    <BlockCollection
      v-else-if="block.__typename === 'ComponentBlocksBlockCollection'"
      :collection-type="block.collectionType"
      :limit="6"
      :sort="'published_at:ASC'"
      :card-style="!!block.cardSettings && typeof block.cardSettings.style !== 'undefined' && block.cardSettings.style !== null ? block.cardSettings.style : 'mediaAbove'"
      :classes="classes"
    />
    <template v-else>
      <h1
        v-if="block.title !== null && !['ComponentBlocksBlockHero'].includes(block.__typename)"
        :class="{
          'block-title': true
        }"
      >
        {{ title }}
      </h1>
      <BlockContent
        v-if="block.__typename === 'ComponentBlocksBlockContent'"
        :block="block"
      />
      <BlockHero
        v-if="block.__typename === 'ComponentBlocksBlockHero'"
        :block="block"
      />
      <BlockDatasheets
        v-if="block.__typename === 'ComponentBlocksBlockDatasheets'"
        :block="block"
      />
      <BlockMaterials
        v-if="block.__typename === 'ComponentBlocksBlockMaterials'"
        :block="block"
      />
      <BlockApplications
        v-if="block.__typename === 'ComponentBlocksBlockApplications'"
        :block="block"
      />
      <BlockServices
        v-if="block.__typename === 'ComponentBlocksBlockServices'"
        :block="block"
      />
      <BlockResources
        v-if="block.__typename === 'ComponentBlocksBlockResources'"
        :block="block"
      />
    </template>
  </div>
</template>

<script>
/* eslint-disable no-constant-condition */
export default {
  props: {
    block: {
      type: Object,
      default: () => { return {} }
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
      blockClasses,
      classes,
      title: ![null, undefined].includes(this.block) && !this.block.__typename.includes('Card') ? this.block.title : null
    }
  }
}
</script>
