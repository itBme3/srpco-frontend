<template>
  <div class="page contact mx-auto max-w-lg">
    <h1 class="text-center pb-8 pt-14">Contact Us</h1>
    
    
    <template
      v-if="['ready', 'error'].includes(formState)"
    >
      <template
        v-if="formState === 'error'"
      >
      <h3 class="text-center mb-2 text-red-500">Error:</h3>
      <p v-if="errorMessage" class="text-center" >{{errorMessage}}</p>
      </template>

      <Form
        ref="form"
        class="mx-auto max-w-md rounded-md bg-gray-50 shadow-md"
        :schema="formSchema"
        :model="model"
        @submit="submit"
      />
    
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
  scrollToTop: true,

  data () {
    return {
      formSchema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'name',
            placeholder: 'Your name...',
            required: true
          },
          {
            type: 'input',
            inputType: 'email',
            label: 'Email',
            model: 'email',
            placeholder: 'Your email...',
            required: true
          },
          {
            type: 'select',
            label: 'How did your hear about SRP?',
            model: 'hearAboutUs',
            values: [
              "Google",
              "Referral",
              "Salesperson",
              "Trade Show",
              "Digital Advertisement",
              "Print Advertisement",
              "ThomasNet",
              "Current Customer",
              "Other"
            ],
            required: true
          },
          {
            type: 'input',
            inputType: 'file',
            label: 'Send file',
            model: 'file',
            placeholder: 'upload your file...',
          },
          {
            type: 'textArea',
            label: 'Message',
            model: 'message',
            placeholder: 'your message...',
            required: true
          },
        ]
      },
      model: {
        name: '',
        email: '',
        hearAboutUs: '',
        file: '',
        message: '',
      },
      formState: 'ready',
      errorMessage: null
    }
  },
  methods: {
    resetForm() {
      this.model = {
        name: '',
        email: '',
        hearAboutUs: '',
        file: '',
        message: '',
      }
      this.formState = 'ready'
      this.errorMessage = null
    },
    toBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    async submit (formModel) {
      this.formState = 'sending'
      try {
        const model = JSON.parse(JSON.stringify(formModel));
        const file = this.$refs.form.$el.querySelector('input[type="file"]').files[0];
        if (file) {
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
        res = await this.$axios.post(`${process.env.apiUrl}/api/email-contact`, model)
        if (res.error?.length) {
          this.formState = 'error';
          this.errorMessage = `<h2>Error</h2><p>${res.error}</p>`
          return this.$emit('error', res.error)
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
.form {
  form {
    > div {
      @apply p-1;
      input,
      textarea {
        @apply bg-transparent hover:bg-gray-800 focus:bg-gray-800 focus:ring-gray-800 border-gray-800 text-gray-200 #{!important};
      }
    }
  }
}
</style>
