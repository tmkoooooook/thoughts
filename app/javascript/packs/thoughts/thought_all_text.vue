<template>
  <div class="sticky-container">
    <div class="thought-all-content" v-if="$mq === 'pc'">
      <div class="edit-delete" v-if="thought.user_id === currentUserId">
        <button class="fas fa-trash" @click="deleteThought(thought.id)"/>
      </div>
      <button @click="closeThought()">✖︎</button>
      <h1>{{ thought.title }}</h1>
      <p>{{ thought.text }}</p>
    </div>
    <b-modal scrollable hide-header hide-footer no-close-on-backdrop no-close-on-esc static id="thought_all" v-if="$mq === 'sp'">
      <div class="thought-all-content">
        <div class="edit-delete" v-if="thought.user_id === currentUserId">
          <button class="fas fa-trash" @click="deleteThought(thought.id)"/>
        </div>
        <button @click="closeThought()">✖︎</button>
        <h1>{{ thought.title }}</h1>
        <p>{{ thought.text }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'ThoughtAll',

    props: { thoughts: Array },

    data: function () {
      return {
        thought: null,
      }
    },

    created () {
      this.fetchThought()
    },

    mounted () {
      if (this.$mq === 'sp')
        this.$bvModal.show('thought_all')
    },

    watch: {
      $route: 'fetchThought',
    },

    computed: {
      currentUserId () {
        return this.$store.state.user.id
      }
    },

    methods: {
      fetchThought () {
        if (this.$route.params.thoughtId) {
          this.thought = this.thoughts.find(thought => thought.id === this.$route.params.thoughtId)
        }
      },

      deleteThought (id) {
        if (window.confirm('本当に削除しますか')) {
          axios
            .delete(`/api/v1/thoughts/${id}`)
            .then(response => {
              this.thought = []
              this.fetchThought()
          })
        }
      },

      closeThought () {
        this.$bvModal.hide('thought_all')
        this.$router.push('/users')
      },
    }
  }
</script>
