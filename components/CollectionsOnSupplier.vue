<template>
  <div
    v-if="activeCollections.length"
    ref="collections"
    class="collections-on-supplier w-full"
  >
    <div class="toggle-collections flex w-full">
      <gButton
        v-for="collectionType in activeCollections"
        :key="'supplier-collection-toggle-' + collectionType"
        :class="{
          'text-center w-auto space-x-1': true,
          'active': showingCollection === collectionType
        }"
        @click="setHash(showingCollection === collectionType ? null : collectionType)"
      >
        {{ collectionType }}
        <Icon
          :icon-name="showingCollection === collectionType ? 'close' : 'angle-down'"
          class="transform scale-80 ml-1"
        />
      </gButton>
    </div>
    <template v-for="collectionType in activeCollections">
      <BlockCollection
        v-if="haveFetched.includes(collectionType)"
        :key="'supplier-collection-' + collectionType"
        :class="{ 
          [collectionType]: true,
          'hidden': showingCollection !== collectionType }"
        :filters="collectionFilters[collectionType]"
        :collection-type="collectionType"
        :infinite-scroll="true"
        :search-bar="true"
        :update-url="false"
        sort="title:desc"
        card-style="mediaLeft"
        :classes="{
          card: 'col-span-12 sm:col-span-6'
        }"
      />
    </template>
  </div>

</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
const supplierCollections = ['gaskets', 'datasheets']

export default Vue.extend({
  props: {
    entry: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    const entrySlug = `${this.entry.slug}`
    return {
      activeCollections: [],
      haveFetched: [],
      showingCollection: null,
      supplierCollections,
      collectionFilters: {
        gaskets: { 'suppliers.slug': { $contains: entrySlug } },
        datasheets: { 'supplier.slug': { $eq: entrySlug } },
      }
    }
  },
  fetch ({ route }) {
    const showingCollection = supplierCollections.includes(route?.hash) ? route.hash : null
    const haveFetched = showingCollection !== null ? [] : [showingCollection]
    return {
      haveFetched,
      showingCollection
    }
  },
  watch: {
    '$route.hash': {
      immediate: true,
      handler (val) {
        const collectionType = val.replace('#', '')
        if (supplierCollections.includes(collectionType)) {
          this.showingCollection = collectionType
          if (!this.haveFetched.includes(this.showingCollection)) {
            this.haveFetched.push(this.showingCollection)
          }
        } else {
          this.showingCollection = null;
        }
      }
    }
  },
  mounted () {
    this.scrollToCollections();
    return this.getEligibleCollections()
      .catch(console.error)
  },
  methods: {
    setHash (collectionType = null) {
      return this.$router.history.push({
        path: `${this.$route.path}${collectionType === null ? '' : `#${collectionType}`}`,
      })

    },
    async getEligibleCollections () {
      this.activeCollections = await Promise.all(['gaskets', 'datasheets'].map(collectionType => {
        console.log(collectionType, this.collectionFilters[collectionType])
        return this.$content(collectionType)
          .where(this.collectionFilters[collectionType])
          .only(['slug'])
          .limit(1)
          .fetch()
          .then(res => {
            console.log(res)
            return res.length ? collectionType : null
          })
      })).then(res => res.filter(c => !!c))
      return this.activeCollections;
    },
    scrollToCollections: _.debounce(function () {
      if (window === undefined || !this.$refs?.collections?.offsetHeight || this.showingCollection === null) return;
      window.scrollTo({ top: this.$refs.collections.offsetTop - 50, behavior: 'smooth' })
    }, 750)
  }
})
</script>
