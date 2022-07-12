<template>
  <div
      v-if="model"
       class="form-wrapper">
    <template v-if="['ready', 'error'].includes(formState)">
      <template v-if="formState === 'error'">
        <h3 class="text-center mb-2 text-red-500">Error:</h3>
        <p
          v-if="errorMessage"
           class="text-center">{{ errorMessage }}</p>
      </template>
      <keep-alive>
        <form
          v-if="schema !== null && model !== null"
          ref="form"
          class="form"
          :class="{ 'hidden': ['success', 'sending'].includes(formState) }"
          @submit="(e) => {
            e.preventDefault()
            $emit('submit', model)
          }">
          <vue-form-generator
            :schema="schema"
            :model="model"
            :options="formOptions"></vue-form-generator>
          <gButton
            type="submit"
            :class="{
              [buttonClasses]: typeof buttonClasses === 'string' && buttonClasses.length > 0
            }">
            {{ buttonText }}
          </gButton>
        </form>
      </keep-alive>
    </template>

    <template v-else-if="formState === 'sending'">
      <h3 class="text-center">Sending...</h3>
      <Loading class="mx-auto" />
    </template>
    <template v-else-if="formState === 'success'">
      <h3 class="text-center mb-2 text-green-400">Message sent</h3>
      <p class="text-center">An SRP team member will reaching out shortly.</p>
      <gButton
        class="text-sm bg-gray-800 text-gray-200 mt-8 mx-auto w-auto"
        @click="resetForm">RESET</gButton>
    </template>

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
    }
  },
  data () {
    const model = this.generateModelFromSchema()
    return {
      formState: 'ready', /* ready, sending, error, success */
      errorMessage: null,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      },
      initialModel: JSON.parse(JSON.stringify(model)),
      model: { ...model, file: '' }
    }
  },
  methods: {
    generateModelFromSchema (ignoreRouteQuery = false) {
      return this.schema?.fields?.reduce((acc, field) => {
        return {
          ...acc,
          [field.model]: !ignoreRouteQuery && field.model === 'message' && this.$route.query?.msg
            ? this.$route.query?.msg
            : ''
        }
      }, {});
    },
    resetForm () {
      this.model = this.generateModelFromSchema(true)
      this.formState = 'ready'
      this.errorMessage = null
    },
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
