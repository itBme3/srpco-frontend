/* eslint-disable vue/no-v-html */
<template>
  <div class="card flex flex-col items-start">
    <Link
      class="card-link"
      :class="{
        'card-style-overlay': cardStyle === 'overlay',
        'card-style-media-left': cardStyle === 'mediaLeft',
        'card-style-media-right': cardStyle === 'mediaRight',
        'card-style-media-above': cardStyle === 'mediaAbove',
        'card-more-links': Array.isArray(moreLinks) && moreLinks.length > 0
      }"
      :link="link"
      :open-new-tab="openNewTab === true"
    >
      <Media
        v-if="(!!media && !!media.url) || (typeof youtube === 'string' && youtube.length > 0)"
        :media="media"
        :ratio="mediaRatio"
        :overlay="cardStyle === 'overlay'"
        :class="{ [mediaClasses]: mediaClasses.length > 0 }"
        :is-background="['mediaLeft', 'mediaRight', 'overlay'].includes(cardStyle)"
        :youtube="youtube"
        class="card-media"
      />
      <div
        v-if="(title && title.length > 0) || (text && text.length > 0)"
        class="card-content"
      >
        <h2
          v-if="title && title.length > 0"
          :class="{ [titleClasses]: titleClasses.length > 0 }"
          class="card-title"
        >
          {{ title }}
        </h2>
        <template v-if="text && text.length > 0">
          <div
            class="card-text"
            :class="{ [textClasses]: textClasses.length > 0 }"
            v-html="text"
          />
        </template>
      </div>
    </Link>
    <CardMoreLinks
      :v-if="Array.isArray(moreLinks) && moreLinks.length > 0"
      :more-links="moreLinks"
      class="more-links-container w-full"
    />
  </div>
</template>

<script lang="ts">
import { CardStyle } from '~/models/blocks.model'
export default {
  props: {
    media: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    titleClasses: {
      type: String,
      default: ''
    },
    youtube: {
      type: String,
      default: null
    },
    textClasses: {
      type: String,
      default: ''
    },
    mediaClasses: {
      type: String,
      default: ''
    },
    cardStyle: {
      type: String,
      default: CardStyle.MEDIA_ABOVE
    },
    mediaRatio: {
      type: String,
      default: 'auto'
    },
    link: {
      type: String,
      default: null
    },
    openNewTab: {
      type: Boolean,
      default: false
    },
    moreLinks: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
  .card-content {
    * {
      color: inherit;
      text-align: inherit;
    }
  }
  .card-media, .card-content {
    @apply order-1
  }
  .card {
    @apply  rounded bg-white bg-opacity-5 shadow-md overflow-hidden;
    .card-link {
      @apply flex overflow-hidden w-full;
    }
    .card-style {
      &-overlay {
        @apply relative;
        .card-media {
          @apply relative z-1;
        }
        .card-content {
          @apply absolute top-1/2 transform -translate-y-1/2 left-4 right-4 z-10;
        }
        .card-title, .card-text * {
          text-shadow: 0 0 40px rgba(0,0,0,.7);
        }
      }
      &-media {
        &-above {
          @apply flex-col;
          .card-content {
            @apply pt-2 px-4 pb-3;
          }
        }
        &-left {
          @apply items-center content-between;
          .card-content {
            @apply mr-auto w-2/3;
          }
          .card-media {
            @apply mr-2 w-1/3;
          }
        }
        &-right {
          @apply items-center content-between;
          .card-content {
            @apply mr-auto w-2/3 text-center;
          }
          .card-media {
            @apply ml-2 order-2 w-1/3;
          }
        }
      }
    }
  }
</style>
