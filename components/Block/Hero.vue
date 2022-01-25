
<template>
  <div
    class="hero block w-full h-auto"
    :class="{['hero-style-' + heroStyle]: heroStyle }"
  >
    <Media
      v-if="(!!media && !!media.url) || (typeof youtube === 'string' && youtube.length > 0)"
      :media="media"
      :ratio="'auto'"
      :overlay="heroStyle === 'overlay'"
      :overlayClasses="overlayClasses"
      :class="{ [mediaClasses]: mediaClasses.length > 0 }"
      :is-background="['mediaLeft', 'mediaRight', 'overlay'].includes(heroStyle)"
      :youtube="youtube"
      class="hero-media"
    />
    <div
      v-if="(title && title.length > 0) || (text && text.length > 0)"
      class="hero-content"
    >
      <h1
        v-if="title && title.length > 0"
        :class="{ [titleClasses]: titleClasses.length > 0 }"
        class="hero-title"
      >
        {{ title }}
      </h1>
      <template v-if="![null, undefined].includes(text)">
        <div
          class="hero-text text-sm"
          :class="{ [contentClasses]: contentClasses.length > 0 }"
          v-html="text"
        />
      </template>
      <div
        v-if="Array.isArray(buttons) && buttons.length > 0"
        class="hero-buttons"
      >
        <Link
          v-for="btn in buttons"
          :key="btn.id"
          :link="btn.link"
          :open-new-tab="btn.openNewTab"
        >
        <gButton :class="{ ['' + btn.buttonClasses + '']: typeof btn.buttonClasses === 'string' && btn.buttonClasses.length > 0 }">
          {{ btn.text }}
        </gButton>
        </Link>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import {camelToHandle} from '~/utils/funcs'
export default {
  props: {
    block: {
      type: Object,
      default: () => {
        return {
          title: null,
          content: null,
          media: null,
          youtube: null,
          buttons: null,
          heroSettings: {
            mediaClasses: null,
            contentClasses: null,
            titleClasses: null,
            overlayClasses: null,
            style: 'overlay'
          }
        }
      }
    }
  },
  data () {
    return {
      media: ![null, undefined].includes(this.block) &&
      ![null, undefined].includes(this.block.media) &&
      this.block.media.url
        ? this.block.media
        : null,
      title: typeof this?.block?.title === 'string' &&
      this.block.title.length > 0
        ? this.block.title
        : null,
      text: typeof this?.block?.text === 'string' &&
      this.block.text.length > 0
        ? this.block.text
        : null,
      buttons: Array.isArray(this?.block?.buttons) ? this.block.buttons: [],
      heroStyle: [undefined, null].includes(this?.block?.heroSettings?.style) ? 'overlay' : camelToHandle(this.block.heroSettings.style),
      youtube: typeof this?.block?.youtube === 'string' && this.block.youtube.length > 0 ? this.block.youtube : null,
      mediaClasses: typeof this?.block?.heroSettings?.mediaClasses === 'string' ? this.block.heroSettings.mediaClasses : '',
      titleClasses: typeof this?.block?.heroSettings?.titleClasses === 'string' && this.block.heroSettings.titleClasses.length > 0 ? this.block.heroSettings.titleClasses : '',
      contentClasses: typeof this?.block?.heroSettings?.contentClasses === 'string' && this.block.heroSettings.contentClasses.length > 0 ? this.block.heroSettings.contentClasses : '',
      overlayClasses: typeof this?.block?.heroSettings?.overlayClasses === 'string' && this.block.heroSettings.overlayClasses.length > 0 ? this.block.heroSettings.overlayClasses : ''
    }
  }
}
</script>

<style lang="scss">
.hero-content {
  * {
    color: inherit;
    text-align: inherit;
  }
}
.hero-media,
.hero-content {
  @apply order-1;
}
.hero {
  @apply transition-all ease-quick-in duration-200 rounded bg-white bg-opacity-5 shadow-md overflow-hidden;
  * {
    &:not(.overlay) {
      @apply z-1 relative;
    }
  }
  &.has-link {
    @apply transform hover:shadow-none hover:bg-opacity-025;
    &:not(.has-more-links) {
      .hero-link {
        @apply h-full w-full scale-100 hover:scale-[.98];
      }
    }
  }
  .hero-link {
    @apply flex overflow-hidden w-full transition-all duration-200 ease-quick-in scale-100;
  }
  .hero-buttons {
    @apply flex space-x-2 mt-2;
    button {
      @apply bg-white text-gray-700 hover:bg-srp-red hover:text-white;
    }
  }
  &.hero-style {
    &-overlay,
    &-overlay-centered {
      @apply relative;
      .hero-media {
        @apply relative z-1;
      }
      .hero-content {
        @apply absolute top-1/2 transform -translate-y-1/2 left-4 right-4 z-10;
      }
      .hero-title,
      .hero-text * {
        text-shadow: 0 0 40px rgba(0, 0, 0, 0.7);
      }
    }
    &-overlay-centered {
      .hero-content,
      .hero-title,
      .hero-text {
        @apply text-center;
      }
      .hero-text * {
        @apply mx-auto;
      }
      .hero-buttons {
        @apply content-center justify-center;
      }
    }
    &-media {
      &-left {
        @apply items-center content-between;
        .hero-content {
          @apply mr-auto w-2/3;
        }
        .hero-media {
          @apply mr-3 w-1/3;
        }
      }
      &-right {
        @apply items-center content-between;
        .hero-content {
          @apply mr-auto w-2/3 text-center;
        }
        .hero-media {
          @apply ml-2 order-2 w-1/3;
        }
      }
    }
    .media {
      .overlay {
        @apply hidden;
      }
    }
  }
}
</style>
