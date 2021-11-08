import { gql } from 'nuxt-graphql-request'

export const state = () => ({
  sort: 'published_at:ASC',
  where: { published_at_null: false },
  limit: 10,
  entries: [],
  canLoadMore: true
})

export const mutations = {
  setEntries (state, val) {
    state.entries = val
    return state
  },
  setCanLoadMore (state, val) {
    state.canLoadMore = val
  },
  setParams (state, params) {
    if (typeof params !== 'object' || !Object.keys(params).length) {
      return null
    }
    return Object.keys(params).forEach((key) => {
      if (params[key]) { state[key] = params[key] }
    })
  }
}

const ENTRY_FIELDS = gql`
    fragment EntryFields on Gasket {
        id
        slug
        title   
    }
`

export const actions = {
  async get ({ state, commit }) {
    const query = gql`
          query ($where: JSON, $sort: String, $limit: Int) {
            gaskets(where: $where, sort: $sort, limit: $limit) {
                ...EntryFields
            }
          }
          ${ENTRY_FIELDS}
        `
    const variables = (() => {
      const { where, sort, limit } = state
      return { where, sort, limit }
    })()
    const entries = await this.$graphql.default.request(query, variables)
      .then(res => res.gaskets)
    commit('setEntries', entries)
    commit('setCanLoadMore', entries.length === state.limit)
    return entries
  },
  async more ({ state, commit }) {
    const query = gql`
          query ($where: JSON, $sort: String, $limit: Int, $start: Int) {
            gaskets(where: $where, sort: $sort, limit: $limit, start: $start) {
              ...EntryFields
            }
          }
          ${ENTRY_FIELDS}
        `
    const variables = (() => {
      const { where, sort, limit } = state
      return { where, sort, limit, start: state.entries.length }
    })()
    const entries = await this.$graphql.default.request(query, variables)
      .then(res => res.gaskets)
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
