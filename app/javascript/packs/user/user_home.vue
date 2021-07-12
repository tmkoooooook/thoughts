<template>
  <div id="user_home" class="user-home">
    <router-view name="user_header"/>
    <router-view name="thoughts_partial" :thoughts="thoughts"/>
    <div class="thought-all">
      <router-view name="my_thought" v-if="isMyThought"/>
      <router-view name="thought_all" :thoughts="thoughts" v-if="isThoughtAll"/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'UserHome',

    props: { csrf_token: String },

    data: function () {
      return {
        thoughts: []
      }
    },

    created () {
      this.fetchThoughts()
      this.fetchCurrentUser()
    },

    watch: {
      $route: 'fetchThoughts'//結構負荷かかりそう？
    },

    computed: {
      isMyThought: function () {
        let routeParams = this.$route.params.thoughtId
        if (typeof routeParams === 'string' && routeParams === 'mythought')
          return true
      },

      isThoughtAll: function() {
        let routeParams = this.$route.params.thoughtId

        if (typeof routeParams === 'number')
          return true
      }
    },

    methods: {
      async fetchThoughts () {
        const response = await axios.get('/api/v1/thoughts')
        this.thoughts = response.data
      },

      fetchCurrentUser () {
        this.$store.dispatch('fetchCurrentUser')
      },
    }
  }
</script>
