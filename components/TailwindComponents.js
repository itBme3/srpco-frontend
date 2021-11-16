import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import { TInput, TButton } from 'vue-tailwind/dist/components'

const settings = {
  BaseInput: {
    component: TInput,
    props: {
      fixedClasses:
        'hover:shadow-lg rounded active:shadow-md focus:shadow-md block w-full px-3 py-2 transition border border-gray-700 border-opacity-10 duration-100 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ring-non outline-none focus:border-0 focus:outline-none focus:ring-none, active:border-0 active:outline-none active:ring-none',
      classes: 'text-gray-700 placeholder-gray-400',
      placeholder: '...',
      variants: {
        dark:
          'bg-gray-900 hover:bg-gray-800 active:bg-gray-800 focus:bg-gray-800 text-gray-100 placeholder-gray-300'
      }
    }
  },
  't-button': {
    component: TButton,
    props: {
      fixedClasses: 'block px-4 py-2 rounded transition duration-100 ease-in-out focus:border-blue-500 focus:ring-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'bg-gray-100 text-gray-700 hover:bg-gray-800 hover:text-white font-semibold',
      variants: [].reduce((acc, key) => {
        const vals = {
          bordered: 'text-gray-800 bg-transparent border-gray-800 border border-transparent shadow-sm hover:bg-gray-800 hover:text-white active:text-gray-200'
        }
        return { ...acc, [key]: vals[key] }
      }, {})
    }
  }
}

Vue.use(VueTailwind, settings)
export default Vue.extend({})
