<template>
  <div :class="{ 'block relative w-full p-0 rounded focus-within:shadow-lg': true, [classes.wrapper.join(' ')]: !!classes.wrapper && Array.isArray(classes.wrapper) }">
    <!-- <client-only> -->
    <gInput
      ref="searchInput"
      v-model="searchValue"
      v-debounce:400ms="updateSearchValue"
      :debounce-events="['input']"
      type="'search'"
      :autocomplete="autocomplete"
      :classes="classes"
      :fixed-classes="fixedClasses"
      :placeholder="placeholder"
      :tabindex="tabindex"
      :name="name"
      :variant="variant"
      @input="$emit('input', $event)"
      @focus="(e) => $emit('focus', e)"
    />
    <gButton
      classes="absolute top-[50%] right-0 px-3 py-2 w-auto h-auto flex items-center content-center transform -translate-y-1/2"
      @click="inputButtonClicked"
    >
      <Icon
        :icon-name="searchValue.length > 0 ? 'close' : 'search'"
        class="m-auto"
      />
    </gButton>
    <!-- </client-only> -->
  </div>
</template>

<script lang="js">

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
      fixedClasses: 'border-0 ring-non outline-none focus:border-0 focus:outline-none focus:ring-none, active:border-0 active:outline-none active:ring-none',
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
        this.searchValue = val
      }
    }
  },
  methods: {
    updateSearchValue (val) {
      this.searchValue = val
      this.$emit('search', val)
    },
    focusInput () {
      if (![null, undefined].includes(this.$refs) && ![null, undefined].includes(this.$refs.searchInput)) {
        this.$refs.searchInput.$el.focus()
      }
    },
    inputButtonClicked () {
      if (this.searchValue.length > 0) {
        this.$emit('clear', '')
        this.searchValue = ''
      }
      this.focusInput()
    }
    // searchValueFromQuery () {
    //   this.$data.searchValue = typeof this.$route?.query?.q === 'string' && this.$route?.query?.q?.length > 0 ? this.$route.query.q : ''
    // }
  }
}
</script>
