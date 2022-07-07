<template>
  <div
    v-if="![null, undefined].includes(pageData)"
    class="single-entry service mb-10"
  >
    <Heading
      v-if="$route.path.split('/').length > 2"
      :title="pageData.title"
      :description="pageData.description"
      heading-type="page"
      :class="{
        [pageClasses.heading]: !!pageClasses && !!pageClasses.heading && !!pageClasses.heading.length
      }"
    />

    <MediaYoutube
      v-if="![null, undefined].includes(pageData) && typeof pageData.youtube === 'string' && pageData.youtube !== null"
      :src="pageData.youtube"
      :autoplay="true"
      :loop="true"
      :mute="true"
    />
		
    <div
      v-if="![null, undefined].includes(pageData) && typeof pageData.content === 'string' && pageData.content.length"
      class="page-content"
      v-html="pageData.content"
    />

    <h2 class="mt-8 sm:mt-12 md:mt-14">Services:</h2>
    <BlockCollection 
      collection-type="services"
      sort="publishedAt:ASC"
      card-style="mediaLeft"
      loading-more="infiniteScroll"
      :limit="6"
      :update-url="false"
      :description="false"
      :show-excerpt="true"
      class="w-full"
      :classes="{ card: 'col-span-full' }"
      :filters="{
        slug: {
          $ne: pageData.slug
        }
      }"
    />

  </div>
</template>

<script>
import Vue from 'vue'
import { getPageClasses } from '~/utils/get-classes'

export default Vue.extend({
	props: {
		pageData: {
			type: Object,
			default: () => null
		}
	},
  // async asyncData ({ route, params, redirect, store }) {
  //   const slug = params.slug
  //   const page = await store.dispatch('getEntry', { route })
  //   return { slug, page, redirect }
  // },
  // head () {
  //   return seoHead(this.pageData)
  // },
  computed: {
    pageClasses () {
      return getPageClasses(this.pageData)
    }
  },
  // watch: {
  //   $route: {
  //     immediate: false,
  //     async handler () {
  //       this.pageData = await store.dispatch('getEntry', { route: this.$route })
  //       return this.pageData;
  //     }
  //   }
  // }
})
</script>

<style lang="scss">
.single-entry.service {
  @apply max-w-4xl mx-auto;
}
.collection {
  &.services {
    .single-entry {
      + .heading {
        max-width: 780px !important;
        margin-right: auto;
        margin-left: auto;
        + .blocks {
          max-width: 780px !important;
          margin-right: auto;
          margin-left: auto;
        }
      }
    }
  }
}
</style>