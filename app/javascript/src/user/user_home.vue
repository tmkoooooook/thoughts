<template>
  <div id="user_home" class="user-home">
    <UserHeader/>
    <div class="router-view-box">
      <router-view name="thoughts_partial" :thoughts="thoughts"/>
      <router-view name="user_settings"/>
    </div>
  </div>
</template>

<script>
  import UserHeader from './user_header.vue'
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'UserHome',

    components: {
      UserHeader: UserHeader
    },

    props: { csrf_token: String },

    created () {
      this.runFetchThoughts()
      this.fetchCurrentUser()
    },

    computed: {
      ...mapState([
        'thoughts'
      ])
    },

    watch: {
      $route (to, from) {
        if (from.name === 'userHome' && to.name === 'thought') return
        if (from.name === 'userShow' && to.name === 'thought') return
        if (from.name === to.name) return
        this.runFetchThoughts()
      }
    },

    methods: {
      ...mapActions([
        'fetchThoughts',
        'fetchCurrentUser'
      ]),

      runFetchThoughts () {
        let urlParams = this.$route.params.userId
        let url

        if (urlParams) {
          url = `/api/v1/thoughts/${urlParams}`
        }
        else {
          url = '/api/v1/thoughts'
        }
        this.fetchThoughts(url)
      }
    }
  }
</script>
