<template>
  <div class="user-account" v-if="$mq === 'pc'">
    <div class="user-account-box">
      <div class="setting-header">
        <h3>アカウント編集</h3>
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
        <div class="setting-list submit">
          <input type="submit" value="ユーザー情報更新" class="btn">
        </div>
      </form>
    </div>
  </div>
  <b-modal id="user_account_edit_modal"
    v-else-if="$mq === 'sp'"
    scrollable
    hide-header
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    static>
    <div class="user-account">
      <CloseBtn modalId="user_account_edit_modal" :route="{ name: 'settings' }"/>
      <div class="user-account-box">
        <div class="setting-header">
          <h3>アカウント編集</h3>
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
          <div class="setting-list submit">
            <input type="submit" value="ユーザー情報更新" class="btn">
          </div>
        </form>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import CloseBtn from '../parts/close_btn.vue'
  import axios from 'axios'

  export default {
    name: 'UserAccount',

    props: {
      account: Object
    },

    data: function () {
      return {
        accountEdit: {}
      }
    },

    components: {
      CloseBtn: CloseBtn
    },

    mounted () {
      if (this.$mq === 'sp')
        this.$bvModal.show('user_account_edit_modal')
    },

    methods: {
      async updateUserInfo () {
        this.deleteEmptyProps()
        await axios.patch('/api/v1/users', this.accountEdit)
        location.pathname = '/users/settings/account'
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
