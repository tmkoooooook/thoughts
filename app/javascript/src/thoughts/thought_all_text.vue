<template>
  <div class="sticky-container">
    <div class="thought-all-content" id="thought_all" v-if="$mq === 'pc'">
      <div class="edit-delete" v-if="thought.user_id === watchUser.id">
        <button class="fas fa-trash" @click="deleteThought(thought.id)"/>
      </div>
      <CloseBtn :route="fromRoute"/>
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
        <CloseBtn modalId="thought_all_modal" :route="fromRoute"/>
        <h1>{{ thought.title }}</h1>
        <p>{{ thought.text }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import CloseBtn from '../parts/close_btn.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ThoughtAllText',

    props: { thoughts: Array },

    components: {
      CloseBtn: CloseBtn
    },

    data: function () {
      return {
        fromRoute: {}
      }
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
    },

    beforeRouteEnter (to, from, next) {
      const routeName = { name: from.name, params: { userId: from.params.userId } }
      next(vm => vm.fromRoute = routeName)
    }
  }
</script>
