<template>
<div>
		<Form
			v-if="block"
			ref="form"
			:schema="block.formSchema"
			:button-text="block.submitButton"
			:button-classes="buttonClasses"
			:success-message="block.successMessage"
			:success-redirect="block.successRedirect"
			@submit="submit"
		/>
  </div>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  scrollToTop: true,
	props: {
		block: {
			type: Object,
			default: () => null
		}
  },
  data () {
    return {
      captchaToken: null
    }  
  },
	computed: {
		buttonClasses () {
			return this.block?.blockSettings?.classes?.button || ''
		}
	},
  methods: {
		// resetForm () {
		// 	console.log(this.$refs.form.componentInstance)
		// 	this.$refs.form.componentInstance.resetForm()
		// },
    
    toBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    async getCaptchaToken () {
      if (!this.$refs.form?.captcha || !this.$refs.form?.getCaptchaToken) {
        this.captchaToken = null;
      } else {
        this.captchaToken = await this.$refs.form.getCaptchaToken();
      }
      return this.captchaToken
    },
    async submit (formModel) {
      const { captcha = true } = this.block?.advancedSettings || {}
      if (captcha) {
        this.captchaToken = await this.getCaptchaToken();
        if (!this.captchaToken && captcha) {
          return;
        }
      }
      this.$refs.form.formState = 'sending'
			try {
        const model = JSON.parse(JSON.stringify(formModel));
        model.token = this.captchaToken;
        model.captcha = captcha;
        const fileInput = this.$refs.form.$el.querySelector('input[type="file"]');
        if (fileInput) {
          const file = fileInput.files[0];
          const maxSize = 1000000 * 2; // 2mb
          if (file.size > maxSize) {
            this.$refs.form.formState = 'error';
            this.$refs.form.errorMessage = 'error';
            return alert('File exceeds max file size (2MB).');
          }
          const fileBase64 = await this.toBase64(file);
          model.file = fileBase64;
        }
        let res = null;
        res = await this.$axios.post(`${process.env.apiUrl}/api/email-contact`, model)
        if (res.error?.length) {
          this.$refs.form.formState = 'error';
          this.$refs.form.errorMessage = `<h2>Error</h2><p>${res.error}</p>`
          return this.$emit('error', res.error)
        }
        this.$refs.form.formState = 'success';
        this.$emit('success', model)
        if (this.successRedirect?.indexOf('/') === 0) {
          return this.$route.push(this.successRedirect)
        }
      } catch (err) {
        this.$refs.form.formState = 'error';
        this.$refs.form.errorMessage = 'Error sending.'
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