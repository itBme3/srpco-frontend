<template>
  <Link
    :link="link"
    class="tag-link inline-block"
    :open-new-tab="openNewTab">
    <t-tag>
      <slot></slot>
    </t-tag>
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