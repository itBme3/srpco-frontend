
<template>
  <div class="collection-container">
    <SearchInput
      v-debounce:600ms="(e) => $emit('search', e)"
      :variant="'dark'"
      :autocomplete="'on'"
      :classes="''"
      :debounce-events="['input']"
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
        <pre><code>{{ JSON.stringify(entry, null, 2) }}</code></pre>
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
  },
  methods: {
    emitSearch (q:string) {
      // console.log(e)

      // this.$emit('search', e)
    }
  }
  // mounted() {
  //   console.log(this)
  // },
  // methods: {
  //   emitSearch (emit:any) {
  //     console.log(emit)
  //     // $debounce(emit, 1000)
  //   }
  // }
  // data ():any {
  //   let canLoadMore:boolean = false
  //   let entries:any = []
  //   let collectionType:CollectionType | null = null
  //   try {
  //     canLoadMore = !!this?.$store?.state && !!this?.$store?.state[this.collection]?.canLoadMore
  //     entries = !!this?.$store?.state && !!this?.$store?.state[this.collection]?.entries ? this?.$store?.state[this.collection]?.entries : null
  //     collectionType = !!this?.collection ? this.collection : null
  //   } catch(err) {}
  //   return {
  //       collectionType, entries, canLoadMore
  //     }
  // },

  // mounted () {
  //   if(!!this && typeof this.getEntries !== 'undefined') {
  //     const getEntries = !!this ? !!this?.getEntries ? this?.getEntries : !!this?.methods?.getEntries ? this.methods.getEntries : null
  //     setTimeout(() => {
  //       if (!!getEntries) {
  //         getEntries().catch(console.error)
  //       }
  //     }, 5000)
  //   }
  // },
  // fetchOnServer: true,
  // methods: {
  //   search (value:string) {
  //     console.log(value)
  //   },
  //   setParams ({ store, data }: any) {
  //     store.commit('"' + data.collectionType + '/setParams' + '"')
  //   },
  //   async getEntries (vm:any) {
  //     const collectionType = vm.collectionType
  //     const action = '' + collectionType + '/get' + ''
  //     await vm.$store.dispatch(action)
  //     vm.entries = vm.$store.state[collectionType].entries
  //     vm.canLoadMore = vm.$store.state[collectionType].canLoadMore
  //   },
  //   async getMore (_this:any) {
  //     const vm = !!_this ? _this : this
  //     const collectionType = vm.collectionType
  //     const $store:any = vm.$store
  //     const action:string = '' + collectionType + '/more' + ''
  //     await $store.dispatch(action)
  //     vm.entries = vm.$store.state[collectionType].entries
  //     vm.canLoadMore = vm.$store.state[collectionType].canLoadMore
  //   },
  //   async visblilityHandler (e:any) {
  //     console.log(e)
  //     // if (e.percentInView < 0.91) {
  //     //   return null
  //     // }
  //     // return await this.getMore(this)
  //   }
  // }
}

</script>
