<template>
  <div
    v-if="Array.isArray(sections) && sections.length > 0"
    class="group-container rounded bg-black bg-opacity-5 shadow-lg"
  >

    <div
      v-if="groupStyle === 'tabs'"
      class="tabs flex items-center space-x-2 relative z-2"
    >
      <gButton
        v-for="(section, i) in sections"
        :key="i + '-' + handleize(section.title)"
        class="tab my-auto"
        :class="{ 'active bg-red-500 text-white': activeIndex === i }"
        @click="toggleSections(i)"
      >
        {{ section.title }}
      </gButton>
    </div>

    <div class="panels p-3">
      <div
        v-for="(section, i) in sections"
        :class="{ 'expanded': activeIndex === i }"
        :key="i + '-' + handleize(section.title) + '-2'"
        class="panel p-1"
      >
        <gButton
          classes="panel-heading text-center w-full rounded p-3 bg-gray-800 transform transition scale-100 hover:scale-103 hover:bg-opacity-100 ease-quick-in text-gray-300 flex items-center justify-between"
          :class="{ 
            'bg-opacity-100': activeIndex === i,
            'bg-opacity-50': activeIndex !== i
          }"
          v-if="groupStyle === 'accordion' && ![undefined, null].includes(section) && typeof section.title === 'string'"
          @click="toggleSections(i)"
        >
          <h3>{{ section.title }}</h3> <i class="gicon-angle-down ml-auto mr-0" />
        </gButton>
        <div
          class="panel-content p-4 bg-gray-800 shadow-lg"
          :class="{
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
    }
  },
  data () {
    console.log({ block: this.block })
    return {
      activeIndex: 0,
      groupStyle: ![undefined, null].includes(this.block) && typeof this.block.groupStyle === 'string' ? this.block.groupStyle : 'tabs',
      sections: ![undefined, null].includes(this.block) && Array.isArray(this.block.sections) && this.block.sections.length > 0 ? this.block.sections : null,
      title: ![undefined, null].includes(this.block) && typeof this.block.title === 'string' ? this.block.title : null
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
      if (this.activeIndex === indx) { return }
      this.activeIndex = indx
    }
  }
}
</script>

<style lang="scss">
.panel-heading {
  .gicon-angle-down {
    @apply transition ease-quick-in duration-200 delay-100 transform rotate-0;
  }
}
.pabels {
  @apply p-2;
}
.panel-content {
  @apply rounded mt-1 mb-3 relative;
}
.expanded {
  .tabs,
  .panel-heading {
    @apply cursor-default;
    .gicon-angle-down {
      @apply rotate-180;
    }
  }
}
</style>