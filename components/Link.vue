<template>
  <nuxt-link
    v-if="typeof link === 'string' && link.indexOf('/') === 0 && openNewTab !== true"
    :to="link"
  >
    <slot />
  </nuxt-link>
  <a
    v-else-if="typeof link === 'string' && link.length > 0"
    :href="link"
    class="simple-link"
    :target="openNewTab === true ? '_blank' : '_self'"
  >
    <slot />
  </a>
  <div v-else>
    <slot />
  </div>
</template>

<script>

export default {
  props: {
    openNewTab: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: null
    }
  }
}
</script>
