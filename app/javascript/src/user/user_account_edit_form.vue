<template>
  <div class="user-account-box">
    <div class="setting-header">
      <h3>アカウント編集</h3>
    </div>
    <div class="setting-list">
      <UploadImage :accountImage="account.icon_image" v-model="accountEdit.icon_image"/>
    </div>
    <div class="setting-list">
      <UploadImage imageSize="header" :accountImage="account.header_image" v-model="accountEdit.header_image"/>
    </div>
    <form @submit.prevent="updateUserInfo" class="setting-lists">
      <div class="setting-list">
        <label>名前</label>
        <span>{{ account.name }}</span>
        <input type="text" name="name" v-model="accountEdit.name" autofocus>
      </div>
      <div class="setting-list">
        <label>ユーザーID</label>
        <span>{{ account.user_id }}</span>
        <input type="text" name="user_id" v-model="accountEdit.user_id">
      </div>
      <div class="setting-list">
        <label>Eメール</label>
        <span>{{ account.email }}</span>
        <input type="text" name="email" v-model="accountEdit.email">
      </div>
      <div class="setting-list">
        <input type="password" name="password" v-model="accountEdit.current_password" placeholder="現在のパスワードを入力してください" required>
      </div>
      <div class="setting-list submit">
        <input type="submit" value="ユーザー情報更新" class="btn">
      </div>
    </form>
  </div>
</template>

<script>
  import UploadImage from '../parts/upload_image.vue'
  import axios from 'axios'
  import { mapMutations } from 'vuex'

  export default {
    name: 'UserAccountEditForm',

    props: {
      account: Object
    },

    data: function () {
      return {
        accountEdit: {},
      }
    },

    components: {
      UploadImage
    },

    methods: {
      ...mapMutations([
        'setErrors'
      ]),

      async updateUserInfo () {
        if (window.sessionStorage.getItem('isGuestUser')) {
          this.setErrors(['ゲストユーザーの変更はできません'])
          return
        }
        this.deleteEmptyProps()
        let [response, errors] = await this.handle(axios.patch('/api/v1/users', this.accountEdit))
        if (errors) {
          this.setErrors(errors)
        }
        else {
          location.pathname = '/users/settings/account'
        }
      },

      deleteEmptyProps () {
        Object.keys(this.accountEdit).forEach((key) => {
          if (this.accountEdit[key] === '') {
            this.$delete(this.accountEdit, key)
          }
        })
      }
    }
  }
</script>
