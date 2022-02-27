<template>
  <div class="login">

    <Form
      :schema="formSchema"
      :model="model"
      button-text="Login"
      v-if="loaded"
      class="max-w-sm mx-auto"
      @submit="loginUser"
    />

  </div>
</template>

<script>
export default {
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
    console.log({ sessionStorage: this.$store.state.sessionStorage })
  },
  methods: {
    loginUser ({ email, password }) {
      return this.$axios.post(`${process.env.apiUrl}/api/auth/local`, {
        identifier: email,
        password: password,
      })
        .then(async response => {
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
            console.log(res.data);
            return this.$store.commit('sessionStorage/setUser', { user, jwt, isAdmin: res?.data?.role?.name === 'Admin' });
            // return sessionStorage.setItem('isAdmin', res?.data?.role?.name === 'Admin');
          }).catch(err => alert(err.message))
        })
        .catch(error => {
          alert('An error occurred:', error);
          return
        });
    }
  }
}
</script>
