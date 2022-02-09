<template>
  <div
    v-if="links && links.length > 0"
    class="more-links"
  >
    <div
      class="cursor-pointer"
      :class="{ 'toggle-more': true, 'show': showMore }"
      @click="toggleMore"
    >
      <div class="link-tags flex flex-wrap">
        <template v-for="link in links">
          <Tag
            v-if="![null, undefined].includes(link)"
            :key="link.slug"
            class="mb-1 mr-1"
            :link="'/' + link.type + 's/' + link.slug"
          >
            {{ link.title }}
          </Tag>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    moreLinks: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showMore: false,
      links: Array.isArray(this.moreLinks) ? this.moreLinks : []
    }
  },
  methods: {
    toggleMore () {
      this.showMore = !this.showMore
    }
  }
}
</script>
