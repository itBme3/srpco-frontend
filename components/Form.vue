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
      @submit="submit"
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
    submitCallback: {
      type: [Function, null],
      default: null
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
    },
    toBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    async submit (e) {
      e.preventDefault();
      this.formState = 'sending'
      try {
        const model = JSON.parse(JSON.stringify(this.formModel));
        if (Object.keys(model).includes('file')) {
          const file = this.$refs.form.querySelector('input[type="file"]').files[0];
          const maxSize = 1000000 * 2; // 2mb
          if (file.size > maxSize) {
            this.formState = 'error';
            this.errorMessage = 'File exceeds max file size (2MB).';
            return alert('File exceeds max file size (2MB).');
          }
          const fileBase64 = await this.toBase64(file);
          model.file = fileBase64;
        }
        let res = null;
        if ([null, undefined].includes(this.submitCallback)) {
          res = await this.$axios.post(`${process.env.apiUrl}/api/email-contact`, model)
          if (res.error?.length) {
            this.formState = 'error';
            this.errorMessage = `<h2>Error</h2><p>${res.error}</p>`
            return this.$emit('error', res.error)
          }
        } else {
          const submitted = this.submitCallback(model);
          res = submitted?.then ? await submitted : submitted;
        }
        this.formState = 'success';
        this.$emit('success', model)
        if (this.successRedirect?.indexOf('/') === 0) {
          return this.$route.push(this.successRedirect)
        }
      } catch (err) {
        this.formState = 'error';
        this.errorMessage = 'Error sending.'
        this.$emit('error', this.errorMessage)
        console.error(err)
      }
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
