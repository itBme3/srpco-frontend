<template>
  <div
    class="heading flex flex-wrap w-full max-w-full"
    :class="{
      ['heading-' + headingType + '']:
        typeof headingType === 'string' && headingType.length > 0,
      'has-media':
        (![undefined, null].includes(media) && typeof media.url === 'string') ||
        (typeof youtube === 'string' && youtube.length > 0)
    }"
  >
    <Breadcrumbs
      v-if="!!breadcrumbs && headingType === 'page'"
      class="heading-breadcrumbs"
    />
    <div class="heading-content">
      <Media
        v-if="
          ![null, undefined].includes(media) && typeof media.url === 'string'
        "
        :media="media"
        class="order-0 h-full"
        :is-background="true"
        :class="{ 'heading-media': true, [classes.media]: !!classes.media }"
        :ratio="mediaRatio"
        :overlay="typeof classes.overlay === 'string' && !!classes.overlay"
        :overlay-classes="classes.overlay"
      />
      <div class="heading-text-content">
        <slot name="preTitle"></slot>
        <h1
          v-if="title !== null && title.length > 0"
          :class="{ 'heading-title': true, [classes.title]: !!classes.title }"
        >
          {{ title }}
          <span
            v-if="divider && description !== null && title.length > 0"
            class="divider h-3 my-2 bg-gray-200 block"
            :class="{
              [classes.description]: !!classes.description
            }"
            :style="{ width: `${title.length * 0.6}ch` }"
          />
        </h1>
        <component
          :is="descriptionArray.length > 1 ? 'ul' : 'h2'"
          v-if="descriptionArray.length > 0 && title.length > 0"
          :class="{
            'heading-description': true,
            [classes.description]: !!classes.description
          }"
          v-html="
            $md.render(
              descriptionArray.length === 1
                ? descriptionArray[0]
                : descriptionArray.map((itm) => `<li>${itm}</li>`).join('')
            )
          "
        />
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
    classes: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        media: '',
        overlay: ''
      })
    },
    breadcrumbs: {
      type: Boolean,
      default: true
    },
    mediaRatio: {
      type: String,
      default: 'auto'
    },
    divider: {
      type: Boolean,
      default: false
    },
    
  },
  computed: {
    descriptionArray() {
      return typeof this.description === 'string'
        ? this.description.includes('•')
          ? this.description.split('•').map((item) => item.trim())
          : [this.description]
        : []
    }
  }
})
</script>
<style lang="scss">
.heading {
  @apply flex items-start content-start py-2 sm:py-0 relative;
  .heading-content {
    @apply block sm:flex flex-row items-center justify-start w-full;
  }
  .heading-text-content {
    @apply px-2 my-0 h-full flex w-full sm:order-first order-last flex-col content-start relative z-1;
    text-shadow: 3px 4px 14px rgba(7, 14, 32, 0.6), 0 0 60px rgb(7 14 26);
  }
  .heading-title {
    @apply text-gray-200 mb-2 font-black;
  }
  .heading-description {
    @apply text-base font-normal tracking-wide text-gray-500 leading-snug;
  }
  .heading-breadcrumbs {
    @apply justify-start w-full;
  }
  .heading-simple {
    .heading-text-content {
      @apply w-full text-center self-center;
    }
    .heading-breadcrumbs {
      @apply whitespace-nowrap order-first flex-shrink;
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
  &.heading-page {
    .heading-content {
      @apply whitespace-normal xs:whitespace-pre-line sm:whitespace-normal;
    }
    .heading-title {
      @apply text-gray-300;
    }
    .heading-media {
      @apply w-full xs:w-1/2 sm:w-3/5 mr-2;
    }
  }
  &.heading-collection {
    &.has-media {
      .heading-content {
        @apply block px-8 py-16;
        .heading-title,
        .heading-description {
          @apply text-gray-100;
        }
        .media {
          @apply absolute inset-0 w-full z-0 grayscale opacity-30 mx-0;
        }
      }
    }
  }
  &.has-media {
    .heading-text-content {
      @apply max-w-[100ch];
    }
  }
}
.single-entry {
  &.solution, &.resource {
    .heading {
      @apply max-w-6xl mx-auto #{!important};
      .heading-content {
        @apply relative mt-4;
        .heading-text-content {
          @apply z-10 relative;
          > * {
            @apply text-white;
          }
        }
      }
      &.has-media {
        .heading-content {
          @apply py-10;
          .heading-text-content {
            @apply p-8;
          }
        }
        .heading-media {
          @apply absolute w-full max-w-full inset-0 opacity-30 z-0 max-h-full;
        }
      }
    }
  }
  &.resource {
    .heading {
      .heading-media {
        @apply rounded;
      }
      .heading-text-content {
        @apply mt-auto mb-0 h-auto;
        h1 {
          @apply lg:text-4xl;
        }
      }
    }
    &.resource-article {
      .heading {
        .heading-content {
          @apply flex justify-end h-[70vw] max-h-[30rem];
        }
        .heading-text-content {
          @apply mb-0;
        }
      }
    }
    &.resource-video {
      .heading {
        .heading-content {
          @apply rounded-lg overflow-hidden;
        }
        .heading-media {
          @apply blur-sm;
        }
      }
    }
  }
  &.supplier {
    .heading-media {
      max-width: 200px;
      max-height: 200px;
    }
  }
  &.service {
    .heading {
      .heading-text-content {
        @apply px-0 py-6;
      }
    }
  }
}
</style>
