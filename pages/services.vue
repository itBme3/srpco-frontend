
<template>
  <div
    class="collection services"
    :class="{
      [pageClasses.container]: !!pageClasses.container
    }"
  >

    <NuxtChild :key="$route.fullPath" />

    <Heading
      v-if="![undefined, null].includes(page)"
      :title="![undefined, null].includes(page) ? `${page.title}:` : null"
      :description="![undefined, null].includes(page) ? page.description : null"
      :media="![undefined, null].includes(page) ? page.media : null"
      :breadcrumbs="false"
      heading-type="collection"
    />
    <div
      v-if="![undefined, null].includes(page) && typeof page.blocks !== undefined && page.blocks.length > 0"
      class="blocks"
    >
      <Block
        v-for="block in page.blocks"
        :key="block.__component + '-' + block.id"
        :block="block"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { seoHead } from '~/utils/seo'
import { getPageClasses } from '~/utils/get-classes'

/* eslint-disable no-extra-boolean-cast */
export default Vue.extend({
  scrollToTop: true,
  async asyncData ({ $content }) {
    const page = await $content('services-collection').fetch()
    return { page }
  },
  data () {
    return {
      active: null
    }
  },
  head () {
    return seoHead(this.page)
  },
  
  computed: {
    pageClasses () {
      return getPageClasses(this.page)
    }
  },
  mounted () {
    this.$store.dispatch('getEntryUpdates', { path: 'services-collection' })
      .then(res => {
        try {
          this.page = {
            ...this.page,
            ...res
          }
        } catch { }
      })
  },
  
})
</script>

<style lang="scss">
.card-link {
  &.nuxt-link-exact-active {
    @apply hidden;
  }
}
</style>
