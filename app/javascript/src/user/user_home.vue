<template>
  <div id="user_home" class="user-home">
    <UserHeader/>
    <router-view name="thoughts_partial" :thoughts="thoughts"/>
    <div class="thought-all">
      <router-view name="my_thought"/>
      <router-view name="thought_all" :thoughts="thoughts"/>
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
      $route: 'runFetchThoughts'//結構負荷かかりそう？
    },

    methods: {
      ...mapActions([
        'fetchThoughts',
        'fetchCurrentUser'
      ]),

      runFetchThoughts () {
        if (this.$route.params.thoughtId) return

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
