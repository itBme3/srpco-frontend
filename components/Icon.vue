<template>
  <svg
		class="icon"
		version="1.1" 
		xmlns="http://www.w3.org/2000/svg" 
		width="20" 
		height="20" 
		viewBox="0 0 20 20"
    fill="none"
		v-html="icons[iconName]">
	</svg>
</template>

<script>
import Vue from 'vue';
import SvgIcons from './SvgIcons';
export default Vue.extend({
  props: {
    iconName: {
      type: String,
      default: 'plus'
    }
  },
  data () {
    return {
      icons: SvgIcons
    }
  }
})
</script>

<style lang="scss">
  .icon {
    @apply fill-gray-300 inline-block h-4 w-auto;
    fill-opacity: 0;
    path {
      fill-opacity: 1;
      fill: inherit;
    }
  }
</style>
