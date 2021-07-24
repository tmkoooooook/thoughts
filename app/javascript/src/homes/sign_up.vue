<template>
  <div class="form-box">
    <div class="image-wrapper">
      <router-link :to="{ name: 'home' }">
        <img src="~thoughts_logo_white.png" alt="thoughts_logo">
      </router-link>
    </div>
    <div class="form-wrapper">
      <h2>サインアップ</h2>
      <form @submit.prevent="signUpUser">
        <div class="form-field">
          <label for="">名前</label>
          <input type="text" v-model="user.name" autofocus>
        </div>
        <div class="form-field">
          <label for="">Eメール</label>
          <input type="text" v-model="user.email">
        </div>
        <div class="form-field">
          <label for="">ユーザーID</label>
          <input type="text" v-model="user.user_id">
        </div>
        <div class="form-field">
          <label for="">パスワード</label>
          <input type="text" v-model="user.password">
        </div>
        <div class="actions">
          <input type="submit" value="新規登録" class="btn btn-light">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'signUp',

    data: function () {
      return {
        user: {}
      }
    },

    methods: {
      ...mapMutations([
        'setUserSessionTokens'
      ]),

      async signUpUser () {
        const response = await this.axios.post('/api/v1/users', this.user)
      }
    }
  }
</script>
