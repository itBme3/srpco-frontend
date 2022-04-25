<template>
  <div class="page contact">
    <h1 class="text-center">Contact Us</h1>
    <Form
      class="mx-auto max-w-lg"
      :schema="formSchema"
      :model="model"
      success-redirec="/gaskets"
      @submit="submit"
    />
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
        message: ''
      }
    }
  },
  methods: {
    successfulSubmit (data) {
      console.log(data)
    },
    submitCallback (data) {
      return data;
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
