<template>
  <div class="user-account" v-if="$mq === 'pc'">
    <div class="user-account-box">
      <div class="setting-header">
        <h3>パスワード変更</h3>
      </div>
      <form @submit.prevent="updatePassword" class="setting-lists">
        <div class="setting-list">
          <input type="password" v-model="passwordEdit.password" placeholder="新しいパスワード">
        </div>
        <div class="setting-list">
          <input type="password" v-model="passwordEdit.password_confirmation" placeholder="パスワードの確認">
        </div>
        <div class="setting-list submit">
          <input type="submit" value="パスワード更新" class="btn">
        </div>
      </form>
    </div>
  </div>
  <b-modal id="user_password_edit_modal"
    v-else-if="$mq === 'sp'"
    scrollable
    hide-header
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    static>
    <div class="user-account">
      <CloseBtn modalId="user_password_edit_modal" :route="{ name: 'settings' }"/>
      <div class="user-account-box">
        <div class="setting-header">
          <h3>パスワード変更</h3>
        </div>
        <form @submit.prevent="updatePassword" class="setting-lists">
          <div class="setting-list">
            <input type="password" v-model="passwordEdit.password" placeholder="新しいパスワード">
          </div>
          <div class="setting-list">
            <input type="password" v-model="passwordEdit.password_confirmation" placeholder="パスワードの確認">
          </div>
          <div class="setting-list submit">
            <input type="submit" value="パスワード更新" class="btn">
          </div>
        </form>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import CloseBtn from '../parts/close_btn.vue'

  export default {
    name: 'UserAccount',

    data: function () {
      return {
        passwordEdit: {}
      }
    },

    components: {
      CloseBtn: CloseBtn
    },

    mounted () {
      if (this.$mq === 'sp')
        this.$bvModal.show('user_password_edit_modal')
    },

    methods: {
      async updatePassword () {
        await this.axios.put('/api/v1/users/password', this.passwordEdit)
        location.href = '/users/settings/account'
      }
    }
  }
</script>
