<template>
  <div
    v-if="schema !== null && formModel !== null"
    class="form"
  >

    <gButton
      v-if="formState === 'success'"
      class="w-auto mr-0 ml-auto bg-gray-800 text-gray-300"
      @click="formState = 'ready'; errorMessage = null; formModel = initialModel"
    >
      reset
    </gButton>

    <h4
      v-if="formState === 'sending'"
      class="my-6 text-center"
    >sending...</h4>

    <div
      v-if="['success', 'error'].includes(formState)"
      class="form-message p-2 rounded shadow my-6 text-center"
      :class="{
        'success bg-red-500 text-red-900': formState === 'error',
        'success bg-green-400 text-green-900': formState === 'success',
      }"
      v-html="formState === 'success' ? successMessage : errorMessage"
    />

    <form
      ref="form"
      :class="{ 'hidden': ['success', 'sending'].includes(formState) }"
      @submit="(e) => {
        e.preventDefault()
        $emit('submit', formModel)
      }"
      @change="log"
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
  </div>
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
      default: 'Submit'
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
      formModel: this.model
    }
  },
  methods: {
    log (e) {
      if (this.errorMessage?.toLowerCase()?.includes('file exceeds')) {
        if (e.target.getAttribute('type') === 'file') {
          this.formState = 'ready'
          this.errorMessage = null
        }
      } else if (this.formState === 'error') {
        this.formState = 'ready'
        this.errorMessage = null
      }
      console.log(e);
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
  input,
  textarea,
  select {
    @apply bg-transparent text-base text-gray-300 border-2 border-gray-700 focus:ring-gray-600 py-3 px-4 focus:outline-none focus:border-gray-700 focus:bg-gray-800 hover:bg-gray-800 #{!important};
  }
  button {
    &[type='submit'] {
      @apply bg-green-500 text-green-900 hover:bg-green-400 px-4 shadow hover:shadow-lg ml-0 mr-auto w-auto;
    }
  }
}
</style>
