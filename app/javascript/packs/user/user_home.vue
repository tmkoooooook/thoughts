<template>
  <div id="user_home" class="user-home">
    <router-view name="user_header"/>
    <router-view name="thoughts_partial" :thoughts="thoughts"/>
    <div class="thought-all">
      <router-view name="my_thought" v-if="isRouteParamsMyThought"/>
      <router-view name="thought_all" :thoughts="thoughts" v-if="isRouteParamsThoughtId"/>
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
      axios
        .get('/api/v1/thoughts')
        .then(response => this.thoughts = response.data)
    },
    computed: {
      isRouteParamsMyThought: function () {
        let routeParams = this.$route.params.thoughtId

        if (typeof routeParams === 'string' && routeParams === 'mythought')
          return true
      },
      isRouteParamsThoughtId: function() {
        let routeParams = this.$route.params.thoughtId

        if (typeof routeParams === 'number')
          return true
      }
    }
  }
</script>
