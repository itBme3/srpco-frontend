<template>
  <div>
    <!-- <BlockCarousel>
      <div class="carousel-cell w-full text-center h-16">1</div>
      <div class="carousel-cell w-full text-center h-16">2</div>
      <div class="carousel-cell w-full text-center h-16">3</div>
    </BlockCarousel> -->
    <!-- <BlockCollection
      :collection-type="'gaskets'"
      :searchBar="true"
      :update-url="true"
    /> -->
    <!-- <CardSupplier
      v-for="entry in data"
      :key="'supplier-' + entry.id"
      :supplier="entry"
      :cardStyle="'small'"
    /> -->
  </div>
</template>

<script>
import { CollectionType } from '~/models/entry.model'
import { getCollection } from '~/utils/graphql/requests/collection'
export default {
  // async asyncData () {
  //   const data = await getCollection(CollectionType.SUPPLIERS, { sort: ['order:ASC'] });
  //   return { data }
  // }
  // data () {

  // }
}
</script>