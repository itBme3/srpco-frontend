<template>
	 <Block
	 	v-if="show"
      class="mx-auto max-w-md rounded-md bg-gray-50"
      :block="{ formSchema: formSchema, __component: 'block.form' }"
			:lazy="true"
    />
</template>

<script lang="ts">
	import Vue from 'vue'

export default Vue.extend({
	data: () => ({
		formSchema: {
			fields: [
				{
					type: 'input',
					inputType: 'text',
					label: 'Name',
					model: 'name',
					placeholder: '"Name...',
					required: true
				},
				{
					type: 'input',
					inputType: 'email',
					label: 'Email',
					model: 'email',
					placeholder: 'Email...',
					required: true
				},
				{
					type: 'textArea',
					label: 'Message',
					model: 'message',
					placeholder: 'Message...',
					required: true
				},
			]
		}
	}),
	computed: {
		show() {
			return !['contact'].includes(this.$route.path.split('/')[1]?.split('#')[0]?.split('?')[0])
		}
	}
});
</script>

<style scoped>

</style>