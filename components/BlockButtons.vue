
<template>
  <div
    v-if="!!buttons"
    class="buttons w-full h-auto"
    :class="{
      [contentClasses]: !!contentClasses.length
    }"
  >
    <template v-if="Array.isArray(buttons)">
      <Link
        v-for="(btn, i) in buttons"
        :key="'button-' + block.id + '-' + i"
        :to="btn.link"
        :open-new-tab="btn.openNewTab"
        :class="{ 
          ['' + btn.buttonClasses + '']: typeof btn.buttonClasses === 'string' && btn.buttonClasses.length > 0,
          [buttonsClasses]: !!buttonsClasses.length
        }"
        :is-button="true"
      >
        {{ btn.text }}
      </Link>
    </template>
  </div>
</template>

<script lang="js">

import Vue from 'vue'

export default Vue.extend({
  props: {
    block: {
      type: Object,
      default: () => {
        return {
          title: null,
          buttons: null
        }
      }
    }
  },
  computed: {
    buttons() {
      return !!this.block?.buttons?.length ? this.block.buttons : null
    },
    buttonsClasses() {
      return !!this.block?.blockSettings?.classes?.buttons?.length ? this.block.blockSettings.classes.buttons : ''
    },
    contentClasses() {
      return !!this.block?.blockSettings?.classes?.content?.length ? this.block.blockSettings.classes.content : ''
    }
  }
})
</script>

<style lang="scss" scoped>
.buttons {
  @apply flex;
  &.flex-col {
    @apply space-y-1;
  }
  &:not(.flex-col) {
    @apply space-x-1;
  }
}
</style>
