<template>
  <div>
    <div class="interests-tab">
      <router-link :to="{name: 'interests' }" class="interest-link">interests</router-link>
      <router-link :to="{name: 'interesters' }" class="interest-link">interesters</router-link>
    </div>
    <div class="info" v-for="interest in interests" :key="interest.id">
      <div class="info-link">
        <div class="user-thumbnail">
          <router-link :to="{ name: 'userShow', params: { userId: interest.user_id } }" class="user-show-link">
            <UserImage :imageUrl="interest.icon_image.url"/>
          </router-link>
        </div>
        <div class="user-info user-info-interest">
          <router-link :to="{ name: 'userShow', params: { userId: interest.user_id } }" class="user-show-link">
            {{ interest.name }}
            <br>
            <span class="user-id">{{ interest.user_id }}</span>
          </router-link>
        </div>
        <InterestingBtn :userId="interest.id"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import InterestingBtn from '../parts/interesting_btn.vue'
  import UserImage from '../parts/user_image.vue'

  export default {
    name: 'Interests',

    components: {
      InterestingBtn,
      UserImage
    },

    data: function () {
      return {
        interests: [{ icon_image: { url: '' } }]
      }
    },

    created () {
      this.selectFetchMethod()
    },

    watch: {
      $route: 'selectFetchMethod'
    },

    methods: {
      async fetchInterests () {
        const response = await axios.get(`/api/v1/relationships/interests`,{ params: { user_id: this.$attrs.userId } })
        this.interests = response.data
      },

      async fetchInteresters () {
        const response = await axios.get(`/api/v1/relationships/interesters`,{ params: { user_id: this.$attrs.userId } })
        this.interests = response.data
      },

      async selectFetchMethod() {
        if (this.$route.name === 'interests') this.fetchInterests()
        else if (this.$route.name === 'interesters') this.fetchInteresters()
      }
    }
  }
</script>
