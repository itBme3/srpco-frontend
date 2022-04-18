
<template>
  <div
    v-if="![undefined, null].includes(block)"
    :class="{
      'entry-block': true,
      [blockClasses]: true,
      ['block-' + block.__typename]: true
    }"
  >

    <template v-if="![undefined, null].includes(block)">
      <gTag
        v-if="!!title && !!title.length && !['ComponentBlockHero'].includes(block.__typename)"
        :tag-name="title.length < 85 ? 'h4' : 'h5' "
        :class="{
          'block-title': true,
          [titleClasses]: !!titleClasses.length
        }"
      >
        {{ title }}
      </gTag>

      <client-only>
        <div
          v-if="!seen"
          v-view="visibilityHandler"
          class="loading-placeholder w-full py-[30%] bg-white bg-opacity-3 rounded"
        >
          loading...
        </div>
      </client-only>

      <LazyBlockCard
        v-if="seen && block.__typename === 'ComponentBlockCard'"
        :class="{ [!!cardClasses &&  !!cardClasses.card ? cardClasses.card : '']: !!cardClasses.card.length }"
        :block="block"
      />

      <LazyBlockCollection
        v-if="seen && block.__typename === 'ComponentBlockCollection'"
        :collection-type="block.collectionType"
        :limit="![null, undefined].includes(block.collectionSettings) && block.collectionSettings.limit > 0 ? block.collectionSettings.limit : 6"
        :sort="!!block.collectionSettings && !!block.collectionSettings.sort ? block.collectionSettings.sort.split(',') : ['publishedAt:ASC']"
        :infinite-scroll="!!block.collectionSettings && block.collectionSettings.infiniteScroll"
        :update-url="!!block.collectionSettings && block.collectionSettings.updateUrl"
        :card-style="!!block.cardSettings && !!block.cardSettings && typeof block.cardSettings.style !== 'undefined' && block.cardSettings.style !== null ? block.cardSettings.style : 'mediaAbove'"
        :show-excerpt="!!block.cardSettings && !!block.cardSettings.showExcerpt"
        :show-more-links="!!block.cardSettings && block.cardSettings.showMoreLinks !== false"
        :loading-more="!!block.collectionSettings ? block.collectionSettings.loadingMore : 'button'"
        :button-link="!!block.collectionSettings ? block.collectionSettings.buttonLink : null"
        :button-text="!!block.collectionSettings ? block.collectionSettings.buttonText : null"
        :classes="cardClasses"
      />

      <LazyBlockContent
        v-if="seen && ['ComponentBlockContent', 'ComponentSolutionsChallenge', 'ComponentSolutionsSolution', 'ComponentSolutionsResults', 'ComponentSolutionsUsed'].includes(block.__typename)"
        :block="block"
      />
      <LazyBlockCarousel
        v-if="seen && block.__typename === 'ComponentBlockCarousel'"
        :block="block"
      />
      <LazyBlockHero
        v-if="seen && block.__typename === 'ComponentBlockHero'"
        :block="block"
      />
      <LazyBlockGaskets
        v-if="seen && block.__typename === 'ComponentBlockGaskets' || (block.__typename === 'ComponentSolutionsUsed' && block.gaskets && block.gaskets.length > 0)"
        :block="block"
      />
      <LazyBlockDatasheets
        v-if="seen && block.__typename === 'ComponentBlockDatasheets' || (block.__typename === 'ComponentSolutionsUsed' && block.datasheets && block.datasheets.length > 0)"
        :block="block"
      />
      <LazyBlockMaterials
        v-if="seen && block.__typename === 'ComponentBlockMaterials' || (block.__typename === 'ComponentSolutionsUsed' && block.materials && block.materials.length > 0)"
        :block="block"
      />
      <LazyBlockApplications
        v-if="seen && block.__typename === 'ComponentBlockApplications'"
        :block="block"
      />
      <LazyBlockServices
        v-if="seen && block.__typename === 'ComponentBlockServices'"
        :block="block"
      />
      <LazyBlockResources
        v-if="seen && block.__typename === 'ComponentBlockResources'"
        :block="block"
      />
      <LazyBlockGroup
        v-if="seen && block.__typename === 'ComponentBlockGroup'"
        :block="block"
      />
      <LazyBlockButtons
        v-if="seen && block.__typename === 'ComponentBlockButtons'"
        :block="block"
      />
      <LazyBlockIconList
        v-if="seen && block.__typename === 'ComponentBlockIconList'"
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
    },
    lazy: {
      type: Boolean,
      default: false
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
      title: ![null, undefined].includes(this.block) && !this.block.__typename.includes('Card') ? this.block.title : null,
      seen: !this.lazy
    }
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
  }
}
</script>
