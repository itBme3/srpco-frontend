<template>
  <div class="collection-container h-auto">
    <template v-if="searchBar === true">
      <SearchInput
        :autocomplete="'on'"
        :placeholder="'search in ' + collectionType + '...'"
        :class="{ [classes.searchBar || '']: !!classes.searchBar }"
        @search="(e) => (searchValue !== e ? (searchValue = e) : '')"
        @clear="() => (searchValue = '')" />
    </template>
    <div
:v-if="!!entries && !!entries.length"
         class="collection-entries grid"
         :class="{ [classes.grid || '']: !!classes && classes.grid }">
      <template v-for="(entry, i) in entries">
        <Card
v-if="![null, undefined].includes(entry)"
              :key="entry.type + '-' + entry.id + '-' + i"
              :lazy="i > 6"
              :card-style="
                collectionType === 'datasheets' ? 'mediaLeft' : cardStyle
              "
              :title="entry.title"
              :text="
                !showExcerpt || ['gasket'].includes(entry.type)
                  ? null
                  : entry.description
              "
              :media="
                ![null, undefined].includes(entry.file) ? entry.file : entry.media
              "
              :media-ratio="
                ['materials', 'applications', 'suppliers'].includes(collectionType)
                  ? '1:1'
                  : collectionType === 'gaskets'
                    ? '4:3'
                    : collectionType === 'datasheets'
                      ? '8:ll'
                      : mediaRatio
              "
              :link="'/' + collectionType + '/' + entry.slug"
              :open-new-tab="false"
              class="collection-entry"
              :class="{
                [cardClasses.card]:
                  !!cardClasses && !!cardClasses.card && !!cardClasses.card.length,
                [entry.type]: true
              }"
              :classes="cardClasses"
              :youtube="typeof entry.youtube === 'string' ? entry.youtube : null"
              :is-background="entry.type !== 'datasheet'"
              :more-links="
                ['materials', 'applications'].includes(collectionType) &&
                  entry !== null &&
                  entry !== undefined &&
                  !!entry.gaskets &&
                  entry.gaskets.length > 0
                  ? entry.gaskets
                  : null
              "
              @click="storeFromCollection(entry)" />
      </template>
    </div>

    <gButton
v-if="
      loadingMore === 'linkToCollection' ||
      (!!buttonLink && buttonLink.length)
    "
             class="load-more-button"
             @click="collectionButtonClicked()">
      <template v-if="!!buttonText && buttonText.length">
        {{ buttonText }}
      </template>
      <template v-else> {{ collectionType }} Collection </template>
    </gButton>

    <client-only>
      <gButton
v-if="
        canLoadMore === true &&
        ['button', 'infiniteScroll'].includes(loadingMore) &&
        (!buttonLink || !buttonLink.length)
      "
               v-view="infiniteScroll ? visibilityHandler : (e) => e"
               :class="{
                 'load-more-button': true
               }"
               @click="get(entries.length)">
        <template v-if="!!buttonText && buttonText.length">
          {{ buttonText }}
        </template>
        <template v-else> load more {{ collectionType }} </template>
      </gButton>
    </client-only>
  </div>
</template>

<script>
import qs from 'qs'
import Vue from 'vue'
import { objectsAreTheSame } from '~/utils/funcs'
import { strapiFilterParams } from '~/utils/search-params'
import { CardStyle } from '~/models/blocks.model.ts'

export default Vue.extend({
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
      default: CardStyle.MEDIA_LEFT
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
      type: String,
      default: 'publishedAt:DESC'
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
    initialEntries: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showExcerpt: {
      type: Boolean,
      default: false
    },
    loadingMore: {
      type: String /* button, infiniteScroll, linkToCollection, none */,
      default: 'button'
    },
    buttonLink: {
      type: String,
      default: null
    },
    buttonText: {
      type: String,
      default: null
    }
  },
  data () {
    const { grid: gridClasses = '' } = !!this.classes ? this.classes : {}
    const collection = this?.collectionType ? this.collectionType : null
    const mediaRatio =
      this.ratio !== null && this.ratio?.indexOf(':') > -1
        ? this.ratio
        : ['services', 'materials', 'applications'].includes(collection)
          ? '16:9'
          : collection === 'suppliers'
            ? '1:1'
            : 'auto'
    return {
      entries: this.initialEntries.length ? this.initialEntries : [],
      nextEntries: this.initialEntries?.length > 3 ? this.initialEntries.slice(3) : null,
      searchValue: '',
      lastSearch: '',
      canLoadMore: false,
      gridClasses,
      collection,
      mediaRatio,
      queryParams: {}
    }
  },
  fetch () {
    const collection = this.collection

    if (collection === null) {
      return {}
    }
    this.searchValue =
      this.updateUrl && this.$route?.query?.q?.length ? this.$route.query.q : ''
    return this.get(0).catch(console.error)
  },
  computed: {
    cardClasses () {
      const {
        title = '',
        card = '',
        media = '',
        text = '',
        content = ''
      } = this.classes || {}
      return { title, card, media, text, content }
    },
    constantFilters () {
      try {
        return Object.keys(this.filters).length === 0 ? {} : this.filters
      } catch (e) {
        return {}
      }
    },
    collectionSort () {
      let sorts =
        this.updateUrl && this.$route.query?.sort?.length
          ? this.$route.query.sort
          : this.sort
      if (!Array.isArray(sorts)) {
        sorts = [sorts]
      }
      return sorts.map((sort) => {
        let sortKey = sort?.split(':')[0] || 'publishedAt'
        if (['created', 'updated', 'published'].includes(sortKey)) {
          sortKey = `${sortKey}At`
        }
        let sortDirection = sort?.split(':')[0]?.toUpperCase()
        if (!['asc', 'desc'].includes(sortDirection?.toLowerCase())) {
          sortDirection = ['created', 'updated', 'published'].includes(sortKey)
            ? 'DESC'
            : 'ASC'
        }
        return `${sortKey}:${sortDirection}`
      })
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler () {
        if (!this.updateUrl) return
        this.queryParams = this.getQueryParams()
        this.get()
      }
    },
    searchValue (val) {
      if (this.lastSearch === val) {
        return
      }
      this.lastSearch = val
      if (this.updateUrl && window !== undefined) {
        if (!val?.length) {
          delete this.$route.query.q
        } else {
          this.$route.query.q = val
        }
        const queryString = qs.stringify(this.$route.query)
        const path = !queryString?.length
          ? this.$route.path
          : `${this.$route.path}?${queryString}`
        window.history.pushState({ path }, '', path)
      }
      this.get().catch(console.error)
    }
  },
  mounted () {
    if (!Array.isArray(this.entries)) return null
    this.$emit('updateEntries', this.entries)
  },
  methods: {
    async get (start = 0) {
      if (typeof this.collection !== 'string') {
        this.$emit('updateEntries', this.entries)
        return
      }

      /* if entries provided in props */
      if (this.initialEntries?.length > this.limit && this.nextEntries?.length) {
        for (let i = 0; i < this.limit || !this.nextEntries?.length; i++) {
          this.entries.push(this.nextEntries.shift())
        }
        this.$emit('updateEntries', this.entries)
        return this.entries
      }

      const params = this.getQueryParams()
      if (objectsAreTheSame(params, this.queryParams)) {
        if (start === 0) {
          this.$emit('updateEntries', this.entries)
          return
        }
      }
      this.queryParams = params
      const collectionSort = !this.collectionSort
        ? 'publishedAt:desc'
        : Array.isArray(this.collectionSort)
          ? this.collectionSort[0]
          : this.collectionSort
      const sortField = collectionSort.split(':')[0] || 'publishedAt'
      const sortDirection = collectionSort.split(':')[1] || 'desc'
      this.nextEntries = await this.$content(this.collection)
        .where({ ...(this.queryParams?.filters || {}) })
        .sortBy(sortField, sortDirection)
        .skip(start)
        .search(
          typeof this.queryParams?.search === 'string'
            ? this.queryParams.search
            : ''
        )
        .limit(this.limit)
        .fetch()
        .then((res) => {
          this.canLoadMore = res.length === this.limit
          return res
        })
      if (start === 0 || !this.entries?.length) {
        this.entries = this.nextEntries
      } else {
        this.entries = [
          ...this.entries,
          ...this.nextEntries.filter(
            (e) => !this.entries.map((c) => c.slug).includes(e.slug)
          )
        ]
      }
      this.$emit('updateEntries', this.entries)
      try {
        if (this.infiniteScroll && window !== undefined) {
          setTimeout(() => {
            window.scrollTo({
              top: window.scrollY === 0 ? 1 : window.scrollY + 1
            })
            window.scrollTo({ top: window.scrollY - 1 })
          }, 100)
        }
        return this.entries
      } catch {
        return this.entries
      }
    },
    getQueryParams () {
      const limit = this.limit && this.limit > 0 ? this.limit : 6
      const sort =
        typeof this.sort === 'string' && this.sort.length > 0
          ? this.sort
          : 'publishedAt:DESC'
      if (this.updateUrl) {
        this.searchValue = this.$route.query.q
      }
      const routeQuery = !this.updateUrl
        ? !!this.searchValue?.length
          ? { q: this.searchValue }
          : {}
        : { ...this.$route.query, q: this.searchValue }
      return strapiFilterParams(
        {
          ...routeQuery,
          constantFilters: this.constantFilters,
          pagination: { limit },
          sort
        },
        this.collectionType
      )
    },
    collectionButtonClicked () {
      if (this.buttonLink?.length) {
        return this.$router.push({ path: this.buttonLink })
      }
      if (this.collectionType !== 'resources') {
        return this.$router.push({ path: `/${this.collectionType}` })
      }
      const resourceTypes = [
        ...new Set(this.entries.map((e) => e.resourceType))
      ]
      if (resourceTypes.length > 1) {
        return this.$router.push({
          path: `/${this.collectionType}/${resourceTypes[0]}`
        })
      }
      return this.$router.push({ path: '/resources' })
    },
    visibilityHandler (e) {
      if (this.loadingMore !== 'infiniteScroll') return
      if (e.percentInView > 0.2) {
        this.canLoadMore = false
        this.get(this.entries.length).catch(console.error)
      }
    },
    storeFromCollection (entry) {
      this.$store.commit('nextPrevious/setFromCollection', {
        entry,
        collection: this.collection,
        sort: this.sort,
        filters: this.filters
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.collection-entries {
  @apply grid grid-cols-12 gap-3 sm:gap-4 mx-auto my-0;

  .datasheet {
    .icon {
      @apply text-gray-600;
    }
  }
}

.collection-entry {
  @apply col-span-6 md:col-span-4 lg:col-span-3 h-auto mb-auto;

  .card-title {
    @apply text-lg sm:text-xl;
  }
}

.load-more-button {
  @apply mt-5 uppercase bg-opacity-5 bg-gray-300 hover:bg-opacity-10 tracking-wide px-3 py-2 w-auto block;
  color:var(--block-content-color);
}
</style>

<style lang="scss">
.collection-container {
  .search-bar {
    @apply max-w-xs bg-gray-50 bg-opacity-3 hover:bg-opacity-5 focus-within:bg-opacity-5 mb-3;

    input {
      @apply rounded-none bg-transparent pl-3 py-2 w-full;
    }
  }
}
</style>
