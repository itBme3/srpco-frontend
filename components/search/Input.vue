<template>
  <div :class="'block w-full p-0 rounded focus-within:shadow-lg' + !!classes.wrapper && Array.isArray(classes.wrapper) ? ' ' + classes.wrapper.join(' ') : ''">
    <BaseInput
      type="'search'"
      :autocomplete="autocomplete"
      :classes="classes"
      :fixed-classes="fixedClasses"
      :placeholder="placeholder"
      :tabindex="tabindex"
      :name="name"
      :variant="variant"
      :variants="{
        global: {
          classes: ''
        },
        secondary: {
          classes: 'text-sm'
        }
      }"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script lang="ts">

enum SearchInputVariant {
  DEFAULT = 'default',
  GLOBAL = 'global',
  SMALL = 'small',
}

const x = {
  props: {
    classes: {
      type: [String, Object, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: 'search...'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: 'search-input'
    },
    autocomplete: {
      type: String,
      default: 'on'
    },
    variant: {
      type: String as () => SearchInputVariant,
      default: SearchInputVariant.DEFAULT
    },
    searchValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fixedClasses: 'border-0 ring-non outline-none focus:border-0 focus:outline-none focus:ring-none, active:border-0 active:outline-none active:ring-none'
    }
  },
  watch: {
    '$route.query' (e:any) {
      return e
    }
  },
  // created () {
  //   this.searchValueFromQuery()
  // },
  methods: {
    updateSearch (val:string) {
      // this.searchValue = val
      // console.log(val)
      return val
    }
    // searchValueFromQuery () {
    //   this.$data.searchValue = typeof this.$route?.query?.q === 'string' && this.$route?.query?.q?.length > 0 ? this.$route.query.q : ''
    // }
  }
}
export default { ...x }
</script>
