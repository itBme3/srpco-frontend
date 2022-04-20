<template>
  <div :class="{ 'search-bar block relative w-full p-0 rounded focus-within:shadow-lg': true, [classes.wrapper.join(' ')]: !!classes.wrapper && Array.isArray(classes.wrapper) }">

    <gInput
      ref="searchInput"
      v-model="searchValue"
      type="text"
      class="search-input pr-[40px] rounded-md w-full bg-transparent"
      :autocomplete="autocomplete"
      :fixed-classes="fixedClasses"
      :placeholder="placeholder"
      :tabindex="tabindex"
      :name="name"
      :variant="variant"
      @input="(e) => {
        $emit('input', e);
        updateSearchValue(e);
      }"
      @focus="(e) => $emit('focus', e)"
    />
    <slot />
    <gButton
      classes="absolute top-[50%] right-0 px-3 py-2 w-auto h-auto flex items-center content-center transform -translate-y-1/2 text-gray-400"
      class="action-button"
      @click="inputButtonClicked"
    >
      <Icon
        :icon-name="!!searchValue && searchValue.length > 0 ? 'close' : 'search'"
        class="m-auto"
      />
    </gButton>

  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
export default Vue.extend({
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
      type: String,
      default: null
    },
    search: {
      type: String,
      default: ''
    },
    classes: {
      type: Object,
      default () {
        return {
          wrapper: []
        }
      }
    }
  },
  data ({ _props }) {
    return {
      fixedClasses: 'border-0 ring-non outline-none focus:border-0 focus:outline-none focus:ring-0, active:border-0 active:outline-none active:ring-0',
      searchValue: typeof this.searchValue === 'string' ? this.searchValue : _props.search
    }
  },
  watch: {
    search: {
      immediate: true,
      handler (val) {
        if (this.searchValue === val) {
          return
        }
        this.updateSearchValue(val)
      }
    }
  },
  methods: {
    updateSearchValue: _.debounce(function (val) {
      this.searchValue = val
      this.$emit('search', val)
    }, 400),
    focusInput () {
      if (![null, undefined].includes(this.$refs) && ![null, undefined].includes(this.$refs.searchInput)) {
        this.$refs.searchInput.$el.focus()
      }
    },
    inputButtonClicked () {
      if (!!this.searchValue?.length) {
        this.$emit('clear', '')
        this.searchValue = ''
      }
      this.focusInput()
    }
  }
})
</script>
