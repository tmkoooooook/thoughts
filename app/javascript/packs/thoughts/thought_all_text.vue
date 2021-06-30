<template>
  <div class="thought-all-content" v-if="thought">
    <h1>{{ thought.title }}</h1>
    <p>{{ thought.text }}</p>
  </div>
</template>

<script>
  export default {
    name: 'ThoughtAll',
    props: { thoughts: Array },
    data: function () {
      return {
        thought: null
      }
    },
    created() {
      this.fetchThought()
    },
    watch: {
      $route: 'fetchThought'
    },
    methods: {
      fetchThought () {
        if (this.$route.params.thoughtId) {
          this.thought = this.thoughts.find(thought => thought.id === this.$route.params.thoughtId)
        }
      }
    }
  }
</script>
