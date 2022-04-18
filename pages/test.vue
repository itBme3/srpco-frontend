<template>
  <div>
    <gTextarea
      :value="filtersString"
      @change="updateFilters"
    />
    <gInput v-model="sort" />
    <code>{{ JSON.stringify(filters, null, 4) }}</code>
    <!-- <ul v-if="collection">
      <li
        v-for="c in collection"
        :key="c"
      >{{ c }}</li>
    </ul> -->
    <BlockCollection
      v-if="!reload"
      :class="{ 
          [collectionType]: true,
        }"
      :filters="filters"
      :sort="[sort]"
      :collection-type="'gaskets'"
      :infinite-scroll="true"
      :search-bar="true"
      :update-url="false"
      card-style="mediaLeft"
      :classes="{
          card: 'col-span-12 sm:col-span-6'
        }"
    />
  </div>
</template>

<script>
// import { getCollection } from '~/utils/graphql/requests/collection'
export default {
  // async asyncData () {
  //   const data = await getCollection(CollectionType.SUPPLIERS, { sort: ['order:ASC'] });
  //   return { data }
  // }
  data () {
    const filters = {
      suppliers: {
        slug: {
          containsi: '3m'
        }
      }
    }
    return {
      collectionType: 'gaskets',
      filters,
      collection: null,
      filtersString: JSON.stringify(filters, null, 4),
      sort: 'title:DESC',
      reload: false
    }
  },
  watch: {
    filtersString () {
      try {
        const filters = JSON.parse(this.filtersString);
        this.filters = filters
        this.reload = true;
        setTimeout(() => {
          this.reload = false
        }, 500)
        // getCollection(this.collectionType, { filters: this.filters, sort: this.sort, pagination: { limit: 6 } })
        //   .then(res => {
        //     this.collection = res.map(c => c.slug)
        //   })
        //   .catch(console.log)
      } catch (e) {
        return e
      }
    }
  },
  methods: {
    updateFilters (e) {
      try {
        this.filtersString = e.target.value
      } catch (e) {
        return e
      }
    }
  }
}
</script>