import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import {
  TInput
} from 'vue-tailwind/dist/components'

const settings = {
  BaseInput: {
    component: TInput,
    props: {
      fixedClasses: 'hover:shadow-lg rounded active:shadow-md focus:shadow-md block w-full px-3 py-2 transition border border-gray-700 border-opacity-10 duration-100 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ring-non outline-none focus:border-0 focus:outline-none focus:ring-none, active:border-0 active:outline-none active:ring-none',
      classes: 'text-gray-700 placeholder-gray-400',
      placeholder: '...',
      variants: {
        dark: 'bg-gray-900 hover:bg-gray-800 active:bg-gray-800 focus:bg-gray-800 text-gray-100 placeholder-gray-300'
      }
    }
  }
}

Vue.use(VueTailwind, settings)
