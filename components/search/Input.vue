<template>
  <div :class="'block w-full p-0 rounded focus-within:shadow-lg' + !!classes.wrapper && Array.isArray(classes.wrapper) ? ' ' + classes.wrapper.join(' ') : ''">
    <InputBase
      v-model="searchValue"
      type="'search'"
      :autocomplete="autocomplete"
      :classes="classes"
      :fixed-classes="fixedClasses"
      :placeholder="placeholder"
      :tabindex="tabindex"
      :name="name"
      :variant="variant"
      :focused="focusInput"
      @input="$emit('input', $event)"
    />
    <button
      class="px-3 py-2 w-auto h-auto flex items-center content-center"
      @click="searchValue.length > 0 ? $emit('clear', '') : focusInput = true;
      searchValue.length > 0 && !!!focusInput ? searchValue = '' : ''
      "
    >
      <Icon
        :icon-name="searchValue.length > 0 ? 'close' : 'search'"
        class="m-auto"
      />
    </button>
  </div>
</template>

<script lang="ts">

enum SearchInputVariant {
  DEFAULT = 'default',
  GLOBAL = 'global',
  SMALL = 'small',
}

export default {
  props: {
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
    search: {
      type: String,
      default: ''
    },
    classes: {
      type: Object as () => { [key:string]: string[] },
      default () {
        return {
          wrapper: []
        }
      }
    }
  },
  data ({ _props }:any) {
    return {
      focusInput: false,
      fixedClasses: 'border-0 ring-non outline-none focus:border-0 focus:outline-none focus:ring-none, active:border-0 active:outline-none active:ring-none',
      searchValue: _props?.search?.length > 0 ? _props.search : ''
    }
  },
  watch: {
    '$route.query' (e:any) {
      return e
    }
  },
  methods: {
    updateSearch (val:string) {
      return val
    }
    // searchValueFromQuery () {
    //   this.$data.searchValue = typeof this.$route?.query?.q === 'string' && this.$route?.query?.q?.length > 0 ? this.$route.query.q : ''
    // }
  }
}
</script>
