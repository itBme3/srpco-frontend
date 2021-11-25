
<template>
  <div
    class="collection-container"
  >
    <template v-if="searchBar === true">
      <SearchInput
        v-debounce:400ms="(e) => e !== searchValue ? $emit('search', e) : ''"
        :autocomplete="'on'"
        :debounce-events="['input']"
        :class="{[searchBarClasses]: searchBarClasses.length > 0}"
        @clear="(e) => $emit('search', '')"
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
          :card-style="['materials', 'applications'].includes(collectionType) && entry !== null && entry !== undefined && !!entry.gaskets && entry.gaskets.length > 0 ? 'mediaLeft' : cardStyle"
          :title="entry.title"
          :text="['material', 'application', 'gasket'].includes(entry.type) || !Array.isArray(entry.gaskets) || entry.gaskets.length === 0
            ? null
            : entry.description"
          :media="entry.media"
          :media-ratio="['materials', 'applications'].includes(collectionType) && (!Array.isArray(entry.gaskets) || entry.gaskets.length === 0) ? '4:2' : mediaRatio"
          :link="'/' + collectionType + '/' + entry.slug"
          :open-new-tab="false"
          class="collection-entry"
          :class="{[cardClasses]: cardClasses.length > 0}"
          :title-classes="cardTitleClasses"
          :youtube="typeof entry.youtube === 'string' ? entry.youtube : null"
          :text-classes="cardTextClasses"
          :media-classes="cardMediaClasses"
          :is-background="true"
          :more-links="['materials', 'applications'].includes(collectionType) && entry !== null && entry !== undefined && !!entry.gaskets && entry.gaskets.length > 0 ? entry.gaskets : null"
        />
      </template>
    </div>
    <gButton
      v-if="canLoadMore === true"
      v-view="infiniteScroll ? visibilityHandler : (e) => e"
      class="hover:bg-blue-600 bg-blue-500 uppercase text-gray-900 text-opacity-70 tracking-wide px-3 py-2 w-auto min-w-auto block"
      @click="get(entries.length)"
    >
      more {{ collectionType }}
    </gButton>
  </div>
</template>

<script lang="js">
/* eslint-disable no-extra-boolean-cast */

import { getCollection } from '~/utils/graphql/requests/collection'
import { objectsAreTheSame } from '~/utils/funcs'
import { strapiFilterParams } from '~/utils/search-params'
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
    },
    infiniteScroll: {
      type: Boolean,
      default: true
    },
    updateFromUrl: {
      type: Boolean,
      default: true
    }
  },
  data () {
    const { card: cardClasses = '', cardTitle: cardTitleClasses = '', cardText: cardTextClasses = '', cardMedia: cardMediaClasses = '', grid: gridClasses = '', searchBar: searchBarClasses = '' } = Object.keys(this.classes).length > 0 ? this.classes : {}
    const collection = this?.collectionType ? this.collectionType : null
    const mediaRatio = this.ratio !== null && this.ratio?.indexOf(':') > -1 ? this.ratio : ['services', 'materials', 'applications'].includes(collection) ? '16:9' : 'auto'

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
      mediaRatio,
      queryParams: { }
    }
  },
  async fetch () {
    const collection = this.collection
    this.queryParams = this.getQueryParams()
    if (collection === null) {
      return
    }
    await this.get()
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler (e) {
        this.queryParams = this.getQueryParams()
      }
    }
  },
  methods: {
    async get (start = 0) {
      const collection = this.collection
      if (typeof collection !== 'string') {
        return console.error(`collection: ${collection}`)
      }
      const params = this.getQueryParams()
      if (objectsAreTheSame(params, this.queryParams)) {
        if (start === 0) {
          return
        }
      }
      this.queryParams = params
      const nextEntries = await getCollection(this.collection, { ...params, start })
        .then(res => res[collection])
      this.canLoadMore = nextEntries.length === this.limit
      if (start === 0 || !!!this.entries || !!!this.entries.length) {
        this.entries = nextEntries
      } else {
        this.entries = [...this.entries, ...nextEntries]
      }
    },
    getQueryParams () {
      const limit = this.limit && this.limit > 0 ? this.limit : 6
      const sort = typeof this.sort === 'string' && this.sort.length > 0 ? this.sort : 'published_at:DESC'
      return strapiFilterParams({ ...this.$route.query, limit, sort })
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

<style lang="scss">
.collection-entries {
  @apply grid grid-cols-12 gap-3 sm:gap-4 mx-auto my-0;
}
.collection-entry {
  @apply col-span-6 md:col-span-4 lg:col-span-3;
  // .card-link {
  //    @apply transform transition-all ease-quick-in duration-300 scale-100 hover:scale-102;
  // }
  .card-title {
    @apply text-lg sm:text-xl
  }
}
</style>
