<template>
  <div
    v-if="Array.isArray(links) && links.length > 1"
    class="breadcrumbs truncate text-gray-400"
  >
    <template v-for="(crumb, index) in links">
      <small
        v-if="index < links.length - 1"
        :key="`${crumb.href}-if`"
        class="text-green-400 hover:text-green-500"
      >
        <NuxtLink :to="['applications', 'materials'].includes(crumb.href) ? `/gaskets/#${crumb.href}` : crumb.href">{{ crumb.label }}</NuxtLink>
        <span class="text-gray-600 mr-1">/</span>
      </small>
      <small
        v-else
        :key="`${crumb.href}-else`"
      >{{ crumb.label }}</small>
    </template>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    links: {
      /**
       * @attribute: href {string}
       * @attribute: label {string}
      */
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      crumbs: []
    }
  },
  fetch () {
    this.setCrumbs()
  },
  watch: {
    '$route.fullPath' () {
      this.setCrumbs()
    }
  },
  methods: {
    setCrumbs () {
      if (this.links?.length) {
        return;
      }
      const path = this.$route.fullPath.split('#')[0];
      if (path === null || path === undefined) {
        return
      }
      const crumbs = path.split('/').slice(1, path.split('/').length)
      let i = 0
      this.crumbs = crumbs.reduce((acc, slug) => {
        acc.push({
          href: i === 0 ? `/${slug}` : `${crumbs[i - 1].href}/${slug}`,
          text: slug
        })
        i++
        return acc
      }, [])
    }
  }
})
</script>

<style lang="scss">
.breadcrumbs {
  > * {
    @apply my-auto;
  }
  small {
    @apply tracking-wide;
  }
}
</style>
