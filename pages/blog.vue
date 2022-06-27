<template>
  <div class="collection blog">
		<Heading
			v-if="![null, undefined].includes(page)"
			:title="page.title"
			heading-type="collection"
			:description="page.description"
			:media="page.media"
		/>
		<BlockCollection
			collection-type="resources"
			:search-bar="true"
			card-style="mediaLeft"
			:limit="10"
			:classes="{
				card: 'col-span-12 md:col-span-6 h-full'
			}"
			:show-excerpt="true"
			loading-more="infiniteScroll"
		/>
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  scrollToTop: true,
  // async asyncData ({ $content }) {
  //   const page = await $content('homepage').fetch()
  //   return { page }
  // },
	data() {
		return {
			page: {
				title: 'Blog'
			}
		}
	},
  // head () {
  //   return seoHead(this.page)
  // },
  // mounted() {
  //   this.$store.dispatch('getEntryUpdates', { path: '/' })
  //     .then(res => {
  //       this.page = {...this.page, ...res}
  //     }).catch(console.error);
  // }

})
</script>
