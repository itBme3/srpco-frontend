<template>
  <div
    v-if="links && links.length > 0"
    class="more-links"
  >
      <div class="link-tags flex flex-wrap">
        <template v-for="(link, i) in links">
          <Tag
            v-if="(showCount < 0 || i < showCount) && ![null, undefined].includes(link)"
            :key="link.slug"
            class="mb-1 mr-1 text-base"
            :link="'/' + link.type + 's/' + link.slug"
          >
            {{ link.title }}
          </Tag>
        </template>
      </div>

    <div 
      v-if="showCount < links.length && showCount >= 0"
      class="flex items-center content-start"
      >
      <gButton
        class="flex items-center content-center mr-2 hover:rounded hover:border-b-0 hover:bg-gray-800 text-gray-400 hover:text-gray-300 w-auto"
        @click="showCount = -1"
      >
        <Icon class="angle-down my-auto mr-auto ml-0" icon-name="angleDown" />
        <span class="my-auto ml-2">MORE</span>
      </gButton>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    moreLinks: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showCount: 3,
      links: Array.isArray(this.moreLinks) ? this.moreLinks : []
    }
  }
})
</script>
