<template>
  <nuxt-link
    v-if="!!link && !!link.indexOf && link.indexOf('/') > -1 && newTab !== true"
    :to="link"
  >
    <gButton :class="classes.button">
      <slot />
    </gButton>
  </nuxt-link>
  <a
    v-else
    :target="newTab === true ? '_blank' : '_self'"
    :href="link"
  >
    <gButton :class="classes.button">
      <slot />
    </gButton>
  </a>
</template>

<script type="ts">
export default {
  props: {
    classes: {
      type: Object,
      default () {
        return {
          button: '',
          wrapper: ''
        }
      }
    },
    newTab: {
      type: Boolean,
      default: false
    },
    link: {
      type: String
    }
  }
}
</script>

<style lang="scss">
  .nav-link {
    a {
      @apply w-full
    }
  }
</style>
