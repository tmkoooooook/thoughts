<template>
  <div class="form-box">
    <ErrorMessages :errors="errors"/>
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
        errors: []
      }
    },

    components: {
      ErrorMessages
    },

    methods: {
      ...mapMutations([
        'setUserSessionTokens'
      ]),

      async signInUser () {
        let [user, errors] = await this.handle(axios.post('/api/v1/users/sign_in', this.user))
        if(errors) {
          this.errors = errors
        }
        else {
          this.setUserSessionTokens(user)
          location.pathname = '/users'
        }
      }
    }
  }
</script>
