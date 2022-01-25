
<template>
  <div
    :class="{
      'entry-block': true,
      [blockClasses]: true,
      ['block-' + block.__typename]: true
    }"
    v-if="![undefined, null].includes(block)"
  >

    <template v-if="![undefined, null].includes(block)">
      <h2
        v-if="block.title !== null && !['ComponentBlockHero'].includes(block.__typename)"
        :class="{
          'block-title': true
        }"
      >
        {{ title }}
      </h2>
      <BlockCard
        v-if="block.__typename === 'ComponentBlockCard'"
        :block="block"
      />
      <BlockCollection
        v-if="block.__typename === 'ComponentBlockCollection'"
        :collection-type="block.collectionType"
        :limit="![null, undefined].includes(block.collectionSettings) && block.collectionSettings.limit > 0 ? block.collectionSettings.limit : 6"
        :sort="!!block.collectionSettings && !!block.collectionSettings.sort ? block.collectionSettings.sort.split(',') : ['publishedAt:ASC']"
        :infinite-scroll="!!block.collectionSettings && block.collectionSettings.infiniteScroll"
        :update-url="!!block.collectionSettings && block.collectionSettings.updateUrl"
        :card-style="!!block.cardSettings && typeof block.cardSettings.style !== 'undefined' && block.cardSettings.style !== null ? block.cardSettings.style : 'mediaAbove'"
        :classes="classes"
      />
      <BlockContent
        v-if="block.__typename === 'ComponentBlockContent'"
        :block="block"
      />
      <BlockHero
        v-if="block.__typename === 'ComponentBlockHero'"
        :block="block"
      />
      <BlockDatasheets
        v-if="block.__typename === 'ComponentBlockDatasheets'"
        :block="block"
      />
      <BlockMaterials
        v-if="block.__typename === 'ComponentBlockMaterials'"
        :block="block"
      />
      <BlockApplications
        v-if="block.__typename === 'ComponentBlockApplications'"
        :block="block"
      />
      <BlockServices
        v-if="block.__typename === 'ComponentBlockServices'"
        :block="block"
      />
      <BlockResources
        v-if="block.__typename === 'ComponentBlockResources'"
        :block="block"
      />
      <BlockGroup
        v-if="block.__typename === 'ComponentBlockGroup'"
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
  // data() {
  //     return {
  //       grid: 'w-full',
  //       blockClasses: ''
  //     }

  // },
  data () {
    const blockClasses = typeof this?.block?.blockSettings?.blockClasses === 'string' ? this.block.blockSettings.blockClasses : ''
    console.log({ block: this.block, blockClasses })
    const classes = {
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


<style lang="scss">
.block-title {
  @apply font-extrabold;
}
</style>