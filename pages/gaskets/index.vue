
<template>
  <div>
      <!-- <CollectionPage
        v-if="!!entries"
        :collection-type="'gaskets'"
        :entries="entries"
        :card-style="'overlay'"
        :classes="{
          container: ['custom', 'container'],
          card: ['custom', 'card'],
          grid: ['custom', 'grid'],
          searchBar: ['custom', 'searchBar']
        }"
        @search="updateSearch"
      /> -->
      <BlockCollection
        :collectionType="'gaskets'"
        :searchBar="false"
        :sort="'order'"
        :limit="10"
      />
  </div>
</template>

<script lang="js">
import {
  mapMutations,
  mapActions
} from 'vuex'
import { getMetaTags } from '~/utils/seo'
/* eslint-disable no-extra-boolean-cast */
export default {
  async asyncData ({ store }) {
    const { dispatch } = store
    await dispatch('gaskets/get')
    const entries = store.state.gaskets.entries
    const canLoadMore = store.state.gaskets.canLoadMore
    return { entries, canLoadMore }
  },
  data () {
    return {
      entries: !!this?.$store?.state?.gaskets.entries ? !!this?.$store?.state?.gaskets.entries : null,
      canLoadMore: !!this?.$store?.state?.gaskets.canLoadMore ? !!this?.$store?.state?.gaskets.canLoadMore : null
    }
  },
  methods: {
    ...mapActions({
      get: 'gaskets/get',
      more: 'gaskets/more'
    }),
    async getEntries () {
      await this.get()
      this.entries = this.$store.state.gaskets.entries
      this.canLoadMore = this.$store.state.gaskets.canLoadMore
    },
    async getMore () {
      await this.more()
      this.entries = this.$store.state.gaskets.entries
      this.canLoadMore = this.$store.state.gaskets.canLoadMore
    },
    ...mapMutations({
      setParams: 'gaskets/setParams',
      setSearch: 'gaskets/setSearch'
    }),
    visblilityHandler (e) {
      if (e.percentInView > 0.9) {
        this.canLoadMore = false
        this.getMore()
          .catch(console.error)
      }
    },
    async updateSearch (q) {
      const { path, hash, query, params } = this.$route
      this.$router.push({ path, hash, query: { ...query, q }, params })
      this.setSearch(q)
      return await this.getEntries()
        .catch(console.error)
    },
    header () {
      return {
        title: 'Custom Gaskets',
        meta: getMetaTags({ title: 'Custom Gaskets', description: '' })
      }
    }
  }
}
</script>
