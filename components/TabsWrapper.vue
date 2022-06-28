<template>
  <div class="tabs-wrapper">
    <scrollbar
      ref="scroll"
      class="tabs-header max-w-full pb-2"
      :options="{ suppressScrollY: true, suppressScrollX: false }"
      @ps-scroll-x="(e) => scrollHandler(e, 'scroll-x')"
      @ps-scroll-y="(e) => scrollHandler(e, 'scroll-y')"
      @ps-scroll-up="(e) => scrollHandler(e, 'scroll-up')"
      @ps-scroll-down="(e) => scrollHandler(e, 'scroll-down')"
    >
    <ul
      class="tabs-header list-none flex items-center content-start min-w-full space-x-2 p-0 m-0"
      :class="{ [classes.tabs]: true }">
      <li
v-for="tabTitle in tabTitles"
          :key="tabTitle">
        <gButton 
          classes="pl-3 pr-2 py-1 rounded w-auto hover:bg-gray-300 hover:text-gray-800 hover:shadow-lg"
          :class="{
            [`active ${classes.activeTab}`]: activeTitle === tabTitle,
            [classes.tab]: activeTitle !== tabTitle,
            
          }"
          @click="activeTitle = tabTitle">
          {{ tabTitle }}
        </gButton>
      </li>
    </ul>
    </scrollbar>
    <div
class="tabs-panels"
    :class="{ [classes.panels]: true }">
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    classes: {
      type: Object,
      default: () => {
        return {
          tabs: '',
          tab: '',
          activeTab: '',
          panels: '',
        }
      }
    }
  },
  data () {
    return {
      aTitle: null,
      tabTitles: []
    }
  },
  computed: {
    tabs () {
      return this.$slots.default.filter(t => !!t.tag)
    },
    activeTitle: {
      get() {
        return this.aTitle
      },
      set (val) {
        this.aTitle = val;
        this.tabs.forEach(tab => {
          tab.componentInstance.isActive = val === tab.componentInstance.title
        });
        console.log(this.tabs.map(tab => 
          tab.componentInstance.isActive
        ))
      }
    }
  },
  mounted () {
    this.tabTitles = this.tabs.map(tab => tab?.componentInstance?.title || null).filter(t => !!t) || []
    if (!this.activeTitle) {
      this.activeTitle = this.tabTitles[0]
    }
  },
  methods: {
    scrollHandler (e, eventName) {
      return { e, eventName }
    }
  }
})
</script>

<style lang="scss">
.tabs-wrapper {
  @apply w-full;
  .tabs-header {
    button {
      @apply border border-gray-600 text-gray-200 hover:border-gray-200;
      &.active {
        @apply bg-gray-200 text-gray-800 border-gray-200 hover:scale-100 cursor-default;
      }
    }
  }
}
</style>