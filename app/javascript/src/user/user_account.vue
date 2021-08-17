<template>
  <div class="user-account" v-if="$mq === 'pc'">
    <UserAccountView v-if="$route.name === 'userAccount'" :account="account"/>
    <UserAccountEditForm v-else-if="$route.name === 'userAccountEdit'" :account="account"/>
    <UserPasswordEditForm v-else-if="$route.name === 'userPasswordEdit'"/>
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
      <UserAccountView v-if="$route.name === 'userAccount'" :account="account"/>
      <UserAccountEditForm v-else-if="$route.name === 'userAccountEdit'" :account="account"/>
      <UserPasswordEditForm v-else-if="$route.name === 'userPasswordEdit'"/>
    </div>
  </b-modal>
</template>

<script>
  import UserAccountView from '../user/user_account_view.vue'
  import UserAccountEditForm from '../user/user_account_edit_form.vue'
  import UserPasswordEditForm from '../user/user_password_edit_form.vue'
  import CloseBtn from '../parts/close_btn.vue'

  export default {
    name: 'UserAccount',

    props: {
      account: Object
    },

    components: {
      UserAccountView,
      UserAccountEditForm,
      UserPasswordEditForm,
      CloseBtn
    },

    mounted () {
      this.showModal()
    },

    methods: {
      showModal () {
      if (this.$mq === 'sp') this.$bvModal.show('user_account_modal')
      }
    }
  }
</script>
