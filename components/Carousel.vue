<template>
  <div class="carousel-wrapper w-full relative">
    <client-only>
      <flickity
        ref="carousel"
        class="carousel"
        :options="flickityOptions"
      >
        <slot></slot>
      </flickity>

      <button
        @click="previous()"
        class="next-previous-button previous"
      >
        <Icon
          icon-name="angle-left"
          class="m-auto"
        />
      </button>
      <button
        @click="next()"
        class="next-previous-button next"
      >
        <Icon
          icon-name="angle-right"
          class="m-auto"
        />
      </button>
    </client-only>
  </div>
</template>

<script>
// import Flickity from 'vue-flickity';

const defaultFlickityOptions = {
  pageDots: false,
  contain: true,
  wrapAround: true,
  adaptiveHeight: true
};
export default {
  // components: {
  //   Flickity
  // },
  props: {
    options: {
      type: Object,
      default: () => defaultFlickityOptions
    }
  },
  data () {
    return {
      flickityOptions: {
        ...this.options,
        ...defaultFlickityOptions,
        prevNextButtons: false,
        cellSelector: '.slide'
      }
    }
  },
  methods: {
    next () {
      this.$refs.carousel.next();
    },

    previous () {
      this.$refs.carousel.previous();
    }
  }
}
</script>


<style lang="scss">
.carousel {
  @apply px-9;
}
.next-previous-button {
  @apply absolute flex items-center content-center top-0 bottom-0 left-auto right-auto w-8 transform scale-100 hover:scale-100;
  &.previous {
    @apply left-0 content-start;
  }
  &.next {
    @apply right-0 content-end;
  }
}
</style>
