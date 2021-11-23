<template>
  <Link
    :link="link"
    class="tag-link inline-block"
    :open-new-tab="openNewTab">
    <gTag>
      <slot></slot>
    </gTag>
  </Link>
</template>
<script>
export default {
  props: {
    link: {
      type: String,
      default: null
    },
    openNewTab: {
      type: Boolean,
      default: false
    },
    variation: {
      type: String,
      default: null
    }
  }
}
</script>