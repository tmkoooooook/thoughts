<template>
  <div class="user-account" v-if="$mq === 'pc'">
    <div class="user-account-box">
      <div class="setting-header">
        <h3>アカウント情報</h3>
      </div>
      <ul class="setting-lists">
        <li class="setting-list">
          <div class="upload">
            <div class="user-thumbnail user-thumbnail-edit">
              <UserImage :imageUrl="account.icon_image.url"/>
            </div>
          </div>
        </li>
        <li class="setting-list">
          <div class="upload">
            <div class="header-img-wrapper-edit">
              <UserImage :imageUrl="account.header_image.url"/>
            </div>
          </div>
        </li>
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
            <div class="upload">
              <div class="user-thumbnail user-thumbnail-edit">
                <UserImage :imageUrl="account.icon_image.url"/>
              </div>
            </div>
          </li>
          <li class="setting-list">
            <div class="upload">
              <div class="header-img-wrapper-edit">
                <UserImage :imageUrl="account.header_image.url"/>
              </div>
            </div>
          </li>
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
  import UserImage from '../parts/user_image.vue'

  export default {
    name: 'UserAccount',

    props: {
      account: Object
    },

    components: {
      CloseBtn,
      UserImage
    },

    mounted () {
      if (this.$mq === 'sp')
        this.$bvModal.show('user_account_modal')
    },
  }
</script>
