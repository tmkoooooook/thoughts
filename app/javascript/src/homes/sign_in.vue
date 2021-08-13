<template>
  <div class="form-box">
    <ErrorMessages :sign="true"/>
    <div class="image-wrapper">
      <router-link :to="{ name: 'home' }">
        <img src="~thoughts_logo_white.png" alt="thoughts_logo">
      </router-link>
    </div>
    <div class="form-wrapper">
      <h2>ログイン</h2>
      <form @submit.prevent="signInUser">
        <div class="form-field">
          <label for="">ユーザーID</label>
          <input type="text" name="user_id" v-model="user.user_id" autofocus>
        </div>
        <div class="form-field">
          <label for="">パスワード</label>
          <input type="text" name="password" v-model="user.password">
        </div>
        <div class="actions">
          <input type="submit" value="ログイン" class="btn btn-light">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import ErrorMessages from '../parts/error_messages.vue'
  import { mapMutations } from 'vuex'
  import axios from 'axios'

  export default {
    name: 'signIn',

    data: function () {
      return {
        user: {
          user_id: '',
          password: ''
        },
      }
    },

    components: {
      ErrorMessages
    },

    methods: {
      ...mapMutations([
        'setUserSessionTokens',
        'setErrors',
        'clearErrors'
      ]),

      async signInUser () {
        let [response, errors] = await this.handle(axios.post('/api/v1/users/sign_in', this.user))
        if (errors) {
          this.setErrors(errors)
        }
        else {
          this.setUserSessionTokens(response)
          location.pathname = '/users'
        }
      }
    },

    beforeRouteLeave (to, from, next) {
      this.clearErrors()
      next()
    }
  }
</script>
