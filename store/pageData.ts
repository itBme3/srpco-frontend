import { getGlobalInfo } from "~/utils/graphql/requests/global"
import { seoHead } from "~/utils/page-seo"

export const state = () => ({
      data: null,
      seo: null
})

export const mutations = {
      SET_PAGE_DATA(state: { data: any, seo: any }, pageData: any) {
            state.data = pageData
            return getGlobalInfo().then(global => {
                  state.seo = seoHead(global, pageData)
            }).catch(console.error)
      }
}