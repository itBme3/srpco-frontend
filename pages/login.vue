<template>
  <div class="login">

    <Form
      :schema="formSchema"
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
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "required": [
          "email", "password"
        ],
        "additionalProperties": false,
        "properties": {
          "email": {
            "type": "string",
            "title": "Email",
            "minLength": 1,
            "attrs": {
              "type": "email",
              "placeholder": "email..."
            }
          },
          "password": {
            "type": "string",
            "title": "Password",
            "minLength": 1,
            "attrs": {
              "type": "password",
              "placeholder": "password..."
            }
          },
        }
      }
    }
  },
  mounted () {
    this.loaded = true
    console.log({ sessionStorage: this.$store.state.sessionStorage })
  },
  methods: {
    loginUser ({ email, password }) {
      console.log({
        post: this.$axios.post,
        path: `${process.env.apiUrl}/api/auth/local`
      })
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
