<template>
  <div class="user-account-box">
    <div class="setting-header">
      <h3>パスワード変更</h3>
    </div>
    <form @submit.prevent="updatePassword" class="setting-lists">
      <div class="setting-list">
        <input type="password" v-model="passwordEdit.current_password" placeholder="現在のパスワード" required>
      </div>
      <div class="setting-list">
        <input type="password" v-model="passwordEdit.password" placeholder="新しいパスワード" required>
      </div>
      <div class="setting-list">
        <input type="password" v-model="passwordEdit.password_confirmation" placeholder="パスワードの確認" required>
      </div>
      <div class="setting-list submit">
        <input type="submit" value="パスワード更新" class="btn">
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapMutations } from 'vuex'

  export default {
    name: 'UserPasswordEditForm',

    data: function () {
      return {
        passwordEdit: {},
      }
    },

    methods: {
      ...mapMutations([
        'setErrors'
      ]),

      async updatePassword () {
        if (window.sessionStorage.getItem('isGuestUser')) {
          this.setErrors(['ゲストユーザーの変更はできません'])
          return
        }
        let [response, errors] = await this.handle(axios.put('/api/v1/users/password', this.passwordEdit))
        if (errors) {
          this.setErrors(errors)
        }
        else {
          location.pathname = '/users/settings/account'
        }
      }
    }
  }
</script>
