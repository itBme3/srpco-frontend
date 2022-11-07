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
      ref="tabsElem"
      class="tabs-header list-none flex items-center content-center min-w-full space-x-2 p-0 m-0"
      :class="{ [classes.tabs]: true }">
      <li
        v-for="(tabTitle, i) in tabTitles"
        :key="tabTitle"
        class="a-tab">
        <gButton 
          classes="px-3 py-1 rounded text-lg sm:text-xl w-auto hover:bg-gray-300 hover:text-gray-800 hover:shadow-lg"
          :class="{
            [`active ${classes.activeTab}`]: activeIndex === i,
            [classes.tab]: activeIndex !== i,
          }"
          @click="activeTab = tabTitle">
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
import { handleize } from '~/utils/funcs'

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
    },
    active: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeTitle: handleize(this.$route.hash.replace('#', '')),
      activeIndex: 0,
      tabTitles: []
    }
  },
  computed: {
    tabs () {
      return this.$slots.default.filter(t => !!t.tag)
    },
    activeTab: {
      get() {
        return this.activeTitle
      },
      set (val) {
        const previousActiveTitle = this.activeTitle;
        this.activeTitle = handleize(val);
        this.tabs.forEach((tab, i) => {
          const collectionType = tab.componentInstance.$slots.default
            .filter(c => c.componentInstance.$children
              .filter(child => child.collection))
            .map(c => c.componentInstance.$children
              .map(child => child.collection).filter(c => !!c)[0])[0];
          tab.componentInstance.isActive = handleize(val) === handleize(tab.componentInstance.title)
            || handleize(val) === handleize(collectionType);
          if (tab.componentInstance.isActive) {
            this.activeIndex = i;
            if (previousActiveTitle !== this.activeTitle) {
              const top = (() => {
                function addUpOffset(elem, acc = 0) {
                  if (elem.tagName.toLowerCase() === 'main') {
                    return acc;
                  }
                  return addUpOffset(elem.offsetParent, elem.offsetTop + acc)
                };
                return addUpOffset(this.$refs.tabsElem);
              })();
              window.scrollTo({ top: top - 100, behavior: 'smooth' });
              history.pushState(
                {}, '', `${this.$route.path}#${handleize(this.activeTitle)}`,
              )
            }
          }
        });
      }
    }
  },
  watch: {
    active (val) {
      this.activeTitle = val
    }
  },
  mounted () {
    this.tabTitles = this.tabs.map(tab => tab?.componentInstance?.title || null).filter(t => !!t) || []
    this.activeTab = this.activeTitle.length ? this.activeTitle : this.tabTitles[0]
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
      @apply border border-gray-600 text-gray-200 hover:border-gray-200 whitespace-nowrap;
      &:nth-child(1) {
        @apply ml-auto;
      }
      &:nth-last-child(1) {
        @apply mr-auto;
      }
      &.active {
        @apply bg-gray-200 text-gray-800 border-gray-200 hover:scale-100 cursor-default;
      }
    }
  }
}
</style>