<template>
	<div 
		v-if="block && materialGroups.length"
		class="datasheets-by-material flex flex-col gap-4">
		<template v-for="material in materialGroups">
			<section 
				v-if="material.groups && material.groups.length"
				:key="material.slug"
				class="material-datasheets p-6 rounded bg-gray-900 shadow">
				<div class="material-details gap-8 grid grid-cols-12">
					<div class="col-span-full sm:col-span-8">
						<h2 class="text-2xl font-black sm:text-3xl text-gray-200 mb-4">{{material.title}}</h2>
						<p class="font-light">{{material.description}}</p>
					</div>
					<gButton 
						class="col-span-full sm:col-span-4 text-blue-400 border hover:bg-gray-800 border-gray-800 py-4 m-0 sm:m-auto w-full max-w-[15rem] flex items-center content-between"
						:class="{
							hidden: show.includes(material.slug)
						}"
						style="max-width: 220px"
						@click="() => toggleMaterial(material.slug)">
						Datasheets <Icon class="fill-blue-300 ml-3" :icon-name="show.includes(material.slug) ? 'angleUp' : 'angleDown'" /></gButton>
				</div>	
				<div
					 v-if="show.includes(material.slug)"
					 class="datasheets-groups grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8">
					<div
						 v-for="group in material.groups"
						 :key="group.title"
						 class="datasheets-group col-span-1">
						<h4 class="py-2 text-gray-300">{{group.title}}</h4>
						<div
							class="datasheets flex flex-col gap-1"
							style="--block-color: rgba(96, 165, 250, var(--tw-text-opacity))">
							<template v-for="entry in group.datasheets">
								<Card
									v-if="![null, undefined].includes(entry)"
									:key="entry.id"
									:title="entry.title"
									:media="entry.file"
									card-style="mediaLeft"
									:link="![null, undefined].includes(entry) && entry.type === 'datasheet' 
										? null 
										: `${collectionType}/${entry.slug}`"
									media-ratio="8.5:11"
									media-classes="shadow-2xl rounded my-2 ml-2 mr-4"
									:classes="{title: 'text-base font-normal'}"
									class="col-span-12"
									:class="{ [entry.type]: true }"
								/>
							</template>
						</div>
					</div>
				</div>
			</section>
		</template>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
	props: {
		block: {
			type: Object,
			default: () => null
		},
		color: {
			type: String,
			default: 'blue-400'
		}
	},
	data () {
		return {
			materials: [],
			show: []
		}
	},
	async fetch () {
		this.materials = await this.$content('materials')	
			.only(['title', 'slug', 'description', 'datasheets'])
			.sortBy('order', 'asc')	
			.fetch();
	},
	computed: {
		materialGroups () {
			return this.materials.reduce((acc, material) => {
				if (!material?.datasheets?.length) {
					return acc
				}
				return [...acc, {
					...material,
					groups: material.datasheets
						.filter(datasheet => datasheet?.subCategory?.length)
						.reduce((groups, datasheet) => {
							const group = groups.filter(_group => _group.title === datasheet.subCategory)[0] || { title: datasheet.subCategory, datasheets: [] };
							group.datasheets.push(datasheet);
							return [...groups.filter(_group => _group.title !== datasheet.subCategory), group]
						}, []).sort((a, b) => {
							if(a?.datasheets?.length === b?.datasheets?.length) {
								return 0;
							}
							if (a?.datasheets?.length > b?.datasheets?.length) {
								return -1
							} else {
								return 1
							}
						})
				}];
			}, []);
		}
	},
	methods: {
		toggleMaterial (materialSlug) {
			if (this.show.includes(materialSlug)) {
				this.show = this.show.filter(slug => slug !== materialSlug)
			} else {
				this.show.push(materialSlug);
			}
		}
	}
})
</script>

<style scoped>
</style>