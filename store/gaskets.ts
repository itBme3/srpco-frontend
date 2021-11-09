// import { gql } from 'graphql-request'
// import { entryFields } from '~/utils/graphql/fragments/entries'

import { CollectionType } from '~/models/entry.model'
import { defaultCollectionVariables, getCollection } from '~/utils/graphql/requests/collection'

export const state = () => ({
  ...defaultCollectionVariables,
  entries: [],
  canLoadMore: true,
  search: ''
})


export const mutations = {
  setEntries (state:any, val:any) {
    state.entries = val
    return state
  },
  setCanLoadMore (state:any, val:any) {
    state.canLoadMore = val
  },
  setParams (state:any, params:any) {
    if (typeof params !== 'object' || !Object.keys(params).length) {
      return null
    }
    Object.keys(params).forEach((key) => {
      if (params[key]) { state[key] = params[key] }
    })
    // return await dispatch('gaskets/get').catch((err:any) => { throw new Error(err) })
  },
  setSearch (state:any, val:string): any {
    if (state.search === val) {
      return null
    };
    const whereParams = Object.keys(state?.where?._or?.length ? state.where._or[0] : state.where).filter(k => !k.includes('_contains'))
      .reduce((acc: any, key: string) => {
        return { ...acc, [key]: state.where[key] }
      }, {})
    state.search = val
    const where = !val?.length
      ? whereParams
      : {
          _or: ['title', 'content', 'description'].map((k) => {
            return {
              ...whereParams,
              [`${k}_contains`]: val.trim()
            }
          })
        }
    state.where = where
  }
}

function getQueryParamsFromState (state:any): {[key:string]: any} {
  return Object.keys(state).reduce((acc, key) => {
    return ['entries', 'canLoadMore'].includes(key)
      ? acc
      : { ...acc, [key]: state[key] }
  }, {})
}

export const actions: any = {
  async get ({ state, commit }:any) {
    const entries = await getCollection(CollectionType.GASKETS, getQueryParamsFromState(state))
      .then((res:any) => res.gaskets)
    commit('setEntries', entries)
    commit('setCanLoadMore', entries.length === state.limit)
    return entries
  },
  async more ({ state, commit }:any) {
    const entries = await getCollection(CollectionType.GASKETS, { ...getQueryParamsFromState(state), start: state.entries.length })
      .then((res:any) => res.gaskets)
    const allEntries = [...state.entries, ...entries]
    commit('setEntries', allEntries)
    commit('setCanLoadMore', entries.length === state.limit)
    return allEntries
  }
}

// export const mutations = {
//   getQueryParams (state, params) {
//     const queryKeys = ['where', 'sort', 'limit']
//     const queryParams = typeof params === 'object' && Object.keys(params).length > 0 ? params : state
//     console.log(state)
//     return queryKeys.reduce((acc, key) => {
//       acc[key] = typeof queryParams !== 'undefined' && typeof queryParams[key] !== 'undefined' ? queryParams[key] : state[key]
//       if (!!acc && acc[key] !== state[key]) {
//         state[key] = acc[key]
//       }
//       return acc
//     }, {})
//   },
//   async get (state, params) {
//     const queryParams = mutations.getQueryParams(typeof params !== 'undefined' ? params : state.params)
//     console.log(queryParams)
//     const query = gql`
//       query Gaskets($where: JSON, $sort: String, $limit: Int) {
//         gaskets(where: $where, sort: $sort, limit: $limit) {
//             id
//         }
//       }`
//     state.entries = await this.$graphql.default.request(query, queryParams)
//     return state.entries
//   }
//   // async more (params = state.params) {
//   //   const query = gql`
//   //     query Gaskets($params: {where: Json, limit: Int, sort: String}) {
//   //       gaskets(${{ ...params }}) {
//   //           id
//   //       }
//   //     }`
//   //   const variables = { params: mutations.queryParams({ ...params, start: state.entries.length }) }
//   //   return await this.$graphql.default.request(query, variables)
//   //     .then((more) => {
//   //       more.forEach(d => !state.entries.map(e => e.id).includes(d.id) ? state.entries.push(d) : '')
//   //       return state.entries
//   //     })
//   // }
// }
