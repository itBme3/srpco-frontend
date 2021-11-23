<template>
  <div
    class="breadcrumbs flex items-center content-start"
    :v-if="Array.isArray(breadcrumbs) && breadcrumbs.length > 1"
  >
    <template v-for="(crumb, index) in breadcrumbs">
      <small
        v-if="index < breadcrumbs.length - 1"
        :key="crumb.link"
        class="text-green-400 hover:text-green-500">
        <NuxtLink
          :to="crumb.link"
        >{{ crumb.text }}</NuxtLink>
        <span class="text-gray-600 mr-1">/</span>
      </small>
      <small
        v-else
        :key="crumb.link"
        class="text-gray-400"
      >{{ crumb.text }}</small>
    </template>
  </div>
</template>

<script>
export default {
  fetch () {
    this.fullPath = this.$route.fullPath
  },
  data() {
    return {
      breadcrumbs: null,
      fullPath: null
    }
  },
  watch: {
    fullPath: {
      immediate: true,
      handler (fullPath) {
        if (this.fullPath === null || this.fullPath === undefined) {
          return
        }
        const crumbs = this.fullPath.split('/').slice(1, this.fullPath.split('/').length)
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
  }
}
</script>

<style lang="scss">
  .breadcrumbs {
    > * {
      @apply my-auto
    }
    small {
      @apply tracking-wide
    }
  }
</style>
