
<template>
  <div
    v-if="![undefined, null].includes(block)"
    :class="{
      'entry-block': true,
      [blockClasses]: true,
      ['block-' + block.__typename]: true
    }"
  >
<<<<<<< HEAD

    <template v-if="![undefined, null].includes(block)">
      <gTag
        v-if="!!title && !!title.length && !['ComponentBlockHero'].includes(block.__typename)"
        :tagName="title.length < 85 ? 'h4' : 'h5' "
=======
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
>>>>>>> 6c9fe9dcdef8a708948f8a0b5e0c441b147a44f9
        :class="{
          'block-title': true,
          [titleClasses]: !!titleClasses.length
        }"
      >
        {{ title }}
<<<<<<< HEAD
      </gTag>
      <BlockCard
        v-if="block.__typename === 'ComponentBlockCard'"
        :class="{ [!!cardClasses &&  !!cardClasses.card ? cardClasses.card : '']: !!cardClasses.card.length }"
        :block="block"
      />
      <BlockCollection
        v-if="block.__typename === 'ComponentBlockCollection'"
        :collection-type="block.collectionType"
        :limit="![null, undefined].includes(block.collectionSettings) && block.collectionSettings.limit > 0 ? block.collectionSettings.limit : 6"
        :sort="!!block.collectionSettings && !!block.collectionSettings.sort ? block.collectionSettings.sort.split(',') : ['publishedAt:ASC']"
        :infinite-scroll="!!block.collectionSettings && block.collectionSettings.infiniteScroll"
        :update-url="!!block.collectionSettings && block.collectionSettings.updateUrl"
        :card-style="!!block.cardSettings && !!block.cardSettings && typeof block.cardSettings.style !== 'undefined' && block.cardSettings.style !== null ? block.cardSettings.style : 'mediaAbove'"
        :classes="cardClasses"
      />

=======
      </h1>
>>>>>>> 6c9fe9dcdef8a708948f8a0b5e0c441b147a44f9
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
import { getCardClasses, getBlockClasses } from '~/utils/get-classes';
/* eslint-disable no-constant-condition */
export default {
  props: {
    block: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    const { block: blockClasses = '', title: titleClasses = '', buttons: buttonsClasses = '' } = getBlockClasses(this.block);
    const { card = '', title: cardTitle = '', text: cardText = '', media: cardMedia = '' } = getCardClasses(this.block);
    return {
      blockClasses,
      titleClasses,
      buttonsClasses,
      cardClasses: { card, title: cardTitle, media: cardMedia, text: cardText },
      title: ![null, undefined].includes(this.block) && !this.block.__typename.includes('Card') ? this.block.title : null
    }
  }
}
</script>


<style lang="scss">
</style>