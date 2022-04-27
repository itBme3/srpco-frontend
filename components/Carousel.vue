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
        class="next-previous-button previous"
        @click="previous()"
      >
        <Icon
          icon-name="angle-left"
          class="m-auto"
        />
      </button>
      <button
        class="next-previous-button next"
        @click="next()"
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
import Vue from 'vue'
import { asyncDelay } from '~/utils/funcs'
const defaultFlickityOptions = {
  pageDots: false,
  contain: true,
  wrapAround: true,
  adaptiveHeight: true
};
export default Vue.extend({
  
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
  mounted () {
    this.initialResize().catch(console.error)
    setTimeout(() => {
      console.log(this.$refs.carousel)
    }, 1000)
  },
  methods: {
    next () {
      this.$refs.carousel.next();
    },
    previous () {
      this.$refs.carousel.previous();
    },
    async initialResize () {
      let done = false;
      for (let i = 0; i < 10 && !done; i++) {
        await (async () => {
          await asyncDelay(250);
          if (!this.$slots?.default?.length || !this.$refs.carousel) { return }
          const carouselHeight = this.$refs.carousel._vnode.elm.offsetHeight;
          const shortestSlideHeight = this.$slots.default.map(vNode => vNode.elm.offsetWidth).sort((a, b) => a < b ? 1 : a > b ? -1 : 0).pop();
          if ((carouselHeight + 10) < shortestSlideHeight) {
            return this.$refs.carousel.resize()
          }
          done = true
        })();
        if (done || i === 9) {
          return
        }
      }
    }
  }
})
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
