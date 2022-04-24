
<template>
  <div
    v-if="![undefined, null].includes(block)"
    :class="{
      'entry-block': true,
      [blockClasses]: true,
      ['block-' + block.__component.split('.').filter(w => w !== 'block').join('-')]: true
    }"
  >

    <template v-if="![undefined, null].includes(block)">

      <gTag
        v-if="!!title && !!title.length && !['block.hero'].includes(block.__component)"
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
          <Loading class="m-auto" />
        </div>
      </client-only>
      <transition name="entry-block-reveal">
        <LazyBlockCard
          v-if="seen && block.__component === 'block.card'"
          :class="{ [!!cardClasses &&  !!cardClasses.card ? cardClasses.card : '']: !!cardClasses.card.length }"
          :block="block"
        />

        <LazyBlockCollection
          v-if="seen && block.__component === 'block.collection'"
          :collection-type="block.collectionType"
          :limit="![null, undefined].includes(block.collectionSettings) && block.collectionSettings.limit > 0 ? block.collectionSettings.limit : 6"
          :sort="!!block.collectionSettings && !!block.collectionSettings.sort ? block.collectionSettings.sort : 'publishedAt:ASC'"
          :infinite-scroll="!!block.collectionSettings && block.collectionSettings.loadingMore === 'infiniteScroll'"
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
          v-if="seen && ['block.content', 'solutions.challenge', 'solutions.solution', 'solutions.results', 'solutions.used'].includes(block.__component)"
          :block="block"
        />
        <LazyBlockCarousel
          v-if="seen && block.__component === 'block.carousel'"
          :block="block"
        />
        <LazyBlockHero
          v-if="seen && block.__component === 'block.hero'"
          :block="block"
        />
        <LazyBlockGaskets
          v-if="seen && block.__component === 'block.gaskets' || (block.__component === 'solutions.used' && block.gaskets && block.gaskets.length > 0)"
          :block="block"
        />
        <LazyBlockDatasheets
          v-if="seen && block.__component === 'block.datasheets' || (block.__component === 'solutions.used' && block.datasheets && block.datasheets.length > 0)"
          :block="block"
        />
        <LazyBlockMaterials
          v-if="seen && block.__component === 'block.materials' || (block.__component === 'solutions.used' && block.materials && block.materials.length > 0)"
          :block="block"
        />
        <LazyBlockApplications
          v-if="seen && block.__component === 'block.applications'"
          :block="block"
        />
        <LazyBlockServices
          v-if="seen && block.__component === 'block.services'"
          :block="block"
        />
        <LazyBlockResources
          v-if="seen && block.__component === 'block.resources'"
          :block="block"
        />
        <LazyBlockGroup
          v-if="seen && block.__component === 'block.group'"
          :block="block"
        />
        <LazyBlockButtons
          v-if="seen && block.__component === 'block.buttons'"
          :block="block"
        />
        <LazyBlockIconList
          v-if="seen && block.__component === 'block.icon-list'"
          :block="block"
        />
      </transition>
    </template>
  </div>
</template>

<script>
import Vue from 'vue'
import { getCardClasses, getBlockClasses } from '~/utils/get-classes';
/* eslint-disable no-constant-condition */
export default Vue.extend({
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
      title: ![null, undefined].includes(this.block) && (!this.block.__component || !this.block.__component.includes('card')) ? this.block.title : null,
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
})
</script>

<style lang="scss">
</style>
