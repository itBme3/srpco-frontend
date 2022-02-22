
<template>
  <div
    class="hero w-full h-auto"
    :class="{[
    'hero-style-' + heroStyle]: heroStyle,
    'no-media': [undefined, null].includes(media) && [undefined, null].includes(youtube),
    'has-video': typeof youtube === 'string' && youtube.length > 0,
    }"
  >

    <Media
      v-if="(!!media && !!media.url) || (typeof youtube === 'string' && youtube.length > 0)"
      :media="media"
      :ratio="'auto'"
      :overlayClasses="overlayClasses"
      :overlay="typeof overlayClasses === 'string' && overlayClasses.length > 0"
      :class="{ [mediaClasses]: mediaClasses.length > 0 }"
      :is-background="true"
      :youtube="youtube"
      :video-params=" {
          mute: heroStyle === 'overlay' || heroStyle.includes('overlay'),
          autoplay: heroStyle === 'overlay' || heroStyle.includes('overlay'),
          controls: false,
          loop: !!heroStyle === 'overlay' || heroStyle.includes('overlay'),
          autohide: true,
          showInfo: false,
          modestbranding: true,
      }"
      class="hero-media"
    />
    <div
      v-if="(title && title.length > 0) || (text && text.length > 0)"
      :class="{
        'hero-content': true,
        [contentClasses]: contentClasses.length > 0
        }"
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
          :class="{ [textClasses]: textClasses.length > 0 }"
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
        <gButton :class="{ 
          ['' + btn.buttonClasses + '']: typeof btn.buttonClasses === 'string' && btn.buttonClasses.length > 0
          }">
          {{ btn.text }}
        </gButton>
        </Link>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import {camelToHandle} from '~/utils/funcs'
import { getHeroClasses } from '~/utils/get-classes'
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
            style: 'overlay',
            classes: {
              media: '',
              content: '',
              title: '',
              overlay: '',
            }
          }
        }
      }
    }
  },
  data () {
    const { media: mediaClasses = '', title: titleClasses = '', text: textClasses = '', content: contentClasses = '', buttons: buttonsClasses = '', overlay: overlayClasses = '' } = getHeroClasses(this.block)
    return {
      media: !!this?.block?.media?.url ? this.block.media : null,
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
      mediaClasses,
      titleClasses,
      textClasses,
      contentClasses,
      overlayClasses,
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
  @apply transition-all ease-quick-in duration-200 shadow-md overflow-visible relative px-4 py-8 md:px-8 md:py-16 min-h-[50vh];
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
  &.has-video {
    @apply h-[50vw] max-h-[800px] #{!important};
    .media {
      @apply overflow-hidden rounded shadow-xl;
    }
  }
  &.no-media {
    @apply min-h-12 h-auto;
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
      @apply relative px-3 py-8 flex items-center justify-center;
      .hero-media {
        @apply absolute inset-0 z-1;
      }
      .hero-content {
        @apply relative z-10;
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
      &-left,
      &-right {
        @apply mb-[50%] md:mb-0 items-center justify-center flex flex-col md:flex-row overflow-visible;
        .hero-media {
          @apply absolute top-0 bottom-0 left-0 right-0 m-0;
        }
        .hero-content {
          @apply w-[calc(100%-2rem)] max-w-md bg-gray-50 text-gray-700 rounded p-4 sm:p-8 my-auto mx-0 -mb-[50%] mt-[30%] md:mt-auto md:mb-auto;
          .hero-title {
            @apply mb-3;
          }
        }
      }
      &-left {
        .hero-media {
          @apply md:right-1/3;
        }
        .hero-content {
          @apply ml-auto;
        }
      }
      &-right {
        .hero-media {
          @apply md:order-last md:left-1/3;
        }
        .hero-content {
          @apply mr-auto;
        }
      }
    }
  }
}
</style>
