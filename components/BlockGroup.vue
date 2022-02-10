<template>
  <div
    ref="container"
    v-if="Array.isArray(sections) && sections.length > 0"
    class="group-container rounded bg-black bg-opacity-5 shadow-lg mt-4"
  >

    <client-only>
      <scrollbar
        v-if="groupStyle === 'tabs'"
        ref="scrollTabs"
        class="tabs items-center space-x-2 relative z-2 flex flex-nowrap max-w-full pb-2"
        :options="{ suppressScrollY: true, suppressScrollX: false }"
        @ps-scroll-x="(e) => scrollHandler(e, 'scroll-x')"
        @ps-scroll-y="(e) => scrollHandler(e, 'scroll-y')"
        @ps-scroll-up="(e) => scrollHandler(e, 'scroll-up')"
        @ps-scroll-down="(e) => scrollHandler(e, 'scroll-down')"
      >
        <gButton
          v-for="(section, i) in sections"
          :key="i + '-' + handleize(section.title)"
          :class="{ 
            'tab my-auto': true,
            'active bg-red-500 text-white': activeIndex === i,
            [classes.buttons]: !!classes.buttons
          }"
          @click="toggleSections(i)"
        >
          {{ section.title }}
        </gButton>
      </scrollbar>
    </client-only>

    <div class="panels p-3">
      <div
        v-for="(section, i) in sections"
        :class="{ 'expanded': activeIndex === i }"
        :key="i + '-' + handleize(section.title) + '-2'"
        class="panel p-1"
      >
        <gButton
          :class="{
            'panel-heading': true,
            [classes.buttons]: !!classes.buttons,
            'bg-opacity-100': activeIndex === i,
            'bg-opacity-50': activeIndex !== i
          }"
          v-if="groupStyle === 'accordion' && ![undefined, null].includes(section) && typeof section.title === 'string'"
          @click="toggleSections(i)"
        >
          <scrollbar
            ref="scrollPanel"
            class="w-[calc(100%-36px)] items-center space-x-2 relative z-2 flex flex-nowrap"
            :options="{ suppressScrollY: true, suppressScrollX: false }"
            @ps-scroll-x="(e) => scrollHandler(e, 'scroll-x')"
            @ps-scroll-y="(e) => scrollHandler(e, 'scroll-y')"
            @ps-scroll-up="(e) => scrollHandler(e, 'scroll-up')"
            @ps-scroll-down="(e) => scrollHandler(e, 'scroll-down')"
          >
            <h3 class="whitespace-nowrap">{{ section.title }}</h3>
          </scrollbar>
          <i :class="{
            'gicon-angle-down ml-auto mr-0': true,
            [classes.icons]: !!classes.icons,
          }" />
        </gButton>
        <div
          v-if="hasExpanded.includes(i)"
          :class="{
            'panel-content': true,
            [classes.content]: !!classes.content,
            'expanded transition-all ease-quick-in duration-200 opacity-100 translate-y-0 animate-fade-in-down': i === activeIndex,
            'opacity-0 hidden -translate-y-full': i !== activeIndex
          }"
        >

          <BlockContent
            class="wysiwyg-content"
            v-if="![undefined, null].includes(section) && typeof section.content === 'string' && section.content.length > 0"
            :block="{
              title: null,
              content: section.content
            }"
          />

          <BlockDatasheets
            v-if="Array.isArray(section.datasheets) && section.datasheets.length > 0"
            :block="{ datasheets: section.datasheets, title: null }"
          />
          <div
            class='gaskets flex flex-col justify-content-start items-center px-3 space-y-2'
            v-if="Array.isArray(section.gaskets) && section.gaskets.length > 0"
          >
            <template v-for="entry in section.gaskets">
              <Card
                :key="entry.id"
                :card-style="'mediaLeft'"
                :title="entry.title"
                :text="null"
                :media="![null, undefined].includes(entry.file) ? entry.file : entry.media"
                :media-ratio="'4:2'"
                :link="'/' + entry.collectionType + '/' + entry.slug"
                :open-new-tab="false"
                class="collection-entry w-full"
                :is-background="true"
              />
            </template>
          </div>
          <BlockMaterials
            v-if="Array.isArray(section.materials) && section.materials.length > 0"
            class="w-full flex flex-col justify-content-start items-center px-3 space-y-2"
            :block="{ entries: section.materials, title: null }"
          />
          <BlockApplications
            v-if="Array.isArray(section.applications) && section.applications.length > 0"
            class="w-full flex flex-col justify-content-start items-center px-3 space-y-2"
            :block="{ entries: section.applications, title: null }"
          />
          <BlockResources
            v-if="Array.isArray(section.resources) && section.resources.length > 0"
            class="w-full flex flex-col justify-content-start items-center px-3 space-y-2"
            :block="{ entries: section.resources, title: null }"
          />

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { handleize } from '~/utils/funcs'
export default {
  props: {
    block: {
      type: Object,
      default: null
    },
    initialIndex: {
      type: Number | null,
      default: null
    }
  },
  mounted () {
    if (typeof this.activeIndex !== 'number' && this.block.groupStyle === 'tabs') {
      this.active = 0;
      this.hasExpanded.push(0)
    }
  },
  computed: {
    activeIndex () {
      return this.active
    }
  },
  data () {
    const classes = ['buttons', 'icons', 'content'].reduce((acc, key) => {
      try {
        return {
          ...acc, [key]: this.block?.blockSettings?.classes[key] || null
        }
      } catch (e) {
        return { ...acc, [key]: null }
      }
    }, {});
    return {
      active: this.initialIndex,
      groupStyle: ![undefined, null].includes(this.block) && typeof this.block.groupStyle === 'string' ? this.block.groupStyle : 'tabs',
      sections: ![undefined, null].includes(this.block) && Array.isArray(this.block.sections) && this.block.sections.length > 0 ? this.block.sections : null,
      title: ![undefined, null].includes(this.block) && typeof this.block.title === 'string' ? this.block.title : null,
      blockClasses: this.block?.blockSettings?.classes ? this.block.blockSettings.classes : {},
      hasExpanded: [],
      classes
    }
  },
  // mounted () {
  //   return {
  //     activeIndex: 0,
  //     groupStyle: ![undefined, null].includes(this.block) && typeof this.block.groupStyle === 'string' ? this.block.groupStyle : 'tabs',
  //     sections: ![undefined, null].includes(this.block) && Array.isArray(this.block.sections) && this.block.sections.length > 0 ? this.block.sections : null,
  //     title: ![undefined, null].includes(this.block) && typeof this.block.title === 'string' ? this.block.title : null
  //   }
  // },
  methods: {
    handleize,
    toggleSections (indx) {
      setTimeout(() => {
        window.scroll({ left: 0, top: this.$refs.container.offsetTop - 50, behavior: 'smooth' })
      }, 250);
      if (this.activeIndex === indx) {
        if (this.block.groupStyle === 'accordion') this.active = null;
        return
      }
      this.active = indx
      if (!this.hasExpanded.includes(this.active)) {
        this.hasExpanded.push(this.active)
      }
    },
    scrollHandler (e, eventName) {
      return { e, eventName }
    }
  }
}
</script>

<style lang="scss">
.panel-heading {
  @apply text-center w-full rounded p-3 bg-gray-800 bg-opacity-95 hover:bg-opacity-100 text-gray-300 relative z-10 transform transition scale-98 hover:scale-100 ease-quick-in flex items-center justify-between;
  .gicon-angle-down {
    @apply transition ease-quick-in duration-200 delay-100 transform rotate-0;
  }
  .ps__rail-x {
    opacity: 0;
    .ps__thumb-x {
      opacity: 0;
    }
  }
}
.panels {
  @apply p-2 sm:p-3;
}
.panel-content {
  @apply rounded mb-3 relative p-4 bg-gray-800 shadow-lg;
}
.tab {
  @apply whitespace-nowrap;
}
.expanded {
  .tabs,
  .panel-heading {
    .gicon-angle-down {
      @apply rotate-180;
    }
  }
  .panel-heading {
    @apply scale-100;
    &:not(&:hover) {
      @apply rounded-b-none;
    }
  }
  .panel-content {
    @apply rounded-t-none;
  }
}
</style>