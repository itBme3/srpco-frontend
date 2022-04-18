<template>

  <Carousel
    v-if="slides && slides.length > 0"
    :options="options"
    :class="{
        [classes.content]: classes.content && classes.content.length
    }"
  >

    <div
      :class="{
        'slide': true,
        [classes.slides]: classes.slides && classes.slides.length,
        [slide.classes && slide.classes.slide]: slide.classes && slide.classes.slide && slide.classes.slide.length
      }"
      v-for="(slide, i) in slides"
      :key="'slide-' + i"
    >
      <Media
        v-if="slide.media && slide.media.url"
        :media="slide.media"
        :is-background="true"
      />
      <Wysiwyg
        v-if="slide.content && slide.content.length > 0"
        :class="{
          [slide.classes && slide.classes.content]: slide.classes && slide.classes.content && slide.classes.content.length
        }"
        :content="slide.content"
      />
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
    const { carouselOptions: options = {}, slides, blockSettings = {} } = !!this.block ? this.block : {};
    return { options: options === null ? {} : options, slides, blockSettings }
  },
  computed: {
    classes () {
      return !!!this.blockSettings?.classes ? { content: '', title: '', slides: '' } : this.blockSettings.classes
    }
  }
}
</script>