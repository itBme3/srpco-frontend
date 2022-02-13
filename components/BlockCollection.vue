
<template>
  <div class="collection-container h-auto">
    <template v-if="searchBar === true">
      <SearchInput
        v-debounce:400ms="(e) => e !== searchValue ? searchValue = e : ''"
        :autocomplete="'on'"
        :placeholder="'search in ' + collectionType + '...'"
        :debounce-events="['input']"
        :class="{[searchBarClasses]: searchBarClasses.length > 0}"
        @clear="(e) => searchValue = ''"
      />
    </template>
    <div
      :v-if="!!entries && !!entries.length"
      class="collection-entries grid"
      id="masonCollection"
      :class="{[gridClasses]: gridClasses.length > 0}"
    >
      <template v-for="entry in entries">
        <Card
          v-if="![null, undefined].includes(entry)"
          :key="entry.type + '-' + entry.id"
          :card-style="(['materials', 'applications'].includes(collectionType) && entry !== null && entry !== undefined && !!entry.gaskets && entry.gaskets.length > 0) || collectionType === 'datasheets' ? 'mediaLeft' : cardStyle"
          :title="entry.title"
          :text="!showExcerpt || ['gasket'].includes(entry.type)
              ? null
              : entry.description"
          :media="![null, undefined].includes(entry.file) ? entry.file : entry.media"
          :media-ratio="['materials', 'applications'].includes(collectionType) && (!Array.isArray(entry.gaskets) || entry.gaskets.length === 0) 
              ? '4:2' 
              : collectionType === 'gaskets'
              ? '4:3' 
              : collectionType === 'datasheets'
              ? '8:ll'
              : mediaRatio"
          :link="'/' + collectionType + '/' + entry.slug"
          :open-new-tab="false"
          class="collection-entry"
          :class="{
              [cardClasses.card]: !!cardClasses && !!cardClasses.card && !!cardClasses.card.length,
              [entry.type]: true 
            }"
          :classes="cardClasses"
          :youtube="typeof entry.youtube === 'string' ? entry.youtube : null"
          :is-background="entry.type !== 'datasheet'"
          :more-links="['materials', 'applications'].includes(collectionType) && entry !== null && entry !== undefined && !!entry.gaskets && entry.gaskets.length > 0 ? entry.gaskets : null"
        />
      </template>
    </div>
    <client-only>
      <gButton
        v-if="canLoadMore === true"
        v-view="infiniteScroll ? visibilityHandler : (e) => e"
        class="mt-4 hover:bg-blue-600 bg-blue-500 uppercase text-gray-900 text-opacity-70 tracking-wide px-3 py-2 w-auto min-w-auto block"
        @click="get(entries.length)"
      >
        more {{ collectionType }}
      </gButton>
    </client-only>
  </div>
</template>

<script lang="js">
/* eslint-disable no-extra-boolean-cast */

import { getCollection } from '~/utils/graphql/requests/collection'
import { objectsAreTheSame } from '~/utils/funcs'
import { strapiFilterParams } from '~/utils/search-params'
import { getCardClasses } from '~/utils/get-classes'
import { CardStyle } from '~/models/blocks.model.ts'
import qs from 'qs';

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
          media: '',
          title: '',
          text: '',
          searchBar: ''
        }
      }
    },
    sort: {
      type: Array,
      default: () => {return ['publishedAt:DESC']}
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
    updateUrl: {
      type: Boolean,
      default: true
    },
    filters: {
      type: Object,
      default: () => { return {} }
    },
    showExcerpt: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Boolean,
      default: true
    }
  },
  data () {
    const { grid: gridClasses = '', searchBar: searchBarClasses = '', title = '', card = '', media = '', text = '', content = '' } = !!this.classes ? this.classes : {}
    const collection = this?.collectionType ? this.collectionType : null
    const mediaRatio = this.ratio !== null && this.ratio?.indexOf(':') > -1 ? this.ratio : ['services', 'materials', 'applications'].includes(collection) ? '16:9' : 'auto'
    return {
      entries: null,
      nextEntries: null,
      searchValue: '',
      canLoadMore: false,
      cardClasses: { title, card, text, media, content },
      gridClasses,
      searchBarClasses,
      collection,
      mediaRatio,
      queryParams: { }
    }
  },
  async fetch () {
    const collection = this.collection
    // this.queryParams = this.getQueryParams()
    if (collection === null) {
      return
    }
    return await this.get()
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler (e) {
        if (!this.updateUrl) return;
        this.queryParams = this.getQueryParams()
        this.get()
      }
    },
    searchValue: {
      immediate: false,
      handler(val) {
        if(this.updateUrl && window !== undefined) {
          if (!val?.length) {
            delete this.$route.query.q
          } else {
            this.$route.query.q = val
          }
          const queryString = qs.stringify(this.$route.query);
          const path = !queryString?.length ? this.$route.path : `${this.$route.path}?${queryString}`
          window.history.pushState({path}, '', path)
        }
        this.get().catch(console.error)
      }
    }
  },
  mounted() {
    if(!Array.isArray(this.entries)) return;
    this.$emit('updateEntries', this.entries)
  },
  computed: {
    constantFilters() {
      try {
        return Object.keys(this.filters).length === 0 ? {} : this.filters
      } catch(e) {
        return {}
      }
    }
  },
  methods: {
    async get (start = 0) {
      const collection = this.collection
      if (typeof collection !== 'string') {
        this.$emit('updateEntries', this.entries)
        console.error(`collection: ${collection}`)
        return
      }
      const params = this.getQueryParams();
      if (objectsAreTheSame(params, this.queryParams)) {
        if (start === 0) {
          return this.$emit('updateEntries', this.entries);
        }
      }
      this.queryParams = params
      this.nextEntries = await getCollection(this.collection, { ...this.queryParams, pagination: { limit: this.limit, start } } )
        .then(res => {
          this.canLoadMore = res.length === this.limit
          return res;
        }).catch(console.error)
      if (start === 0 || !!!this.entries || !!!this.entries.length) {
        this.entries = this.nextEntries
      } else {
        this.entries = [...this.entries, ...this.nextEntries.filter(e => !this.entries.map(c => c.slug).includes(e.slug))]
      }
      this.$emit('updateEntries', this.entries)
      try {
        if (this.infiniteScroll && window !== undefined) {
          setTimeout(() => {
            window.scrollTo({top: window.scrollY === 0 ? 1 : window.scrollY + 1})
            window.scrollTo({top: window.scrollY - 1})
          }, 100)
        }
      } catch {
        return 
      } finally {
        return this.entries;
      }
    },
    getQueryParams () {
      const limit = this.limit && this.limit > 0 ? this.limit : 6
      const sort = typeof this.sort === 'string' && this.sort.length > 0 ? this.sort : 'publishedAt:DESC'
      if(this.updateUrl) {
        this.searchValue = this.$route.query.q
      }
      const routeQuery = !this.updateUrl ? !!this.searchValue?.length ? { q: this.searchValue } : {} : {...this.$route.query, q: this.searchValue}
      return strapiFilterParams({ ...routeQuery, constantFilters: this.constantFilters, pagination: {limit}, sort }, this.collectionType)
    },
    visibilityHandler (e) {
      if (e.percentInView > 0.20) {
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
    @apply text-lg sm:text-xl;
  }
}
.collection-container {
  .search-bar {
    @apply max-w-xs bg-gray-50 bg-opacity-3 hover:bg-opacity-5 focus-within:bg-opacity-5 mb-3;
    input {
      @apply rounded-none bg-transparent pl-3 py-2 w-full;
    }
  }
}
</style>
