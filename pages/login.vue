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
    console.log({ $axios: this.$axios, path: `${process.env.apiUrl}/auth/local`, email: 'bobby@gigfirm.com', password: 'Ux52Rmpg*W$Vat&' })
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
          console.log('User profile', response.data.user);
          console.log('User token', response.data.jwt);
          sessionStorage.setItem('jwt', response.data.jwt);
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
          await this.$axios.get(`${process.env.apiUrl}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${response.data.jwt}`
            }
          }).then(res => {
            console.log(res.data);
            return sessionStorage.setItem('isAdmin', res?.data?.role?.name === 'Admin');
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
