/* eslint-disable quote-props */

const colors = require('tailwindcss/colors')
require('dotenv').config()
const enablePurge = process.env.ENABLE_PURGE || false

const COLORS = {
  'red-50': '#FEEEEF',
  'red-100': '#FEDDDF',
  'red-200': '#FDBCBF',
  'red-300': '#FC8B90',
  'red-400': '#EF5F65',
  'red-500': '#F43F5E',
  red: '#F43F5E',
  'red-600': '#E11D48',
  'red-700': '#BE123C',
  'red-800': '#520619',
  'red-900': '#36020F',
  'red-srp': '#ed1b24',
  'orange-50': '#FEE8E3',
  'orange-100': '#FDD2C7',
  'orange-200': '#FCBBAC',
  'orange-300': '#FBA590',
  'orange-400': '#FA8F75',
  'orange-500': '#ED7B51',
  orange: '#ED7B51',
  'orange-600': '#DE5725',
  'orange-700': '#A32C00',
  'orange-800': '#5D1900',
  'orange-900': '#391102',
  'yellow-50': '#FFFDF0',
  'yellow-100': '#FFF9C6',
  'yellow-200': '#FFEEA2',
  'yellow-300': '#FDE682',
  'yellow-400': '#F8CD5C',
  'yellow-500': '#FCC022',
  yellow: '#FCC022',
  'yellow-600': '#D6A80F',
  'yellow-700': '#865903',
  'yellow-800': '#4E3400',
  'yellow-900': '#2F2000',
  'green-50': colors.green['50'],
  'green-100': colors.green['100'],
  'green-200': colors.green['200'],
  'green-300': colors.green['300'],
  'green-400': colors.green['400'],
  'green-500': colors.green['500'],
  green: colors.green['400'],
  'green-600': colors.green['600'],
  'green-700': colors.green['700'],
  'green-800': colors.green['800'],
  'green-900': colors.green['900'],
  'cyan-50': '#E2FFFE',
  'cyan-100': '#BEFFFD',
  'cyan-200': '#97FDF9',
  'cyan-300': '#75F7F7',
  'cyan-400': '#63E4EF',
  'cyan-500': '#1BDCED',
  cyan: '#1BDCED',
  'cyan-600': '#37B0BA',
  'cyan-700': '#248B93',
  'cyan-800': '#14646A',
  'cyan-900': '#063438',
  'blue-50': colors.blue['50'],
  'blue-100': colors.blue['100'],
  'blue-200': colors.blue['200'],
  'blue-300': colors.blue['300'],
  'blue-400': colors.blue['400'],
  'blue-500': colors.blue['500'],
  blue: colors.blue['500'],
  'blue-600': colors.blue['600'],
  'blue-700': colors.blue['700'],
  'blue-800': colors.blue['800'],
  'blue-900': colors.blue['900'],
  'purple-50': '#FAF5FF',
  'purple-100': '#F3E8FF',
  'purple-200': '#E9D5FF',
  'purple-300': '#D8B4FE',
  'purple-400': '#C084FC',
  'purple-500': '#A855F7',
  purple: '#A855F7',
  'purple-600': '#7322E0',
  'purple-700': '#51219F',
  'purple-800': '#2C036F',
  'purple-900': '#19023E'
}

const minHeight = {
  '0': '0px',
  'px': '1px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem'
}
const sizingSpacingValues = Object.keys(minHeight)
const spacings = ['p', 'm'].map(k => `${k},${k}x,${k}y,${k}l,${k}r,${k}b`).join(',').split(',')
const widthHeight = [ 'w', 'max-w', 'min-w', 'w', 'max-w', 'min-w']
const widthHeightSizes = ['0','none','xs','sm','md','lg','xl','2xl','3xl','4xl','5xl','6xl','7xl','full','min','max','fit','prose','screen-sm','screen-md','screen-lg','screen-xl','screen-2xl']
const breakpoints = ['', 'xs', 'sm', 'md', 'lg', 'xl']
const gridCols = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const opacities = ['0','5','10','20','25','30','40','50','60','70','75','80','90','95','100']
module.exports = {
  prefix: '',
  important: true,
  mode: 'jit',
  purge: {
    enabled: true,
    content: [
      'components/*.{vue,js,ts}',
      'components/**/*.{vue,js,ts}',
      'layouts/*.vue',
      'layouts/**/*.vue',
      'pages/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.{js,ts}',
      'assets/**/*.{scss,css}',
      'nuxt.config.{js,ts}',
      'tailwind.config.js',
      'node_modules/vue-tailwind/dist/*.js'
    ],
    safelist: [
      ...Object.keys(COLORS).map(k => `bg-${k}`),
      ...Object.keys(COLORS).map(k => `text-${k}`),
      ...widthHeight.reduce((acc, k) => {
        return breakpoints.reduce((acc1, breakpoint) => 
          [...acc1, ...widthHeightSizes.map(size => `${breakpoint}${!!breakpoint.length ? ':' : '' }${k}-${size}`)]
        , acc)
      }, []),
      ...gridCols.reduce((acc, val) => {
        return [...acc, ...breakpoints.reduce((_acc, breakpoint) => {
          return [..._acc, `${breakpoint}${breakpoint.length > 0 ? ':col-span-' : 'col-span-'}${val}`]
        }, acc)]
      }, []),
      ...opacities.reduce((acc, val) => {
        return [...acc, `opacity-${val}`, ...['bg', 'text', 'border'].map(t => `${t}-opacity-${val}`)]
      }, []),
      ...spacings.reduce((acc, k) => {
        return [...acc, ...sizingSpacingValues.map(v => `${k}-${v}`)]
      }, []),
      'bg-srp-red',
      'text-srp-red',
      'mix-blend-multiply',
      'transition',
      'duration-1000',
      'transform',
      'scale-95',
      'scale-98',
      'ramp-in',
      'sm:col-span-4', 'md:col-span-4', 'lg:col-span-4',
      'text-left', 'text-right', 'text-center', 'text-base', 'text-sm', 'text-xs', 'text-tiny', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl',
      'sm:text-left', 'sm:text-right', 'sm:text-center', 'sm:text-base', 'sm:text-sm', 'sm:text-xs', 'sm:text-tiny', 'sm:text-base', 'sm:text-lg', 'sm:text-xl', 'sm:text-2xl', 'sm:text-3xl', 'sm:text-4xl', 'sm:text-5xl', 'sm:text-6xl',
      'md:text-left', 'md:text-right', 'md:text-center', 'md:text-base', 'md:text-sm', 'md:text-xs', 'md:text-tiny', 'md:text-base', 'md:text-lg', 'md:text-xl', 'md:text-2xl', 'md:text-3xl', 'md:text-4xl', 'md:text-5xl', 'md:text-6xl',
      'lg:text-left', 'lg:text-right', 'lg:text-center', 'lg:text-base', 'lg:text-sm', 'lg:text-xs', 'lg:text-tiny', 'lg:text-base', 'lg:text-lg', 'lg:text-xl', 'lg:text-2xl', 'lg:text-3xl', 'lg:text-4xl', 'lg:text-5xl', 'lg:text-6xl',
      'xl:text-left', 'xl:text-right', 'xl:text-center', 'xl:text-base', 'xl:text-sm', 'xl:text-xs', 'xl:text-tiny', 'xl:text-base', 'xl:text-lg', 'xl:text-xl', 'xl:text-2xl', 'xl:text-3xl', 'xl:text-4xl', 'xl:text-5xl', 'xl:text-6xl',
      'p-5', 'text-cyan-900'
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontSize: {
<<<<<<< HEAD
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
=======
      xs: '.75rem',
      tiny: '.875rem',
      sm: '1rem',
      base: '1.125rem',
      lg: '1.25rem',
      xl: '1.33rem',
>>>>>>> 6c9fe9dcdef8a708948f8a0b5e0c441b147a44f9
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    zIndex: (() => {
      const obj = { 1: '1', 0: '0', 999: '999', 9999: '9999', 99999: '99999', 999999: '999999' }
      for (let i = 0; i < 11; i++) { obj[`${i * 10}`] = `${i * 10}` }
      return obj
    })(),
    extend: {
      fontFamily: {
<<<<<<< HEAD
        sans: ['work-sans', 'sans-serif'],
        // condensed: ['mr-eaves-xl-sans-narrow', 'sans-serif'],
=======
        sans: ['mr-eaves-xl-sans', 'sans-serif'],
        condensed: ['mr-eaves-xl-sans-condensed', 'sans-serif'],
>>>>>>> 6c9fe9dcdef8a708948f8a0b5e0c441b147a44f9
        display: ['adelle-sans', 'sans-serif']
      },
      screens: {
        xs: '480px'
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        ...COLORS,
        black: COLORS.black,
        white: COLORS.white,
        gray: COLORS.coolGray,
        'srp-red': '#ed1b24'
      },
      opacity: {
        '3': '.03',
        '2': '.02',
        '025': '.025',
        '1': '.01',
        '013': '.013'
      },
      scale: {
        '70': '.7',
        '80': '.8',
        '98': '.98',
        '97': '.97',
        '103': '1.03'
      },
      translate: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%'
      },
      width: {
        '150': '150%',
        '200': '200%'
      },
      minWidth: {
        '0': '0',
        ...minHeight,
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%'
      },
      minHeight,
      maxWidth: {
        'site-sm': '960px',
        'site-md': '1080px',
        'site-lg': '1200px',
        'site-xl': '1400px'
      },
      rounded: {
        xs: '.03em',
        sm: '.13em'
      },
      transitionTimingFunction: {
        'quick-in': 'cubic-bezier(0,.66,.11,1.01)',
        'ramp-in': 'cubic-bezier(.91,-0.06,.88,.34)'
      },
      keyframes: {
        'fade-in-down': {
          '0%': { display: 'none', transform: 'translateY(-100%)', opacity: 0 },
          '1%': { display: 'block', transform: 'translateY(-100%)', opacity: 0 },
          '70%': { display: 'block', transform: 'translateY(-30%)', opacity: 0.3 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down .2s quick-in'
      }
    }
  },
  variants: {
    gridColumn: ['responsive'],
    gridRow: ['responsive'],
    extend: {
      mixBlendMode: ['hover'],
      zIndex: ['hover'],
      bgOpacity: ['hover', 'active', 'focus'],
      scale: ['hover'],
      order: ['responsive']
    }
  }
}
