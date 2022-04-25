import { CollectionType, collectionTypes } from "~/models/entry.model"
const defaultEditLink = `${process.env.apiUrl}/admin/content-manager`
export const state = () => ({
      link: defaultEditLink
})


export const mutations = {
      setAdminLink(state: any, link: string | null) {
            state.link = !link ? defaultEditLink : link
      }
}

export const actions: any = {
      setLink({ commit }: any, route: any) {
            try {
                  if (!this.state.sessionStorage.isAdmin) {
                        return
                  }
                  const base = `${process.env.apiUrl}/admin/content-manager`;
                  if (route.path === '/') {
                        return commit('setAdminLink', `${base}/singleType/api::homepage.homepage`)
                  }
                  if (collectionTypes.includes(route.params.slug)) {
                        return commit('setAdminLink', `${base}/singleType/api::${route.params.slug}-collection.${route.params.slug}-collection`)
                  }
                  if (route?.params?.slug && route?.params?.collection) {
                        return this.app.$content(route.params.collection, route.params.slug)
                              .only(['id', 'type'])
                              .fetch()
                              .then((res: any) => {
                                    if (!res?.id) {
                                          return commit('setAdminLink', null)
                                    }
                                    return commit('setAdminLink', `${base}/collectionType/api::${res.type}.${res.type}/${res.id}`)
                              })
                  }
                  return this.app.$content('pages', route?.params.slug)
                        .only(['id', 'type'])
                        .fetch()
                        .then((res: any) => {
                              if (!res?.id) {
                                    return commit('setAdminLink', null)
                              }
                              return commit('setAdminLink', `${base}/collectionType/api::page.page/${res.id}`)
                        })
            } catch (errs) {
                  console.error(errs)
                  return commit('setAdminLink', null)
            }
      }
}