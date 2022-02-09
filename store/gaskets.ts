// import { gql } from 'graphql-request'
// import { entryFields } from '~/utils/graphql/fragments/entries'

import { CollectionType } from '~/models/entry.model'
import { defaultCollectionVariables, getCollection } from '~/utils/graphql/requests/collection'
import { parseResponse } from '~/utils/graphql/responses'

export const state = () => ({
  ...defaultCollectionVariables,
  entries: [],
  canLoadMore: true,
  search: ''
})

export const mutations = {
  setEntries(state: any, val: any) {
    state.entries = val
    return state
  },
  setCanLoadMore(state: any, val: any) {
    state.canLoadMore = val
  },
  setParams(state: any, params: any) {
    if (typeof params !== 'object' || !Object.keys(params).length) {
      return null
    }
    Object.keys(params).forEach((key) => {
      if (params[key]) { state[key] = params[key] }
    })
    // return await dispatch('gaskets/get').catch((err:any) => { throw new Error(err) })
  },
  setSearch(state: any, val: string): any {
    if (state.search === val) {
      return null
    };
    const filtersParams = Object.keys(state?.filters?.or?.length ? state.filters.or[0] : state.filters).filter(k => !k.includes('_contains'))
      .reduce((acc: any, key: string) => {
        return { ...acc, [key]: state.filters[key] }
      }, {})
    state.search = val
    const filters = !val?.length
      ? filtersParams
      : {
        or: ['title', 'content', 'description'].map((k) => {
          return {
            ...filtersParams,
            [`${k}_contains`]: val.trim()
          }
        })
      }
    state.filters = filters
  }
}

function getQueryParamsFromState(state: any): { [key: string]: any } {
  return Object.keys(state).reduce((acc, key) => {
    return ['entries', 'canLoadMore'].includes(key)
      ? acc
      : { ...acc, [key]: state[key] }
  }, {})
}

export const actions: any = {
  async get({ state, commit }: any) {
    const entries = await getCollection(CollectionType.GASKETS, getQueryParamsFromState(state))
      .then((res: any) => parseResponse(res.gaskets))
    commit('setEntries', entries)
    commit('setCanLoadMore', entries.length === state.limit)
    return entries
  },
  async more({ state, commit }: any) {
    const entries = await getCollection(CollectionType.GASKETS, { ...getQueryParamsFromState(state), start: state.entries.length })
      .then((res: any) => parseResponse(res.gaskets))
    const allEntries = [...state.entries, ...entries]
    commit('setEntries', allEntries)
    commit('setCanLoadMore', entries.length === state.limit)
    return allEntries
  }
}
