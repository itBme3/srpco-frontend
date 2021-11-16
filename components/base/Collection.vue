
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
        <Media :media="entry.media" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-extra-boolean-cast */
import { CardStyle } from '~/models/blocks.model'
import { CollectionType, EntryItem } from '~/models/entry.model'

interface CollectionClasses {
  container?: string[];
  grid?: string[];
  gard?: string[];
  searchBar?: string[];
}

export default {
  components: {
  },
  props: {
    collection: {
      type: String as () => CollectionType,
      default: null
    },
    searchBar: {
      type: Boolean,
      default: false
    },
    cardStyle: {
      type: String as () => CardStyle,
      default: CardStyle.MEDIA_ABOVE
    },
    entries: {
      type: Array as () => EntryItem[],
      default: null
    },
    classes: {
      type: Object as () => CollectionClasses,
      default () {
        return {
          container: [],
          grid: [],
          gard: [],
          searchBar: []
        }
      }
    }
  },
  data () {
    return {
      searchValue: ''
    }
  }
}

</script>
