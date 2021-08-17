<template>
  <div id="user_home" class="user-home">
    <UserHeader/>
    <div class="router-view-box">
      <router-view name="thoughts_partial"/>
      <router-view name="user_settings"/>
    </div>
  </div>
</template>

<script>
  import UserHeader from './user_header.vue'
  import { mapActions } from 'vuex'

  export default {
    name: 'UserHome',

    components: {
      UserHeader
    },

    created () {
      this.fetchCurrentUser()
    },

    methods: {
      ...mapActions([
        'fetchCurrentUser'
      ])
    }
  }
</script>
