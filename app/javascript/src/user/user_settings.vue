<template>
  <div class="user-settings parent-box">
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
        <router-link :to="{ name: 'userAccountEdit' }">
          <li class="setting-list">
            <span>アカウント編集</span>
            <i class="fas fa-chevron-right"></i>
          </li>
        </router-link>
        <router-link :to="{ name: 'userPasswordEdit' }">
          <li class="setting-list">
            <span>パスワード変更</span>
            <i class="fas fa-chevron-right"></i>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="setting-details">
      <div class="errors-relative">
        <div class="errors-absolute">
          <ErrorMessages/>
        </div>
      </div>
      <router-view name="user_account" :account="account"></router-view>
    </div>
  </div>
</template>

<script>
  import ErrorMessages from '../parts/error_messages.vue'
  import axios from 'axios'
  import { mapMutations } from 'vuex'

  export default {
    name: 'UserSettings',

    data: function () {
      return {
        account: {
          icon_image: { url: '' },
          header_image: { url: '' }
        },
      }
    },

    components: {
      ErrorMessages
    },

    created () {
      this.fetchAccountInfo()
    },

    methods: {
      ...mapMutations([
        'setErrors'
      ]),

      async fetchAccountInfo () {
        let [response, errors] = await this.handle(axios.get('/api/v1/users/account'))
        if (errors) {
          this.setErrors(errors)
        }
        else {
          this.account = response.data
        }
      }
    }
  }
</script>
