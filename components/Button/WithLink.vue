<template>
  <div>
    <template v-if="!!link && !!link.indexOf && link.indexOf('/') > -1 && newTab !== true">
      <nuxt-link
        :to="link"
      >
        <t-button :class="classes.button">
          <slot />
        </t-button>
      </nuxt-link>
    </template>
    <template v-else>
      <a
        :target="newTab === true ? '_blank' : '_self'"
        :href="link"
      >
        <t-button :class="classes.button">
          <slot />
        </t-button>
      </a>
    </template>
  </div>
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
