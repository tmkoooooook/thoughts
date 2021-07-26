<template>
  <div class="user-show" v-if="isUserShow">
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
        <ul class="interest-information">
          <li class="interests">{{ showUser.interests_size }} interests</li>
          <li class="interesters">{{ showUser.interesters_size }} interesters</li>
        </ul>
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
        isUserShow: false
      }
    },

    components: {
      InterestingBtn: InterestingBtn,
      LogoutBtn: LogoutBtn
    },

    created () {
      this.fetchShowUser()
      this.setIsUserShow()
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

      setIsUserShow () {
        if (this.$route.name === 'userShow') {
          this.isUserShow = true
        }
        else if (window.localStorage.getItem('isShowUser')) {
          this.isUserShow = true
        }
        else {
          this.isUserShow = false
        }
      }
    }
  }
</script>
