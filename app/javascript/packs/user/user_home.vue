<template>
  <div id="user_home" class="user-home">
    <router-view name="user_header"/>
    <router-view name="thoughts_partial" :thoughts="thoughts"/>
    <div class="thought-all">
      <router-view :thoughts="thoughts"/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'UserHome',
    data: function () {
      return {
        thoughts: []
      }
    },
    mounted () {
      axios
        .get('/api/v1/thoughts.json')
        .then(response => this.thoughts = response.data)
    }
  }
</script>
