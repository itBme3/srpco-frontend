<template>
  <div
    v-if="!!entry"
    class="entry-sidebar"
  >
    <div
      v-if="Array.isArray(suppliers) && suppliers.length > 0"
      class="sidebar-section suppliers"
    >
      <h6 class="font-bold mb-2">Suppliers:</h6>
        <CardSupplier
          v-for="supplier in suppliers"
          :key="'supplier-' + supplier.slug + '-on-single-entry'"
          :supplier="supplier"
          card-style="small"
        />
    </div>
    <template 
      v-for="collection in ['materials', 'applications', 'gaskets']"
    >

    <div 
      v-if="!hide.includes(collection)"
      :key="collection"
      class="sidebar-section p-4 rounded-md shadow-lg border border-gray-900 bg-gray-900 bg-opacity-40">
      <h6 class="font-bold mb-2 capitalize">{{ collection }}:</h6>
      <EntriesOnEntry 
        ref="entriesOnEntry"
        :collection-type="collection"
        :entry="entry"
        @noEntries="() => hide.push(collection)"
      />
    </div>
  </template>
  </div>
</template>

<script>
import Vue from 'vue'
import { EntryType } from '~/models/entry.model'
export default Vue.extend({
  props: {
    entry: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return { 
      hide: []
     }
  },
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
})
</script>

<style lang="scss">
.entry-sidebar {
  margin-bottom: auto !important;
  height: auto;
}
.sidebar-section {
  @apply mb-6
}
</style>