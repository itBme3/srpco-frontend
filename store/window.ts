

interface State {
      isMobile: boolean;
      width: number;
      scrollbar: number;
      browserName: string | null;
}

const INITIAL_STATE:State = {
      isMobile: true,
      width: 100,
      scrollbar: 0,
      browserName: null
}

const MOBILE_WIDTH = 768;

export const state = (): State => (INITIAL_STATE);

export const mutations = {
      set(state: any) {
            if (document === undefined) {
                  state = INITIAL_STATE
                  return
            }

            state.browserName = browserName()
            state.width = document.documentElement.clientWidth
            state.height = document.documentElement.clientHeight
            state.isMobile = state.width < MOBILE_WIDTH
            
            function browserName () {
                  const GOOGLE_VENDOR_NAME = 'Google Inc.';
                  function isOpera(){
                        const win:any = window || {}
                        return Boolean(win.opr);
                  }

                  function isChromium() {
                        const win:any = window || {}
                        return Boolean(win.chrome);
                  }
                  const userAgent = window.navigator.userAgent;
                  const vendor = window.navigator.vendor;
                  switch (true) {
                        case /Edge|Edg|EdgiOS/.test(userAgent):
                              return 'Edge';
                        case /OPR|Opera/.test(userAgent) && isOpera():
                              return 'Opera';
                        case /CriOS/.test(userAgent):
                        case /Chrome/.test(userAgent) && vendor === GOOGLE_VENDOR_NAME && isChromium():
                              return 'Chrome';
                        case /Vivaldi/.test(userAgent):
                              return 'Vivaldi';
                        case /YaBrowser/.test(userAgent):
                              return 'Yandex';
                        case /Firefox|FxiOS/.test(userAgent):
                              return 'Firefox';
                        case /Safari/.test(userAgent):
                              return 'Safari';
                        case /MSIE|Trident/.test(userAgent):
                              return 'Internet Explorer';
                        default:
                              return 'Unknown';
                        }
            }
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