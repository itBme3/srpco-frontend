<template>
  <div>
    <pre>{{ canLoadMore }}</pre>
    <client-only>
      <BaseCollection
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
      />
    </client-only>
    <button
      v-if="canLoadMore === true"
      view="visblilityHandler"
      class="rounded hover:bg-green-500 bg-blue-500 uppercase text-white px-5 py-3 w-auto min-w-auto block"
      @click="getMore()"
    >
      get more
    </button>
  </div>
</template>

<script lang="js">
import {
  mapMutations,
  mapActions
} from 'vuex'
import { $graph } from '~/utils/graphql/init'

export default {
  data () {
    return {
      entries: this.$store.state.gaskets.entries,
      canLoadMore: false
    }
  },
  async mounted () {
    console.log({ $graph })
    await this.getEntries()
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
        this.getMore().catch(console.error)
      }
    },
    async updateSearch (q) {
      const { path, hash, query, params } = this.$route
      this.$router.push({ path, hash, query: { ...query, q }, params })
      // console.log({state: this.$store.state, val: q})
      console.log(q)
      this.setSearch(q)
      return await this.getEntries().catch(console.error)
      // return await this.getEntries()
    }
  }
}
</script>
