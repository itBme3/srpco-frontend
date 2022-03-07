const INITIAL_STATE = {
      isMobile: true,
      width: 100,
      scrollbar: 0
}

const MOBILE_WIDTH = 768;

export const state = (): {
      isMobile: boolean,
      width: number,
      scrollbar: number
} => (INITIAL_STATE);

export const mutations = {
      set(state: any) {
            if (document === undefined) {
                  state = INITIAL_STATE
                  return
            }
            state.width = document.documentElement.clientWidth
            state.isMobile = state.width < MOBILE_WIDTH
            const outer: any = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.overflow = 'scroll'; // forcing scrollbar to appear
            outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
            document.body.appendChild(outer);
            const inner = document.createElement('div');
            outer.appendChild(inner);

            state.scrollbar = (outer.offsetWidth - inner.offsetWidth);

            outer.parentNode.removeChild(outer);
      }
}