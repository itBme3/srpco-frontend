<template>
  <nuxt-link
    v-if="!!link && !!link.indexOf && link.indexOf('/') > -1 && newTab !== true"
    :to="link"
  >
    <t-button :class="classes.button">
      <slot />
    </t-button>
  </nuxt-link>
  <a
    v-else
    :target="newTab === true ? '_blank' : '_self'"
    :href="link"
  >
    <t-button :class="classes.button">
      <slot />
    </t-button>
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
