<template>
  <div
    v-if="Array.isArray(breadcrumbs) && breadcrumbs.length > 1"
    class="breadcrumbs truncate text-gray-400"
  >
    <template v-for="(crumb, index) in breadcrumbs">
      <small
        v-if="index < breadcrumbs.length - 1"
        :key="crumb.link"
        class="text-green-400 hover:text-green-500"
      >
        <NuxtLink :to="['applications', 'materials'].includes(crumb.link) ? `/gaskets/#${crumb.link}` : crumb.link">{{ crumb.text }}</NuxtLink>
        <span class="text-gray-600 mr-1">/</span>
      </small>
      <small
        v-else
        :key="crumb.link"
      >{{ crumb.text }}</small>
    </template>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      breadcrumbs: null
    }
  },
  fetch () {
    // this.fullPath = this.$route.fullPath
    this.setCrumbs()
  },
  watch: {
    '$route.fullPath' () {
      this.setCrumbs()
    }
  },
  methods: {
    setCrumbs () {
      const path = this.$route.fullPath.split('#')[0]
      if (path === null || path === undefined) {
        return
      }
      const crumbs = path.split('/').slice(1, path.split('/').length)
      let i = 0
      this.breadcrumbs = crumbs.reduce((acc, slug) => {
        acc.push({
          link: i === 0 ? `/${slug}` : `${crumbs[i - 1].link}/${slug}`,
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
