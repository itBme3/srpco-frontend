
<template>
  <div class="collection-container">
    <SearchInput
      v-debounce:400ms="(e) => e !== searchValue ? $emit('search', e) : ''"
      :autocomplete="'on'"
      :debounce-events="['input']"
      @clear="(e) => $emit('search', '')"
    />

    <div
      v-if="!!entries && !!entries.length"
      class="collection-entries"
    >
      <div
        v-for="entry in entries"
        :key="entry.id"
        class="collection-entry"
      >
        <Media :is-background="true" :media="entry.media" :ratio="'2:1'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-extra-boolean-cast */
export default {
  data () {
    return {
      entries: null,
      canLoadMore: false
    }
  }
  // async fetch () {
  //   const { dispatch } = this.$store
  //   await dispatch('gaskets/get')
  //   const entries = this.$store.state.gaskets.entries
  //   const canLoadMore = this.$store.state.gaskets.canLoadMore
  //   return { entries, canLoadMore }
  // },
  // methods: {
  //   ...mapActions({
  //     get: 'gaskets/get',
  //     more: 'gaskets/more'
  //   }),
  //   async getEntries () {
  //     await this.get()
  //     this.entries = this.$store.state.gaskets.entries
  //     this.canLoadMore = this.$store.state.gaskets.canLoadMore
  //   },
  //   async getMore () {
  //     await this.more()
  //     this.entries = this.$store.state.gaskets.entries
  //     this.canLoadMore = this.$store.state.gaskets.canLoadMore
  //   },
  //   ...mapMutations({
  //     setParams: 'gaskets/setParams',
  //     setSearch: 'gaskets/setSearch'
  //   }),
  //   visblilityHandler (e) {
  //     if (e.percentInView > 0.9) {
  //       this.canLoadMore = false
  //       this.getMore()
  //         .catch(console.error)
  //     }
  //   },
  //   async updateSearch (q) {
  //     const { path, hash, query, params } = this.$route
  //     this.$router.push({ path, hash, query: { ...query, q }, params })
  //     this.setSearch(q)
  //     return await this.getEntries()
  //       .catch(console.error)
  //   }
  // }
}
</script>
