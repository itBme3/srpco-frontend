<template>
  <div v-if="!!data">
    <CardSupplier
      v-for="entry in data"
      :key="'supplier-' + entry.id"
      :supplier="entry"
      :cardStyle="'small'"
    />
  </div>
</template>

<script>
import { CollectionType } from '~/models/entry.model'
import { getCollection } from '~/utils/graphql/requests/collection'
export default {
  async asyncData () {
    const data = await getCollection(CollectionType.SUPPLIERS, { sort: ['order:ASC'] });
    return { data }
  }
}
</script>