<template>
  <div class="form-box">
    <ErrorMessages :sign="true"/>
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
          <input type="text" name="name" v-model="user.name" autofocus>
        </div>
        <div class="form-field">
          <label for="">Eメール</label>
          <input type="text" name="email" v-model="user.email">
        </div>
        <div class="form-field">
          <label for="">ユーザーID</label>
          <input type="text" name="user_id" v-model="user.user_id">
        </div>
        <div class="form-field">
          <label for="">パスワード</label>
          <input type="password" name="password" v-model="user.password">
        </div>
        <div class="actions">
          <input type="submit" value="新規登録" class="btn btn-light">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import ErrorMessages from '../parts/error_messages.vue'
  import { mapMutations } from 'vuex'

  export default {
    name: 'signUp',

    data: function () {
      return {
        user: {},
      }
    },

    components: {
      ErrorMessages
    },

    methods: {
      ...mapMutations([
        'setErrors',
        'clearErrors'
      ]),

      async signUpUser () {
        let [user, errors] = await this.handle(axios.post('/api/v1/users', this.user))
        if (errors) {
          this.setErrors(errors)
        }
      },
    },

    beforeRouteLeave (to, from, next) {
      this.clearErrors()
      next()
    }
  }
</script>
