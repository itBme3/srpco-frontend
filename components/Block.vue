
<template>
  <div
    v-if="![undefined, null].includes(block)"
    :id="block && block.blockSettings && block.blockSettings.anchor ? block.blockSettings.anchor : undefined"
    :class="{
      'entry-block': true,
      [classes.block]: true,
      ['block-' + block.__component.split('.').filter(w => w !== 'block').join('-')]: true
    }"
  >


    <template v-if="![undefined, null].includes(block)">

      <gTag
        v-if="showTitle && title && title.length && !['block.hero'].includes(block.__component)"
        :tag-name="title.length < 85 ? 'h4' : 'h5' "
        :class="{
          'block-title': true,
          [classes.title]: !!classes.title.length
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
      <component
        :is="lazy ? 'TransitionGroup' : 'div'"
        class="entry-block-content"
        :class="{
          [classes.content]: classes.content.length
        }"
        :name="lazy ? 'up-fade' : undefined"
        tag="div">

        <template v-if="seen">
          <LazyBlockCard
            v-if="block.__component === 'block.card'"
            key="card"
            :class="{ [!!cardClasses &&  !!cardClasses.card ? cardClasses.card : '']: !!cardClasses.card.length }"
            :block="block"
          />

          <LazyBlockCollection
            v-else-if="block.__component === 'block.collection'"
            key="collection"
            :collection-type="block.collectionType"
            :filters="block.collectionSettings ? block.collectionSettings.filters || {} : {}"
            :limit="![null, undefined].includes(block.collectionSettings) && block.collectionSettings.limit > 0 ? block.collectionSettings.limit : 6"
            :sort="block.collectionSettings && block.collectionSettings.sort ? block.collectionSettings.sort : 'publishedAt:DESC'"
            :infinite-scroll="block.collectionSettings && block.collectionSettings.loadingMore === 'infiniteScroll'"
            :update-url="block.collectionSettings && block.collectionSettings.updateUrl"
            :card-style="block.cardSettings && block.cardSettings && typeof block.cardSettings.style !== 'undefined' && block.cardSettings.style !== null ? block.cardSettings.style : 'mediaLeft'"
            :description="block.collectionSettings && block.collectionSettings.showDescription"
            :show-excerpt="block.cardSettings && block.cardSettings.showExcerpt"
            :show-more-links="block.cardSettings && block.cardSettings.showMoreLinks !== false"
            :loading-more="block.collectionSettings ? block.collectionSettings.loadingMore : 'button'"
            :button-link="block.collectionSettings ? block.collectionSettings.buttonLink : null"
            :button-text="block.collectionSettings ? block.collectionSettings.buttonText : null"
            :search-bar="block.collectionSettings ? block.collectionSettings.searchBar : false"
            :classes="{...cardClasses, buttons: classes.buttons}"
            :ratio="block.cardSettings && block.cardSettings.classes && block.cardSettings.classes.mediaRatio ? block.cardSettings.classes.mediaRatio : 'auto'"
          />

          <LazyBlockDatasheetsCollection
            v-else-if="block.__component === 'block.datasheets-collection'"
            :block="block" />

          <LazyBlockContent
            v-else-if="['block.content', 'solutions.challenge', 'solutions.solution', 'solutions.results', 'solutions.used'].includes(block.__component)"
            key="content"
            :block="{...block, title: null}"
          />

          <LazyBlockCarousel
            v-else-if="block.__component === 'block.carousel'"
            key="carousel"
            :block="block"
          />
          <LazyBlockHero
            v-else-if="block.__component === 'block.hero'"
            key="hero"
            :block="block"
          />
          <LazyBlockGaskets
            v-else-if="block.__component === 'block.gaskets' || (block.__component === 'solutions.used' && block.gaskets)"
            key="gaskets"
            :block="block"
          />
          <LazyBlockDatasheets
            v-else-if="block.__component === 'block.datasheets' || (block.__component === 'solutions.used' && block.datasheets && block.datasheets.length > 0)"
            key="datasheets"
            :block="block"
          />
          <LazyBlockMaterials
            v-else-if="block.__component === 'block.materials' || (block.__component === 'solutions.used' && block.materials && block.materials.length > 0)"
            key="materials"
            :block="block"
          />
          <LazyBlockApplications
            v-else-if="block.__component === 'block.applications'"
            key="applications"
            :block="block"
          />
          <LazyBlockServices
            v-else-if="block.__component === 'block.services'"
            key="services"
            :block="block"
          />
          <LazyBlockResources
            v-else-if="block.__component === 'block.resources'"
            key="resources"
            :block="block"
          />
          <LazyBlockGroup
            v-else-if="['block.group'].includes(block.__component)"
            key="group"
            :block="block"
          />
          <LazyBlockButtons
            v-else-if="block.__component === 'block.buttons'"
            key="buttons"
            :block="block"
          />
          <LazyBlockIconList
            v-else-if="block.__component === 'block.icon-list'"
            key="icon-list"
            :block="block"
          />
          <LazyBlockForm 
            v-else-if="block.__component === 'block.form'"
            key="form"
            :block="block"
          />
        </template>
      </component>
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
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      seen: !this.lazy
    }
  },
  computed: {
    title() {
      return ![null, undefined].includes(this.block) && (!this.block.__component || !this.block.__component.includes('card')) ? this.block.title : null
    },
    cardClasses() {
      const { card = '', title: cardTitle = '', text: cardText = '', media: cardMedia = '' } = getCardClasses(this.block)
      return { card, title: cardTitle, media: cardMedia, text: cardText }
    },
    classes() {
      const { block, title, buttons, content } = getBlockClasses(this.block);
      return { block, title, buttons, content }
    }
  },
  watch: {
    '$route.hash' (val) {
      const hash = val.replace('#', '');
      if (this.block?.blockSettings?.anchor 
          && hash?.length
          && this.block.blockSettings.anchor === hash) {
        this.seen = true
      }
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
