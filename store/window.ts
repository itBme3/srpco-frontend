

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
                              return 'edge';
                        case /OPR|Opera/.test(userAgent) && isOpera():
                              return 'opera';
                        case /CriOS/.test(userAgent):
                        case /Chrome/.test(userAgent) && vendor === GOOGLE_VENDOR_NAME && isChromium():
                              return 'chrome';
                        case /Vivaldi/.test(userAgent):
                              return 'vivaldi';
                        case /YaBrowser/.test(userAgent):
                              return 'yandex';
                        case /Firefox|FxiOS/.test(userAgent):
                              return 'firefox';
                        case /Safari/.test(userAgent):
                              return 'safari';
                        case /MSIE|Trident/.test(userAgent):
                              return 'ie';
                        default:
                              return 'unknown';
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