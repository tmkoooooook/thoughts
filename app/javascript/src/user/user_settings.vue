<template>
  <div class="user-settings">
    <div class="user-settings-box">
      <div class="setting-header">
        <h3>設定</h3>
      </div>
      <ul class="setting-lists">
        <router-link :to="{ name: 'userAccount' }">
          <li class="setting-list">
            <span>アカウント情報</span>
            <i class="fas fa-chevron-right"></i>
          </li>
        </router-link>
        <router-link :to="{ name: 'userAccount' }">
          <li class="setting-list">
            <span>アカウント編集</span>
            <i class="fas fa-chevron-right"></i>
          </li>
        </router-link>
        <router-link :to="{ name: 'userAccount' }">
          <li class="setting-list">
            <span>パスワード変更</span>
            <i class="fas fa-chevron-right"></i>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="setting-details">
      <router-view name="user_account" :account="account"></router-view>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'UserSettings',

    data: function () {
      return {
        account: {}
      }
    },

    created () {
      this.fetchAccountInfo()
    },

    methods: {
      async fetchAccountInfo () {
        //params.accountをpassword指定して認証するとか？
        const response = await axios.get('/api/v1/users/account', { params: { account: 'request' } })
        this.account = response.data
      }
    }
  }
</script>
