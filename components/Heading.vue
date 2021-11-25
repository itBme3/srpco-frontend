<template>
  <div
    class="heading flex w-full max-w-full"
    :class="{
      'heading-page': headingType === 'page',
      'heading-collection': headingType === 'collection',
      'has-media': (![undefined, null].includes(media) && typeof media.url === 'string') || typeof youtube === 'string' && youtube.length > 0
    }"
  >
    <div class="my-0 h-full flex w-full flex-col content-start">
      <Breadcrumbs v-if="!!breadcrumbs" class="mb-4 mt-0" />
      <h1
        v-if="title !== null && title.length > 0"
        :class="{ 'heading-title': true, [titleClasses]: titleClasses.length > 0 }"
      >
        {{ title }}
      </h1>
      <h5
        v-if="description !== null && title.length > 0"
        :class="{ 'heading-description': true, [descriptionClasses]: descriptionClasses.length > 0 }"
      >
        {{ description }}
      </h5>
    </div>
    <Media
      :v-if="media !== null && media.url"
      :media="media"
      :class="{ 'heading-media': true, [mediaClasses]: mediaClasses.length > 0 }"
    />
  </div>
</template>
<script>
export default {
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
    breadcrumbs: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss">
.heading {
  @apply flex items-start content-start;
  &-title {
    @apply text-xl md:text-4xl lg:text-5xl font-semibold text-gray-500;
  }
  &-description {
    @apply text-base font-normal tracking-wide text-gray-500;
  }
  &-media {
    @apply mx-2 rounded-sm shadow-2xl w-5/12;
  }
  &-page {
    .heading-title {
      @apply text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-500;
    }
  }
}
</style>
