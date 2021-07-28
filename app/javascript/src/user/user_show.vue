<template>
  <div class="user-show">
    <div class="header-img-wrapper">
      <img src="~thoughts_logo_005163.png" alt="user-logo">
    </div>
    <div class="user-show-box">
      <div class="header-thumbnail-wrapper user-thumbnail">
        <img src="~thoughts_logo_005163.png" alt="user-logo">
      </div>
      <div class="user-options submit">
        <InterestingBtn v-if="isOtherUser" :userId="showUser.id"/>
        <LogoutBtn v-else/>
      </div>
      <div class="user-profile">
        <h3 class="user-name">{{ showUser.name }}</h3>
        <div class="user-id">{{ showUser.user_id }}</div>
        <div class="interest-information">
          <router-link :to="{name: 'interests' }" class="interest-link">{{ showUser.interests_size }} interests</router-link>
          <router-link :to="{name: 'interesters' }" class="interest-link">{{ showUser.interesters_size }} interesters</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import InterestingBtn from '../parts/interesting_btn.vue'
  import LogoutBtn from '../parts/logout_btn.vue'
  import axios from 'axios'

  export default {
    name: 'UserShow',

    data: function () {
      return {
        showUser: {},
      }
    },

    components: {
      InterestingBtn: InterestingBtn,
      LogoutBtn: LogoutBtn
    },

    created () {
      this.fetchShowUser()
    },

    watch: {
      $route: 'fetchShowUser'
    },

    computed: {
      ...mapGetters([
        'watchUser'
      ]),

      isOtherUser () {
        return this.$route.params.userId !== this.watchUser.user_id
      }
    },

    methods: {
      async fetchShowUser () {
        const response = await axios.get(`/api/v1/users/${this.$route.params.userId}`)
        this.showUser = response.data
      },
    }
  }
</script>
