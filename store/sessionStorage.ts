const initialState = {
      user: null,
      jwt: null,
      isAdmin: false
}

export const state = () => ({
      ...JSON.parse(JSON.stringify(initialState))
})

export const mutations = {
      setUser(state: any, val: { user: any, jwt: string, isAdmin: boolean }) {
            state.user = Object.assign({}, state.user, val.user);
            state.jwt = val.jwt
            state.isAdmin = val.isAdmin
      },
      resetUser(state: any) {
            state.user = initialState.user
            state.jwt = initialState.jwt
            state.isAdmin = initialState.isAdmin
      }
}