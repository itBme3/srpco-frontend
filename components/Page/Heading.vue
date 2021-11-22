<template>
  <div class="page-heading w-full max-w-full">
    <div class="my-auto">
      <h1
        v-if="title !== null && title.length > 0"
        :class="{ 'heading-title': true, [titleClasses]: titleClasses.length > 0 }"
      >
        {{ title }}
      </h1>
      <h5
        v-if="description !== null && title.length > 0"
        :class="{ 'headinge-description': true, [descriptionClasses]: descriptionClasses.length > 0 }"
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
    }
  }
}
</script>
<style lang="scss">
.page-heading {
  @apply flex items-center content-start text-gray-300
}
.page-title {
  @apply text-xl md:text-3xl lg:text-4xl
}
</style>