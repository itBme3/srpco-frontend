
<template>
  <div
    class="hero block w-full h-auto"
  >
    <Media
      v-if="(!!media && !!media.url) || (typeof youtube === 'string' && youtube.length > 0)"
      :media="media"
      :ratio="mediaRatio"
      :overlay="heroStyle === 'overlay'"
      :class="{ [mediaClasses]: mediaClasses.length > 0 }"
      :is-background="['mediaLeft', 'mediaRight', 'overlay'].includes(heroStyle)"
      :youtube="youtube"
      class="hero-media"
    />
    <div
      v-if="(title && title.length > 0) || (text && text.length > 0)"
      class="hero-content"
    >
      <h2
        v-if="title && title.length > 0"
        :class="{ [titleClasses]: titleClasses.length > 0 }"
        class="hero-title"
      >
        {{ title }}
      </h2>
      <template v-if="![null, undefined].includes(text)">
        <div
          class="hero-text text-sm opacity-60"
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
          <gButton :class="{ [buttonClasses]: typeof buttonClasses === 'string' && buttonClasses.length > 0 }">
            {{ btn.text }}
          </gButton>
        </Link>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  props: {
    block: {
      type: Object,
      default: () => {
        return {
          media: null,
          title: null,
          content: null,
          buttons: null,
          mediaClasses: null,
          contentClasses: null,
          titleClasses: null,
          overlayClasses: null,
          heroStyle: null
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
      heroStyle: ![undefined, null].includes(this?.block?.heroStyle)

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
  .hero-media, .hero-content {
    @apply order-1
  }
  .hero {
    @apply  transition-all ease-quick-in duration-200 rounded bg-white bg-opacity-5 shadow-md overflow-hidden;
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
    &.has-more-links {
      @apply p-3;
      .hero-link {
        @apply rounded-md transition-all ease-quick-in duration-200 transform shadow-xl bg-gray-700 bg-opacity-20 hover:bg-opacity-30 hover:scale-100 scale-[.98];
        .button-link {
          @apply text-gray-200;
        }
      }
      .tag-link {
        @apply text-gray-400;
      }
      .hero-title {
        @apply text-lg sm:text-xl tracking-wider;
      }
    }
    .hero-style {
      &-overlay {
        @apply relative;
        .hero-media {
          @apply relative z-1;
        }
        .hero-content {
          @apply absolute top-1/2 transform -translate-y-1/2 left-4 right-4 z-10;
        }
        .hero-title, .hero-text * {
          text-shadow: 0 0 40px rgba(0,0,0,.7);
        }
      }
      &-media {
        &-above {
          @apply flex-col;
          .hero-content {
            @apply pt-2 px-4 pb-3;
          }
        }
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
    }
  }
</style>
