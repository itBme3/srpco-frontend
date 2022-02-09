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
        :class="{ 'hidden': showingCollection !== collectionType }"
        :filters="collectionFilters[collectionType]"
        :collection-type="collectionType"
        :infinite-scroll="true"
        :search-bar="true"
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
  async fetch ({ route }) {
    const showingCollection = supplierCollections.includes(route?.hash) ? route.hash : null
    const haveFetched = showingCollection !== null ? [] : [showingCollection]
    return {
      haveFetched,
      supplierCollections,
      showingCollection
    }
  },
  data () {
    return {
      activeCollections: [],
      haveFetched: [],
      showingCollection: null,
      collectionFilters: {
        gaskets: { suppliers: { slug: { eq: this.entry.slug } } },
        datasheets: { supplier: { slug: { eq: this.entry.slug } } },
      }
    }
  },
  mounted () {
    this.scrollToCollections();
    this.getEligibleCollections()
      .then(console.log)
      .catch(console.error)
  },
  // watch: {
  //   '$route.fullPath': {
  //     immediate: true,
  //     async handler () {
  //       this.page = await getSingleEntry(this.$route.path, this.redirect)
  //       return this.page;
  //     }
  //   }
  // },
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
    getEligibleCollections () {
      return this.$graphql.default.request(gql`
        query {
          gaskets(filters: { suppliers: { slug: { eq: "${this.entry.slug}" } } }, pagination: { limit: 1 }) {
            data { id }
          }
          datasheets(filters: { supplier: { slug: { eq: "${this.entry.slug}" } } }, pagination: { limit: 1 }) {
            data { id }
          }
        }
      `).then(res => {
        const activeCollections = []
        if (res.gaskets?.data?.length > 0) activeCollections.push('gaskets')
        if (res.datasheets?.data?.length > 0) activeCollections.push('datasheets')
        this.activeCollections = activeCollections
        return this.activeCollections;
      }).catch(err => console.error(err))
    },
    scrollToCollections: _.debounce(function () {
      if (window === undefined || !this.$refs?.collections?.offsetHeight || this.showingCollection === null) return;
      console.log({ el: this.$refs.collections, top: this.$refs.collections.offsetHeight - 50, behavior: 'smooth' })
      window.scrollTo({ top: this.$refs.collections.offsetTop - 50, behavior: 'smooth' })
    }, 750)
  }
}
</script>
