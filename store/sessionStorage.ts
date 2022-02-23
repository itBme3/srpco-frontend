export const state = () => ({
      user: null,
      jwt: null,
      isAdmin: false
})

export const mutations = {
      setUser(state: any, val: { user: any, jwt: string, isAdmin: boolean }) {
            state.user = val.user;
            state.jwt = val.jwt
            state.isAdmin = val.isAdmin
      }
}