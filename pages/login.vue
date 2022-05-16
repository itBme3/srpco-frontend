<template>
  <div class="login">
    <template v-if="user && user.email">
      <p class="mt-12 text-center">
        <small class="opacity-30 block mb-2">logged in:</small> {{ user.email }}
      </p>
      <gButton
        class="bg-gray-900 hover:bg-gray-800 mt-10 mx-auto w-auto px-3 text-gray-200"
        @click="logoutUser"
      >
        logout
      </gButton>
    </template>
    <template v-else>
      <Loading
        v-if="formState === 'loading'"
        class="mx-auto" />
      <Form
        v-else
        :schema="formSchema"
        :model="model"
        button-text="Login"
        class="max-w-sm mx-auto"
        @submit="loginUser"
      />
    </template>

  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      formState: 'ready',
      formSchema: {
        fields: [
          {
            type: 'input',
            inputType: 'email',
            label: 'Email',
            model: 'email',
            required: true
          },
          {
            type: 'input',
            inputType: 'password',
            label: 'Password',
            model: 'password',
            required: true
          }
        ]
      },
      model: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.sessionStorage?.user || null
    }
  },
  methods: {
    loginUser ({ email, password }) {
      this.formState = 'loading'
      return this.$axios.post(`${process.env.apiUrl}/api/auth/local`, {
        identifier: email,
        password,
      })
        .then(response => {
          const { user, jwt } = response.data;
          return this.$axios.get(`${process.env.apiUrl}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${response.data.jwt}`
            }
          }).then(res => {
            this.formState = 'ready'
            return this.$store.commit('sessionStorage/setUser', { user, jwt, isAdmin: res?.data?.role?.name === 'Admin' });
          }).catch(err => {
            this.formState = 'ready'
            alert(err.message)
          })
        })
        .catch(error => {
          this.formState = 'ready'
          alert('An error occurred:', error);
        });
    },
    logoutUser () {
      this.$store.commit('sessionStorage/resetUser')
    }
  }
})
</script>
