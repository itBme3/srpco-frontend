const defaultSort = 'publishedAt:desc'
import { gql } from 'graphql-request'
import { CollectionType } from '~/models/entry.model';
import { mediaFields } from '~/utils/graphql/fragments/fields';
import { $graph } from '~/utils/graphql/init'
import { capitalize } from '~/utils/funcs'

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
export const actions = {
      async getNextPreviousEntries({ commit, state }: any) {
            const { sort: initialSort = defaultSort, collection = '', entry = null }: { sort: string[] | string, collection: string, filters: any, entry: any } = state;
            let { filters: initialFilters = {} } = state;
            if (!!!initialFilters) {
                  initialFilters = {}
            }
            const sort = Array.isArray(initialSort) ? initialSort[0] : initialSort;
            const sortField = sort.split(':')[0];
            const sortDirection = sort.split(':')[1] === 'asc' ? 'asc' : 'desc';
            const sorts = {
                  next: `${sortField}:${sortDirection}`,
                  previous: `${sortField}:${sortDirection === 'asc' ? 'desc' : 'asc'}`,
            }
            const filters = {
                  next: Array.isArray(initialFilters?.and) ?
                        { ...initialFilters, and: [...initialFilters.and, { [sortField]: { [sortDirection === 'asc' ? 'gt' : 'lt']: entry[sortField] } }] }
                        : {
                              and: [initialFilters, { [sortField]: { [sortDirection === 'asc' ? 'gt' : 'lt']: entry[sortField] } }]
                                    .filter(o => Object.keys(o).length > 0)
                        },
                  previous: Array.isArray(initialFilters?.and) ?
                        { ...initialFilters, and: [...initialFilters.and, { [sortField]: { [sortDirection === 'asc' ? 'lt' : 'gt']: entry[sortField] } }] }
                        : {
                              and: [initialFilters, { [sortField]: { [sortDirection === 'asc' ? 'lt' : 'gt']: entry[sortField] } }]
                                    .filter(o => Object.keys(o).length > 0)
                        }
            };
            console.log(filters)
            if (!['resources', 'solutions'].includes(collection)) {
                  state = INITIAL_STATE;
                  return;
            }
            const shape = `data {
                  id
                  attributes {
                        title description slug media { ${mediaFields.default} }
                  }
            }`
            const filtersInputType = `${capitalize(collection).substring(0, collection.length - 1)}FiltersInput`

            return await Promise.all([
                  $graph.request(gql`
                        query ${capitalize(collection)}($filters: ${filtersInputType}) {
                              ${collection}(filters: $filters, sort: "${sorts.next}", pagination: { limit: 1 }) {
                                    ${shape}
                              }
                        }`,
                        {
                              filters: filters.next
                        }
                  ).then(res => {
                        const val = !!res[collection]?.data?.length ? res[collection].data[0] : null
                        console.log({ val });
                        commit('setNext', !!val ? { id: val.id, ...val.attributes } : null)
                        return
                  }).catch(err => {
                        console.error(err.message)
                        commit('setNext', null)
                        return
                  }),
                  $graph.request(gql`
                        query ${capitalize(collection)}($filters: ${filtersInputType}) {
                              ${collection}(filters: $filters, sort: "${sorts.previous}", pagination: { limit: 1 }) {
                                    ${shape}
                              }
                        }`,
                        {
                              filters: filters.previous
                        }
                  ).then(res => {
                        const val = !!res[collection]?.data?.length ? res[collection].data[0] : null
                        commit('setPrevious', !!val ? { id: val.id, ...val.attributes } : null)
                        return
                  }).catch(err => {
                        console.error(err.message)
                        commit('setPrevious', null)
                        return
                  })
            ]).catch(console.error)
      }
}