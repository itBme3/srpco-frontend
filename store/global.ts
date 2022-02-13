import { getFooter, getNavigation } from '~/utils/graphql/requests/global'

export const state = () => ({
  footer: null,
  navigation: null
})

export const mutations = {
  setNavigation(state: any, val: any) {
    state.navigation = val
    return state
  },
  setFooter(state: any, val: any) {
    state.footer = val
    return state
  }
}

export const actions: any = {
  async getNavigation({ commit }: any) {
    return await getNavigation()
      .then((res: any) => {
        commit('global/setNavigation', res.navigation)
        return res.navigation
      })
  },
  async getFooter({ commit }: any) {
    return await getFooter()
      .then((res: any) => {
        commit('global/setFooter', res.footer)
        return res.footer
      })
  }
}
