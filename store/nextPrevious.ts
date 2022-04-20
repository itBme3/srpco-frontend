const defaultSort = 'publishedAt:desc'
import { CollectionType } from '~/models/entry.model';

const INITIAL_STATE = {
      next: null,
      previous: null,
      sort: defaultSort,
      entry: null,
      filters: {},
      collection: null
}

export const state = () => (INITIAL_STATE);


export const mutations = {
      setCollectionType(state: any, collection: CollectionType | null) {
            state.collection = collection
      },
      setEntry(state: any, entry: any) {
            state.entry = entry
      },
      setFromCollection(state: any, val: { sort: string, entry: number, collection: CollectionType, filters?: any }) {
            const { sort: initialSort = defaultSort, entry = null, filters = {}, collection = null } = val;
            let sort = Array.isArray(initialSort) ? initialSort[0] : initialSort;
            if (!sort.includes(':')) {
                  sort = ['published', 'created', 'updated'].includes(sort) ? `${sort}At:desc` : `${sort}:desc`
            }
            state.sort = sort;
            state.entry = entry;
            state.filters = filters;
            state.collection = collection;
      },
      setNext(state: any, val: any = null) {
            const { next = null, previous = null } = val;
            state.next = val
      },
      setPrevious(state: any, val: any = null) {
            state.previous = val
      }
}
export const actions: any = {
      async getNextPreviousEntries({ commit, state }: any) {
            const { sort: initialSort = defaultSort, collection = '', entry = null }: { sort: string[] | string, collection: string, filters: any, entry: any } = state;
            let { filters: initialFilters = {} } = state;
            if (!!!initialFilters) {
                  initialFilters = {}
            }
            if (!['resources', 'solutions'].includes(collection)) {
                  state = INITIAL_STATE;
                  return;
            }
            const sort = Array.isArray(initialSort) ? initialSort[0] : initialSort;
            const [previous, next] = await this.$content(collection)
                  .sortBy(sort)
                  .surround(entry.slug)
                  .fetch()
            commit('setPrevious', previous)
            commit('setNext', next)

      }
}