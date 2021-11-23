import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import { TInput, TButton, TTag } from 'vue-tailwind/dist/components'

const settings = {
  gInput: {
    component: TInput,
    props: {
      fixedClasses:
        'hover:shadow-lg rounded active:shadow-md focus:shadow-md block w-full px-3 py-2 transition border border-gray-700 border-opacity-10 duration-100 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ring-non outline-none focus:border-0 focus:outline-none focus:ring-none, active:border-0 active:outline-none active:ring-none',
      classes: 'text-gray-700 placeholder-gray-400',
      placeholder: '...',
      variants: {
        dark: 'bg-gray-800 hover:bg-gray-700 active:bg-gray-700 focus:bg-gray-700 text-gray-100 placeholder-gray-300',
        header: 'bg-gray-800 bg-opacity-50 w-full py-2 px-3 hover:bg-opacity-100 active:bg-opacity-100 hover:shadow-lg active:shadow-md focus:shadow-sm text-gray-100 placeholder-gray-600'
      }
    }
  },
  gButton: {
    component: TButton,
    props: {
      fixedClasses: 'block px-4 py-2 rounded transition duration-100 ease-in-out focus:border-transparent focus:ring-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed tracking-wide',
      classes: 'bg-gray-100 text-gray-700 hover:bg-gray-800 hover:text-white',
      variants: {
        secondary: 'bg-gray-500 bg-opacity-5 hover:bg-opacity-10 text-gray-700 hover:bg-gray-500 hover:text-800 font-semibold',
        light: 'bg-gray-100 bg-opacity-90 text-gray-700 hover:text-800 hover:shadow-lg hover:bg-opacity-100 hover:bg-white font-semibold',
        bordered: 'text-gray-800 bg-transparent border-gray-800 border border-gray-700 hover:bg-gray-700 shadow-sm hover:bg-gray-800'
      }
    }
  },
  't-tag': {
    component: TTag,
    props: {
      fixedClasses: 'rounded px-2 py-1 bg-gray-900 bg-opacity-5 text-gray-700 hover:bg-opacity-10 inline-block w-auto',
      classes: '',
      variants: {
        title: 'text-2xl leading-8 font-extrabold text-gray-900 tracking-tight',
        subtitle: 'text-lg leading-6 font-medium text-gray-900',
        error: 'text-red-500',
        badge: 'inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 bg-gray-100 text-gray-800',
        avatar: 'inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 overflow-hidden leading-none text-center'
      }
    }
  }
}

Vue.use(VueTailwind, settings)
export default Vue.extend({})
