<template>
  <div class="user-show">
    <div class="header-img-wrapper">
      <UserImage :imageUrl="showUser.header_image.url"/>
    </div>
    <div class="user-show-box">
      <div class="header-thumbnail-wrapper user-thumbnail">
        <UserImage :imageUrl="showUser.icon_image.url"/>
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
  import { mapGetters, mapMutations } from 'vuex'
  import InterestingBtn from '../parts/interesting_btn.vue'
  import LogoutBtn from '../parts/logout_btn.vue'
  import UserImage from '../parts/user_image.vue'
  import axios from 'axios'

  export default {
    name: 'UserShow',

    data: function () {
      return {
        showUser: {
          header_image: { url: '' },
          icon_image: { url: '' }
        },
      }
    },

    components: {
      InterestingBtn,
      LogoutBtn,
      UserImage
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
      ...mapMutations([
        'setErrors'
      ]),

      async fetchShowUser () {
        let [response, errors] = await this.handle(axios.get(`/api/v1/users/${this.$route.params.userId}`))
        if (errors) {
          this.setErrors(errors)
        }
        else {
          this.showUser = response.data
        }
      },
    }
  }
</script>
