<template>
  <div class="page contact mx-auto max-w-lg">

     
    <div class="flex flex-wrap gap-4">
      <Icon v-for="key in Object.keys(icons)" :key="key" class="fill-gray-50" :svg="true" :icon-name="key" />
    </div>



    <h1 class="text-center pb-8 pt-14">Contact Us</h1>
    
    <BlockForm
      class="mx-auto max-w-md rounded-md bg-gray-50 shadow-lg p-4 md:p-6"
      :block="{ formSchema: formSchema }"
    />

  </div>
</template>

<script>
import Vue from 'vue';
import Icons from '../components/SvgIcons';
export default Vue.extend({
  scrollToTop: true,

  data () {
    return {
      icons: Icons,
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
