<template>
  <div
    v-if="!!activeCollections && !!activeCollections.length"
    class="collections-on-supplier w-full"
    ref="collections"
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
          :iconName="showingCollection === collectionType ? 'close' : 'angle-down'"
          class="transform scale-80 ml-1"
        />
      </gButton>
    </div>
    <template v-for="collectionType in activeCollections">
      <BlockCollection
        :key="'supplier-collection-' + collectionType"
        v-if="haveFetched.includes(collectionType)"
        :class="{ 
          [collectionType]: true,
          'hidden': showingCollection !== collectionType }"
        :filters="collectionFilters[collectionType]"
        :collection-type="collectionType"
        :infinite-scroll="true"
        :search-bar="true"
        card-style="mediaLeft"
        :classes="{
          card: 'col-span-12 sm:col-span-6'
        }"
      />
    </template>
  </div>

</template>

<script>
import { gql } from 'graphql-request'
import _ from 'lodash'
const supplierCollections = ['gaskets', 'datasheets']

export default {
  props: {
    entry: {
      type: Object,
      default: () => { return {} }
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
  data () {
    return {
      activeCollections: [],
      haveFetched: [],
      showingCollection: null,
      supplierCollections,
      collectionFilters: {
        gaskets: { suppliers: { slug: { eq: this.entry.slug } } },
        datasheets: { supplier: { slug: { eq: this.entry.slug } } },
      }
    }
  },
  mounted () {
    console.log(this.collectionFilters)
    this.scrollToCollections();
    return this.getEligibleCollections()
      .catch(console.error)
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
  methods: {
    setHash (collectionType = null) {
      return this.$router.history.push({
        path: `${this.$route.path}${collectionType === null ? '' : `#${collectionType}`}`,
      })

    },
    async getEligibleCollections () {
      const res = await this.$graphql.default.request(gql`
        query {
          gaskets(filters: { suppliers: { slug: { eq: "${this.entry.slug}" } } }, pagination: { limit: 1 }) {
            data { id }
          }
          datasheets(filters: { supplier: { slug: { eq: "${this.entry.slug}" } } }, pagination: { limit: 1 }) {
            data { id }
          }
        }
      `).catch(err => console.error(err));
      if (res.gaskets?.data?.length > 0) this.activeCollections.push('gaskets')
      if (res.datasheets?.data?.length > 0) this.activeCollections.push('datasheets')
      return this.activeCollections;
    },
    scrollToCollections: _.debounce(function () {
      if (window === undefined || !this.$refs?.collections?.offsetHeight || this.showingCollection === null) return;
      window.scrollTo({ top: this.$refs.collections.offsetTop - 50, behavior: 'smooth' })
    }, 750)
  }
}
</script>
