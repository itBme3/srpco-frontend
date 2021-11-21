import { getFooter, getNavigation, getGlobalInfo } from '~/utils/graphql/requests/global'

export const state = () => ({
  footer: null,
  navigation: null,
  globalInfo: null
})

export const mutations = {
  setNavigation (state:any, val:any) {
    state.navigation = val
    return state
  },
  setFooter (state:any, val:any) {
    state.footer = val
    return state
  },
  setGlobalInfo (state:any, val:any) {
    state.globalInfo = val
    return state
  }
}

export const actions: any = {
  async getNavigation ({ commit }: any) {
    return await getNavigation()
      .then((res: any) => {
        commit('global/setNavigation', res.navigation)
        return res.navigation
      })
  },
  async getFooter ({ commit }: any) {
    return await getFooter()
      .then((res: any) => {
        commit('global/setFooter', res.footer)
        return res.footer
      })
  },
  async getGlobalInfo ({ commit, state }: any) {
    if (typeof state.globalInfo !== 'undefined') {
      return state.globalInfo
    }
    return await getGlobalInfo()
      .then((res: any) => {
        commit('global/setGlobalInfo', res.global)
        return res.global
      })
  }
}
