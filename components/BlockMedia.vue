<template>
	<Link
		v-if="media && link"
		:to="link"
		:open-new-tab="!!block.linkNewTab"
		:class="{
			[classes.link]: !!classes.link
		}"
	>
		<Media 
			:media="media"
			:youtube="youtube"
			:overlay-classes="classes.overlay"
			:overlay="!!classes.overlay"
			:video-params="videoParams"
			:class="{
				[classes.media]: !!classes.link
			}"
		/>
	</Link>
	<Media
		v-else-if="media || youtube"
		:media="media"
		:youtube="youtube"
		:overlay-classes="props.overlayClasses"
		:overlay="props.overlay"
		:video-params="props.videoParams"
		:ratio="props.ratio"
		:class="{
			[classes.media]: !!classes.link
		}"
	/>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
	props: {
    block: {
      type: Object,
      default: null
    }
	},
	
	computed: {
		media () {
			return this.block?.media || null
		},
		youtube () {
			return this.block?.youtube?.length ? this.block.youtube : null
		},
		classes () {
			const { link, media } = this.block?.props?.classes || {};
			return {media, link}
		},
		props () {
			const { ratio, videoParams, classes = {}, openNewTab = false } = this.block?.props || {};
			return {ratio, videoParams, overlayClasses: classes.overlay, overlay: !!classes?.overlay, openNewTab}
		},
		link() {
			return this.block?.link
		}
	}
})
</script>