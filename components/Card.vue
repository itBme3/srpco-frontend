<template>
  <div
    class="card flex flex-col items-start hover:scale-102"
    :class="{
      'has-more-links' : Array.isArray(moreLinks) && moreLinks.length > 0,
      'has-link' : hasLink,
      'no-media': [undefined, null].includes(media) && [undefined, null].includes(youtube)
    }"
  >
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
      :modal-data="!!link && !!link.split && link.split('/').length > 2 && ['gaskets'].includes(link.split('/')[1]) ? null : { youtube: youtube, media: media, tile: title, text:text }"
      :open-new-tab="openNewTab === true"
      @open-modal="(e) => openModal(e)"
    >
    <template v-if="typeof media === 'string' && media.indexOf('gicon') > -1">
      <Icon icon-name="datasheets" />
    </template>
    <Media
      v-else-if="(!!media && !!media.url) || (typeof youtube === 'string' && youtube.length > 0)"
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
      <gTag
        v-if="title && title.length > 0"
        :tag-name="cardStyle === 'overlay' ? 'h2' : 'h3'"
        :class="{ [titleClasses]: titleClasses.length > 0 }"
        class="card-title"
      >
        {{ title }}
      </gTag>
      <template v-if="text && text.length > 0">
        <div
          class="card-text text-sm opacity-60"
          :class="{ [textClasses]: textClasses.length > 0 }"
          v-html="text"
        />
      </template>
    </div>
    </Link>
    <CardMoreLinks
      :v-if="Array.isArray(moreLinks) && moreLinks.length > 0"
      :more-links="moreLinks"
      tag-name="small"
      class="more-links-container mt-3 w-full"
    />
  </div>
</template>

<script lang="js">
import { CardStyle } from "~/models/blocks.model";
export default {
  props: {
    media: {
      type: [Object, String],
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    titleClasses: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
      default: null,
    },
    textClasses: {
      type: String,
      default: "",
    },
    mediaClasses: {
      type: String,
      default: "",
    },
    cardStyle: {
      type: String,
      default: CardStyle.MEDIA_ABOVE,
    },
    mediaRatio: {
      type: String,
      default: "auto",
    },
    link: {
      type: String,
      default: null,
    },
    openNewTab: {
      type: Boolean,
      default: false,
    },
    moreLinks: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    hasLink() {
      if (
        (typeof this.link === "string" && this.link.length > 0) ||
        (typeof this.youtube === "string" && this.youtube.length > 0) ||
        (![undefined, null].includes(this.media) &&
          typeof this.media.mime === "string" &&
          this.media.mime.includes("pdf"))
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    openModal(modalData) {
      this.$store.commit('modal/open', modalData)
    }
  }
};
</script>

<style lang="scss">
.card-content {
  @apply text-left;
  * {
    color: inherit;
    text-align: inherit;
  }
}
.card-media,
.card-content {
  @apply order-1;
}
.card {
  @apply transition-all ease-quick-in duration-200 rounded bg-white bg-opacity-5 shadow-md overflow-hidden;
  &.no-media {
    @apply p-8;
  }
  &.has-link {
    @apply transform hover:shadow-none hover:bg-opacity-025;
    &:not(.has-more-links) {
      .card-link {
        @apply h-full w-full scale-100 hover:scale-[.98];
      }
    }
  }
  &.datasheet {
    .media {
      @apply max-w-[100px];
      .media-pdf {
        @apply w-full;
      }
    }
  }
  &:not(.has-link) {
    .card-link {
      @apply cursor-default;
    }
  }
  .card-link {
    @apply flex overflow-hidden w-full transition-all duration-200 ease-quick-in scale-100;
  }
  &.has-more-links {
    @apply p-3;
    .card-link {
      @apply rounded-md transition-all ease-quick-in duration-200 transform shadow-xl bg-gray-700 bg-opacity-20 hover:bg-opacity-30 hover:scale-100 scale-[.98];
      .button-link {
        @apply text-gray-200;
      }
    }
    .tag-link {
      @apply text-gray-400;
    }
    .card-title {
      @apply text-lg sm:text-xl tracking-wider;
    }
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
      .card-title,
      .card-text * {
        text-shadow: 0 0 40px rgba(0, 0, 0, 0.7);
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
          @apply mr-3 w-1/3;
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
