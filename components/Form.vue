<template>
  <div
    class="form"
    v-if="schema !== null && model !== null"
  >
    <form @submit="submit">
      <vue-form-generator
        :schema="schema"
        :model="model"
        :options="formOptions"
      ></vue-form-generator>
      <gButton
        type="submit"
        :class="{
          [buttonClasses]: typeof buttonClasses === 'string' && buttonClasses.length > 0
        }"
      >
        {{ buttonText }}
      </gButton>
    </form>
  </div>
</template>

<script>

export default {
  props: {
    schema: {
      type: Object,
      default: () => null
    },
    model: {
      type: Object,
      default: () => null
    },
    buttonText: {
      type: String,
      default: 'Submit'
    },
    buttonClasses: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      }
    }
  },
  methods: {
    submit (e) {
      e.preventDefault();
      console.log(JSON.stringify(this.model))
      this.$emit('submit', this.model)
    }
  }
}
</script>

<style lang="scss">
input {
  &[class*="focus:ring-gray-500"] {
    --tw-ring-color: #ccc;
  }
}
.form {
  input,
  textarea,
  select {
    @apply bg-transparent text-base text-gray-300 border-2 border-gray-700 focus:ring-gray-600 py-3 px-4 focus:outline-none focus:border-gray-700 focus:bg-gray-800 hover:bg-gray-800 #{!important};
  }
  button {
    &[type="submit"] {
      @apply bg-green-500 text-green-900 hover:bg-green-400 px-4 shadow hover:shadow-lg ml-0 mr-auto w-auto;
    }
  }
}
</style>
