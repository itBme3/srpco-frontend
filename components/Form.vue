<template>
  <keep-alive>
    <form
      v-if="schema !== null && formModel !== null"
        ref="form"
        class="form"
        :class="{ 'hidden': ['success', 'sending'].includes(formState) }"
        @submit="(e) => {
          e.preventDefault()
          $emit('submit', formModel)
        }"
      >
          <vue-form-generator
            :schema="schema"
            :model="formModel"
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
  </keep-alive>
</template>

<script>

import Vue from 'vue'
export default Vue.extend({
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
      default: 'Send'
    },
    buttonClasses: {
      type: String,
      default: ''
    },
    successMessage: {
      type: String,
      default: '<h2>Success!</h2> <p>Your message has been successfully sent.</p>'
    },
    successRedirect: {
      type: String,
      default: null
    },
  },
  data () {
    return {
      formState: 'ready', /* ready, sending, error, success */
      errorMessage: null,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      },
      initialModel: JSON.parse(JSON.stringify(this.model)),
      formModel: JSON.parse(JSON.stringify({...this.model, file: ''}))
    }
  }
})
</script>

<style lang="scss">
input {
  &[class*='focus:ring-gray-500'] {
    --tw-ring-color: #ccc;
  }
}
.form {
  @apply text-gray-800;
  input,
  textarea,
  select {
    @apply bg-transparent text-base border-2 border-transparent border-b-gray-700 focus:ring-gray-600 py-3 px-0 focus:px-4 hover:px-2 transition-all ease-quick-in focus:outline-none focus:border-gray-700 hover:bg-gray-50 focus:bg-gray-50 #{!important};
  }
  button {
    &[type='submit'] {
      @apply bg-green-500 text-green-900 hover:bg-green-400 px-4 shadow hover:shadow-lg mt-2 ml-0 mr-auto w-auto text-lg uppercase font-bold min-w-[140px];
    }
  }
}
</style>
