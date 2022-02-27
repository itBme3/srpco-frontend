<template>
  <div class="page contact">
    <h1 class="text-center">Contact Us</h1>
    <Form
      class="mx-auto max-w-lg"
      :schema="formSchema"
      :model="model"
      @submit="formSubmit"
    />
  </div>
</template>

<script>
export default {
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
    formSubmit (data) {
      console.log({ data })
    }
  }
}
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
