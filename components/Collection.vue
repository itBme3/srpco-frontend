
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
}
</script>
