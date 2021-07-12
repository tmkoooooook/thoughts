<template>
  <div class="sticky-container">
    <div class="thought-all-content" id="thought_all" v-if="$mq === 'pc'">
      <div class="edit-delete" v-if="thought.user_id === watchUser.id">
        <button class="fas fa-trash" @click="deleteThought(thought.id)"/>
      </div>
      <closeBtn url="/users"/>
      <h1>{{ thought.title }}</h1>
      <p>{{ thought.text }}</p>
    </div>
    <b-modal id="thought_all_modal"
      v-if="$mq === 'sp'"
      scrollable
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      static>
      <div class="thought-all-content">
        <div class="edit-delete" v-if="thought.user_id === watchUser.id">
          <button class="fas fa-trash" @click="deleteThought(thought.id)"/>
        </div>
        <closeBtn modalId="thought_all_modal" url="/users"/>
        <h1>{{ thought.title }}</h1>
        <p>{{ thought.text }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import closeBtn from '../parts/close_btn.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ThoughtAllText',

    props: { thoughts: Array },

    components: {
      closeBtn: closeBtn
    },

    mounted () {
      if (this.$mq === 'sp')
        this.$bvModal.show('thought_all_modal')
    },

    computed: {
      thought () {
        return this.thoughts.find(thought => thought.id === this.$attrs.thoughtId)
      },

      ...mapGetters ([
        'watchUser'
      ])
    },

    methods: {
      async deleteThought (id) {
        if (window.confirm('本当に削除しますか')) {
          await axios.delete(`/api/v1/thoughts/${id}`)
          this.$router.push('/users')
        }
      }
    }
  }
</script>
