const INITIAL_STATE: {
      last: number,
      direction: 'up' | 'down'
} = {
      last: 0,
      direction: 'up'
}

export const state = () => (INITIAL_STATE);

export const mutations = {
      set(state: any) {
            if (window === undefined) {
                  state = INITIAL_STATE;
                  return
            }
            state.direction = window.scrollY <= state.last || window.scrollY < 20 ? 'up' : 'down';
            state.last = window.scrollY;
      }
}