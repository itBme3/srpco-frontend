import { getFooter, getNavigation, getSiteInfo } from '~/utils/graphql/requests/global'

export const state = () => ({
  footer: null,
  navigation: null,
  siteInfo: null
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
  setSiteInfo (state:any, val:any) {
    state.siteInfo = val
    return state
  }
}

export const actions: any = {
  async getNavigation ({ commit }: any) {
    return await getNavigation()
      .then((res: any) => {
        console.log({ res })
        commit('global/setNavigation', res.navigation)
        return res.navigation
      })
  },
  async getFooter ({ commit }: any) {
    return await getFooter()
      .then((res: any) => {
        console.log({ res })
        commit('global/setFooter', res.footer)
        return res.footer
      })
  },
  async getSiteInfo ({ commit }: any) {
    return await getSiteInfo()
      .then((res: any) => {
        commit('global/setSiteInfo', res.global)
        return res.global
      })
  }
}
