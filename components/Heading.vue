<template>
  <div
    class="heading flex flex-wrap w-full max-w-full"
    :class="{
      ['heading-' + headingType + ''] : typeof headingType === 'string' && headingType.length > 0,
      'heading-collection': headingType === 'collection',
      'has-media': (![undefined, null].includes(media) && typeof media.url === 'string') || typeof youtube === 'string' && youtube.length > 0
    }"
  >

    <Breadcrumbs
      v-if="!!breadcrumbs && headingType === 'page'"
      class="heading-breadcrumbs"
    />
    <div class="heading-content">

      <Breadcrumbs
        v-if="!!breadcrumbs && headingType !== 'page'"
        class="heading-breadcrumbs"
      />
      <Media
        v-if="![null, undefined].includes(media) && typeof media.url === 'string'"
        :media="media"
        class="order-0 h-full"
        :is-background="true"
        :class="{ 'heading-media': true, [mediaClasses]: mediaClasses.length > 0 }"
        :ratio="mediaRatio"
        :overlay="typeof overlayClasses === 'string' && overlayClasses.length > 0"
        :overlay-classes="overlayClasses"
      />
      <div class="heading-text-content">
        <gTag
          v-if="title !== null && title.length > 0"
          :tag-name=" headingType === 'page' ? 'h1' : 'h2'"
          :class="{ 'heading-title': true, [titleClasses]: titleClasses.length > 0 }"
        >
          {{ title }}
        </gTag>
        <h5
          v-if="description !== null && title.length > 0"
          :class="{ 'heading-description': true, [descriptionClasses]: descriptionClasses.length > 0 }"
        >
          {{ description }}
        </h5>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    headingType: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    media: {
      type: Object,
      default: null
    },
    youtube: {
      type: String,
      default: null
    },
    titleClasses: {
      type: String,
      default: ''
    },
    descriptionClasses: {
      type: String,
      default: ''
    },
    mediaClasses: {
      type: String,
      default: ''
    },
    overlayClasses: {
      type: String,
      default: ''
    },
    breadcrumbs: {
      type: Boolean,
      default: true
    },
    mediaRatio: {
      type: String,
      default: 'auto'
    }
  }
})
</script>
<style lang="scss">
.heading {
  @apply flex items-start content-start py-2 sm:py-0;
  .heading-content {
    @apply block sm:flex flex-row items-center justify-start w-full;
  }
  .heading-text-content {
    @apply px-2 my-0 h-full flex w-full sm:order-first order-last flex-col content-start relative z-1 max-w-[75ch];
    text-shadow: 3px 4px 14px rgba(7, 14, 32, 0.6), 0 0 60px rgb(7 14 26);
  }
  .heading-title {
    @apply text-gray-200 mb-2 font-black;
  }
  .heading-description {
    @apply text-base font-normal tracking-wide text-gray-500 leading-snug mt-4;
  }
  .heading-media {
    @apply rounded-md sm:rounded-sm absolute sm:relative z-0 sm:mx-2 shadow-2xl w-full sm:w-5/12 mx-0 sm:ml-auto;
    @media screen and (max-width: 639px) {
      max-height: 33vw;
    }
    @media screen and (max-width: 479px) {
      max-height: 50vw;
    }
  }
  .heading-breadcrumbs {
    @apply justify-start w-full mt-2 mb-3;
  }
  .heading-page {
    .heading-title {
      @apply text-gray-300;
    }
  }
  .heading-simple {
    .heading-text-content {
      @apply w-full text-center self-center;
    }
    .heading-breadcrumbs {
      @apply whitespace-nowrap ml-0 mr-0 mb-3 mt-0 order-first flex-shrink;
    }
    &.gasket,
    &.materials,
    &.applications {
      .heading-text-content {
        @media screen and (max-width: 639px) {
          box-shadow: 0 -20px 36px 30px rgba(17, 24, 39, 1) !important;
        }
      }
    }
  }
  .single-entry {
    .heading-content {
      @apply bg-gray-900 sm:bg-transparent;
    }
  }
}
</style>
