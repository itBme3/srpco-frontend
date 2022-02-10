<template>
  <div
    class="entry-sidebar"
    v-if="!!entry"
  >
    <div
      v-if="Array.isArray(suppliers) && suppliers.length > 0"
      class="suppliers"
    >
      <p class="font-bold mb-2">Suppliers:</p>
      <template v-for="supplier in suppliers">
        <CardSupplier
          :key="'supplier-' + supplier.slug + '-on-single-entry'"
          :supplier="supplier"
          cardStyle="small"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { EntryType } from '~/models/entry.model'
export default {
  props: {
    entry: {
      type: Object,
      default: () => null
    }
  },
  // async asyncData () {

  // },
  computed: {
    entryType () {
      return !!this.entry?.type ? this.entry.type : null
    },
    collectionType () {
      return !!this.entry?.type ? this.entry.type : null
    },
    suppliers () {
      return [EntryType.GASKET, EntryType.DATASHEET].includes(this.entryType) && !!this.entry?.suppliers
        ? this.entry.suppliers : !!this.entry?.supplier
          ? [this.entry.supplier] : null
    }
  }
}
</script>

<style lang="scss">
.entry-sidebar {
  margin-bottom: auto !important;
  height: auto;
}
</style>