<template>
  <div
    class="card flex flex-col items-start hover:scale-102"
    :class="{
      'has-more-links' : hasMoreLinks,
      'has-link' : hasLink,
      'no-media': ([undefined, null].includes(media) || typeof media.url !== 'string' || !media.url.length) && ([undefined, null].includes(youtube) || !youtube.length),
      'has-text': typeof text === 'string' && text.length > 0,
      'has-title': typeof title === 'string' && title.length > 0,
      'has-video': typeof youtube === 'string' && youtube.length > 0,
      'has-pdf-thumb': !!media && media.url === 'string' && media.url.includes('.pdf') && !showPdfPreview
    }"
    @click="(e) => $emit('click', e)"
  >
    <Link
      class="card-link"
      :class="{
        [classes.link]: !!classes && !!classes.link && !!classes.link.length,
        'card-style-overlay': cardStyle === 'overlay',
        'card-style-media-left': cardStyle === 'mediaLeft',
        'card-style-media-right': cardStyle === 'mediaRight',
        'card-style-media-above': cardStyle === 'mediaAbove',
        'card-more-links': hasMoreLinks
      }"
      :to="link"
      :modal-data="{ youtube: youtube, media: media, title: title, text:text }"
      :open-new-tab="openNewTab === true"
      :style="`height: ${cardLinkHeight}`"
      @open-modal="(e) => openModal(e)"
    >
    <template v-if="!!media && typeof media.url === 'string' && media.url.includes('.pdf') && !showPdfPreview">
      <Icon icon-name="datasheet" />
    </template>
    
    <Media
      v-else-if="(!!media && !!media.url) || (typeof youtube === 'string' && youtube.length > 0)"
      ref="cardMediaEl"
      :lazy="lazy"
      :media="media"
      :ratio="mediaRatio"
      :overlay="cardStyle === 'overlay'"
      :class="{ [mediaClasses]: mediaClasses.length > 0 }"
      :is-background="true"
      :youtube="youtube"
      :video-params="videoParams"
      class="card-media"
    />
    <div
      v-if="(title && title.length > 0) || (text && text.length > 0)"
      class="card-content"
      :class="{
        [classes.content]: !!classes && !!classes.content && !!classes.content.length
      }"
    >
      <h4 
        v-if="subtitle"
        class="subtitle"
        :class="{ [subtitleClasses]: !!subtitleClasses }">
        {{ subtitle }}
      </h4>
      <gTag
        v-if="title && title.length > 0"
        :tag-name="titleTag ? titleTag : cardStyle === 'overlay' ? 'h3' : 'h4'"
        :class="{ [titleClasses]: titleClasses.length > 0 }"
        class="card-title"
      >
        {{ title }}
      </gTag>
        <div
          v-if="cardText"
          class="card-text text-sm opacity-60"
          :class="{ [textClasses]: textClasses.length > 0 }"
          v-html="$md.render(cardText)"
        />
    </div>
    </Link>
    <CardMoreLinks
      :v-if="hasMoreLinks"
      :more-links="moreLinks"
      tag-name="small"
      class="more-links-container mt-3 w-full"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { CardStyle } from "~/models/blocks.model";
export default Vue.extend({
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
    subtitle: {
      type: String,
      default: null,
    },
    youtube: {
      type: String,
      default: null,
    },
    cardStyle: {
      type: String,
      default: CardStyle.MEDIA_LEFT,
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
    showPdfPreview: {
      type: Boolean,
      default: false
    },
    classes: {
      type: Object,
      default: () => {
        return {
          card: '',
          media: '',
          title: '',
          subtitle: '',
          text: '',
          content: '',
          subtitleClasses: ''
        }
      },
    },
    videoParams: {
      type: Object,
      default: () => {
        return {
          mute: false,
          autoplay: false,
          controls: true,
          loop: false,
          autohide: false,
          showInfo: true,
          modestbranding: true,
        }
      }
    },
    lazy: {
      type: Boolean,
      default: false
    },
    titleTag: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      cardLinkHeight: '100%'
    }
  },
  computed: {
    hasLink () {
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
    hasMoreLinks () {
      return this.moreLinks?.length > 0
    },
    titleClasses () {
      return !!this?.classes?.title ? this.classes.title : ''
    },
    mediaClasses () {
      return !!this?.classes?.media ? this.classes.media : ''
    },
    cardClasses () {
      return !!this?.classes?.card ? this.classes.card : ''
    },
    textClasses () {
      return !!this?.classes?.text ? this.classes.text : ''
    },
    subtitleClasses () {
      return !!this?.classes?.subtitle ? this.classes.subtitle : ''
    },
    cardText () {
      return this.text?.includes('•') ? `<ul>${this.text.split('•').map(item => `<li>${item.trim()}</li>`).join('\n')}</ul>` : this.text
    },
    cardLinkHeightComputed () {
      return this.$refs?.cardMediaEl?.imgHeight || '100%'
    }
  },
  watch: {
    '$store.state.window.width' () {
      this.setLinkHeight();
    }
  },
  mounted () {
    this.setLinkHeight();
  },
  methods: {
    openModal (modalData) {
      this.$store.commit('modal/open', modalData)
    },
    setLinkHeight () {
      if (this.$refs.cardMediaEl && this.cardStyle === "overlay") {
        this.cardLinkHeight = this.$refs.cardMediaEl.imgHeight
      }
    }
  },
});
</script>

<style lang="scss">
.card-content {
  @apply text-left;
  * {
    color: inherit;
    text-align: inherit;
  }
}
.subtitle {
  @apply text-sm sm:text-base opacity-50 mb-2;
}
.card-media,
.card-content {
  @apply order-1 py-3;
}
.card-media {
  .overlay {
    .icon {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: scale(.9);
    }
  }
}
.datasheets .card,
.card.datasheet {
  .card-title {
    @apply text-gray-300 text-2xl;
  }
  .icon {
    @apply m-auto mr-1 ml-0;
    fill: var(--block-color);
  }
  .media {
    @apply max-w-[100px];
    .media-pdf {
      @apply w-full;
    }
  }
}
.card {
  @apply transition-all ease-quick-in duration-200 rounded bg-white bg-opacity-5 shadow-md overflow-hidden;
  &.no-media {
    @apply p-6 sm:p-8;
  }
  &.has-link {
    @apply transform hover:shadow-none hover:bg-opacity-025;
    &:not(.has-more-links) {
      .card-link {
        @apply h-full w-full scale-100 hover:scale-[.98];
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
    @apply p-4 rounded-lg hover:border-gray-700 border-2 border-gray-800;
    &.card-style-media-left {
      @apply hover:pl-4;
    }
    .card-link {
      @apply pl-0 rounded-md transition-all ease-quick-in duration-200 transform shadow-xl bg-gray-800 bg-opacity-0 hover:bg-opacity-40 hover:scale-[1.02] scale-100;
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
  .card-style-overlay {
    @apply relative;
    .card-media {
      @apply relative z-1;
    }
    .card-content {
      @apply absolute top-1/2 transform -translate-y-1/2 left-4 right-4 z-10;
    }
    .card-title,
    .card-text * {
      @apply order-last;
      text-shadow: 0 0 40px rgba(0, 0, 0, 0.7);
    }
  }
  .card-style-media-above {
    @apply flex-col;
    .card-content {
      @apply py-4 px-4;
    }
    .card-text {
      @apply px-4;
    }
    .card-media {
      @apply w-full;
    }
  }
  &:not(.no-media) {
    .card-style-media-left {
      @apply items-start content-between gap-2 sm:gap-3 md:gap-4;
      .card-content {
        @apply mr-auto w-2/3 px-2 py-0 my-auto;
      }
      .card-media {
        @apply my-auto w-[calc(33.333%-.75rem)];
      }
    }
    .card-style-media-right {
      @apply items-center content-between;
      .card-content {
        @apply mr-auto w-2/3 text-center;
      }
      .card-media {
        @apply order-2 w-1/3;
      }
    }
  }
  &.has-text {
    [class*='card-style'] {
      @apply flex-wrap;
      .card-text {
        @apply order-last;
        ul {
          @apply py-0 my-0;
          li {
            @apply pb-0;
            &:nth-child(1) {
              @apply pt-0;
            }
          }
        }
      }
    }
    .card-style-media-above,
    .card-style-overlay {
      .card-text {
        @apply px-0 py-3;
      }
    }
    .card-style-media-left,
    .card-style-media-right {
      .card-media {
        @apply h-full my-auto;
      }
    }
    .card-style-media-left {
      .card-media {
        @apply rounded ml-[.5rem] mr-[.5rem] mt-[.5rem] w-[calc(33.333%-1rem)];
      }
    }
  }
  &.has-video {
    &:not(.has-title) {
      &:not(.has-text) {
        @apply h-full;
        .card-media {
          @apply min-h-full #{!important};
        }
      }
    }
  }
}
.collection-entries {
  .card { 
    &:not(.service) {
      .card-style-media-left,
      .card-style-media-right {
        @apply p-4;
        .card-media {
          @apply max-w-[80px] rounded-md;
        }
      }
    }
  }
}
</style>
