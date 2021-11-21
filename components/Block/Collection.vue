
<template>
  <div
    class="collection-container"
  >
    <template v-if="searchBar === true">
      <SearchInput
        v-debounce:400ms="(e) => e !== searchValue ? $emit('search', e) : ''"
        :autocomplete="'on'"
        :debounce-events="['input']"
        @clear="(e) => $emit('search', '')"
        :class="{[searchBarClasses]: searchBarClasses.length > 0}"
      />
    </template>
    <div
      v-if="!!entries && entries.length > 0"
      class="collection-entries"
      :class="{[gridClasses]: gridClasses.length > 0}"
    >
    <template v-for="entry in entries">
      <Card
        :key="entry.id"
        :card-style="cardStyle"
        :title="entry.title"
        :text="entry.description"
        :media="entry.media"
        :mediaRatio="mediaRatio"
        :link="'/' + collectionType + '/' + entry.slug"
        :open-new-tab="false"
        class="collection-entry"
        :class="{[cardClasses]: cardClasses.length > 0}"
        :title-classes="cardTitleClasses"
        :youtube="typeof entry.youtube === 'string' ? entry.youtube : null"
        :text-classes="cardTextClasses"
        :media-classes="cardMediaClasses"
      />
    </template>
    </div>
    <button
      v-if="canLoadMore === true"
      v-view="visibilityHandler"
      class="rounded hover:bg-green-500 bg-blue-500 uppercase text-white px-5 py-3 w-auto min-w-auto block"
      @click="get(entries.length)"
    >
      get more
    </button>
  </div>
</template>

<script lang="js">
/* eslint-disable no-extra-boolean-cast */

import { getCollection } from '~/utils/graphql/requests/collection'
import { CardStyle } from '~/models/blocks.model.ts'
// interface CollectionClasses {
//   container?: string;
//   grid?: string;
//   card?: string;
//   searchBar?: string;
// }

export default {
  props: {
    collectionType: {
      type: String,
      default: null
    },
    searchBar: {
      type: Boolean,
      default: false
    },
    cardStyle: {
      type: String,
      default: CardStyle.MEDIA_ABOVE
    },
    classes: {
      type: Object,
      default () {
        return {
          grid: '',
          card: '',
          cardMedia: '',
          cardTitle: '',
          cardText: '',
          searchBar: ''
        }
      }
    },
    sort: {
      type: String,
      default: 'published_at:DESC'
    },
    limit: {
      type: Number,
      default: 6
    },
    ratio: {
      type: String,
      default: null
    }
  },
  data () {
    const { card: cardClasses = '', cardTitle: cardTitleClasses = '', cardText: cardTextClasses = '', cardMedia: cardMediaClasses = '', grid: gridClasses = '', searchBar: searchBarClasses = '' } = Object.keys(this.classes).length > 0 ? this.classes : {}
    const collection = this?.collectionType ? this.collectionType : null
    const mediaRatio = this.ratio !== null && this.ratio?.indexOf(':') > -1 ? this.ratio : collection === 'services' ? '16:9' : null
    return {
      entries: null,
      searchValue: '',
      canLoadMore: false,
      cardClasses,
      gridClasses,
      searchBarClasses,
      collection,
      cardTitleClasses,
      cardTextClasses,
      cardMediaClasses,
      mediaRatio
    }
  },
  async fetch () {
    const collection = this.collection
    if (collection === null) {
      return
    }
    await this.get()
  },
  methods: {
    async get (start = 0) {
      const collection = this.collection
      if (typeof collection !== 'string') {
        return console.error(`collection: ${collection}`)
      }
      const limit = this.limit && this.limit > 0 ? this.limit : 6
      const sort = typeof this.sort === 'string' && this.sort.length > 0 ? this.sort : 'published_at:DESC'
      const nextEntries = await getCollection(this.collection, { limit, sort, start })
        .then(res => res[collection])
      this.canLoadMore = nextEntries.length === this.limit
      if (start === 0 || !!!this.entries || !!!this.entries.length) {
        this.entries = nextEntries
      } else {
        this.entries = [...this.entries, ...nextEntries]
      }
      console.log('entries: ', this.entries)
    },
    visibilityHandler (e) {
      if (e.percentInView > 0.9) {
        this.canLoadMore = false
        this.get(this.entries.length)
          .catch(console.error)
      }
    }
  }
}

</script>

<style>
.collection-entries {
  @apply grid grid-cols-12 gap-4 p-4 mx-auto my-0
}
.collection-entry {
  @apply col-span-6 md:col-span-4 lg:col-span-3
}
</style>
