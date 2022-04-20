<template>
  <div class="login">

    <Form
      v-if="loaded"
      :schema="formSchema"
      :model="model"
      button-text="Login"
      class="max-w-sm mx-auto"
      @submit="loginUser"
    />

  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      loaded: false,
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
  mounted () {
    this.loaded = true
  },
  methods: {
    loginUser ({ email, password }) {
      return this.$axios.post(`${process.env.apiUrl}/api/auth/local`, {
        identifier: email,
        password,
      })
        .then(response => {
          // console.log('User profile', response.data.user);
          // console.log('User token', response.data.jwt);
          const { user, jwt } = response.data;
          // sessionStorage.setItem('jwt', response.data.jwt);
          // sessionStorage.setItem('user', JSON.stringify(response.data.user));
          return this.$axios.get(`${process.env.apiUrl}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${response.data.jwt}`
            }
          }).then(res => {
            return this.$store.commit('sessionStorage/setUser', { user, jwt, isAdmin: res?.data?.role?.name === 'Admin' });
            // return sessionStorage.setItem('isAdmin', res?.data?.role?.name === 'Admin');
          }).catch(err => alert(err.message))
        })
        .catch(error => {
          alert('An error occurred:', error);
        });
    }
  }
})
</script>
