<template>
  <ul
    v-if="Array.isArray(block.items)"
    :class="{
      'icon-list': true,
      [contentClasses]: true
    }"
  >
    <li
      v-for="(item, i) in block.items"
      :key="i"
      :class="{
        'list-item': true, 
        [!!item.classes && item.classes.item ? item.classes.item : '']: true
      }"
    >
      <Icon
        :icon-name="item.icon && item.icon.length ? item.icon : defaultIcon"
        :class="{
          [iconClasses]: true,
          [!!item.classes && item.classes.icon ? item.classes.icon : '']: true
        }"
      />
      <span
        :class="{
          'list-item-text': true, 
           [!!item.classes && item.classes.text ? item.classes.text : '']: true
        }"
        v-html="item.text"
      />
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    block: {
      type: Object,
      default: () => null
      /*
      title icon
      items { icon classes text }
      blockSettings
      */
    }
  },
  computed: {
    iconClasses () {
      return this.block?.blockSettings?.classes?.icons || ''
    },
    contentClasses () {
      return this.block?.blockSettings?.classes?.content || ''
    },
    defaultIcon () {
      return this?.block?.icon?.length ? this.block.icon : 'check'
    }
  }
})
</script>


<style lang="scss">
.icon-list {
  list-style: none;
  @apply sm:text-[150%];
  .list-item {
    @apply mb-5 relative pl-8;
    .icon {
      @apply text-xl absolute -left-1 top-2;
      color: var(--block-content-color);
    }
  }
}
</style>