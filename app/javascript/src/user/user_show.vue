<template>
  <div class="user-show" v-if="isUserShow">
    <div class="header-img-wrapper">
      <img src="~thoughts_logo_005163.png" alt="user-logo">
    </div>
    <div class="user-show-box">
      <div class="header-thumbnail-wrapper user-thumbnail">
        <img src="~thoughts_logo_005163.png" alt="user-logo">
      </div>
      <InterestingBtn v-if="isOtherUser" :userId="showUser.id"/>
      <div v-else class="temporary"></div>
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
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import InterestingBtn from '../interests/interesting_btn.vue'

  export default {
    name: 'UserShow',

    data: function () {
      return {
        showUser: {},
        isUserShow: false
      }
    },

    components: {
      InterestingBtn: InterestingBtn
    },

    created () {
      this.fetchShowUser()
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
      }
    },

    beforeRouteEnter (to, from, next) {
      if (to.name === 'userShow') {
        next(vm => vm.isUserShow = true)
      }
      else if (to.name === 'thought' && from.name === 'userShow') {
        next(vm => vm.isUserShow = true)
      }
      else next(vm => vm.isUserShow = false)
    }
  }
</script>
