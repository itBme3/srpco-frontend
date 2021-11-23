<template>
  <div>
    <gInput
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :variant="variant"
      :tabindex="tabindex"
      :name="name"
      :focused="focused"
    />
  </div>
</template>

<script type="js">
export default {
  props: {
    autocomplete: {
      type: String,
      default: 'off'
    },
    focused: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: 'input'
    },
    placeholder: {
      type: String,
      default: '...'
    },
    variant: {
      type: String,
      default: '...'
    }
  }
}
</script>
