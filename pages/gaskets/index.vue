<template>
  <div>
    <pre>{{ canLoadMore }}</pre>
    <pre v-if="!!entries">
                <code v-for="entry in entries" :key="entry.id">
                {{ JSON.stringify(entry, null, 2) }}
                </code>
            </pre>
    <button
      v-if="canLoadMore === true"
      v-view="visblilityHandler"
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
  async created () {
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
      setParams: 'gaskets/setParams'
    }),
    visblilityHandler (e) {
      if (e.percentInView > 0.9) {
        this.canLoadMore = false
        this.getMore().catch(console.error)
      }
    }
  }
}
</script>
