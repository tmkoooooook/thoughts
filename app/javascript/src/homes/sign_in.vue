<template>
  <div class="form-box">
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
          <input type="text" v-model="user.user_id" autofocus>
        </div>
        <div class="form-field">
          <label for="">パスワード</label>
          <input type="text" v-model="user.password">
        </div>
        <div class="actions">
          <input type="submit" value="ログイン" class="btn btn-light">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import 'thoughts_logo_005163.png'
  import { mapMutations } from 'vuex'


  export default {
    name: 'signIn',

    data: function () {
      return {
        user: {
          user_id: '',
          password: ''
        }
      }
    },

    methods: {
      ...mapMutations([
        'setUserSessionTokens'
      ]),

      async signInUser () {
        const response = await this.axios.post('/api/v1/users/sign_in', this.user)
        this.setUserSessionTokens(response)
        window.location.href = '/users'
      }
    }
  }
</script>
