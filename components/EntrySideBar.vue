<template>
  <div
    v-if="!!entry"
    class="entry-sidebar"
  >
    <div class="sidebar-section inquire">
      <h3>Inquire About {{ entry.title }}</h3>
      <Link :to="`/contact?msg=${entry.title}`" :is-button="true">
        Ask Us
      </Link>
    </div>
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
  @apply mb-6;
  &.inquire {
    @apply bg-gray-800 bg-opacity-50 p-6 rounded-lg;
    button {
      @apply w-auto bg-blue-500 hover:bg-blue-400 text-blue-900 ml-0 mt-3 rounded-full;
      min-width: 50%;
    }
  }
}
</style>