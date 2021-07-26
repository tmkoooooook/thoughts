<template>
  <div class="user-account" v-if="$mq === 'pc'">
    <div class="user-account-box">
      <div class="setting-header">
        <h3>アカウント情報</h3>
      </div>
      <ul class="setting-lists">
        <li class="setting-list">
          <label>名前</label>
          <span>{{ account.name }}</span>
        </li>
        <li class="setting-list">
          <label>ユーザーID</label>
          <span>{{ account.user_id }}</span>
        </li>
        <li class="setting-list">
          <label>Eメール</label>
          <span>{{ account.email }}</span>
        </li>
      </ul>
    </div>
  </div>
  <b-modal id="user_account_modal"
    v-else-if="$mq === 'sp'"
    scrollable
    hide-header
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    static>
    <div class="user-account">
      <CloseBtn modalId="user_account_modal" :route="{ name: 'settings' }"/>
      <div class="user-account-box">
        <div class="setting-header">
          <h3>アカウント情報</h3>
        </div>
        <ul class="setting-lists">
          <li class="setting-list">
            <label>名前</label>
            <span>{{ account.name }}</span>
          </li>
          <li class="setting-list">
            <label>ユーザーID</label>
            <span>{{ account.user_id }}</span>
          </li>
          <li class="setting-list">
            <label>Eメール</label>
            <span>{{ account.email }}</span>
          </li>
        </ul>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import CloseBtn from '../parts/close_btn.vue'

  export default {
    name: 'UserAccount',

    props: {
      account: Object
    },

    components: {
      CloseBtn: CloseBtn
    },

    mounted () {
      if (this.$mq === 'sp')
        this.$bvModal.show('user_account_modal')
    },
  }
</script>
