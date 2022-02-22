<template>

  <Carousel
    v-if="slides && slides.length > 0"
    :options="options"
  >

    <div
      class="slide"
      v-for="(slide, i) in slides"
      :key="'slide-' + i"
    >
      <Media
        v-if="slide.media && slide.media.url"
        :media="slide.media"
        :is-background="true"
      />
      <div
        v-if="slide.content && slide.content.length > 0"
        class="slide-content"
        v-html="slide.content"
      ></div>
    </div>
  </Carousel>

</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: () => null
    }
  },
  data () {
    const { carouselSettings: options = {}, slides, blockSettings = {} } = !!this.block ? this.block : {}
    return { options: options === null ? {} : options, slides, blockSettings }
  },
  created () {
    console.log({ block: this.block })
  }
}
</script>