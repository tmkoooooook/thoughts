<template>
  <div class="sticky-container">
    <thoughtAll
      :thought="thought"
      @deleteThought="deleteThought"
      v-if="$mq === 'pc'"/>
    <thoughtAllModal
      :thought="thought"
      @deleteThought="deleteThought"
      v-if="$mq === 'sp'"/>
  </div>
</template>

<script>
  import axios from 'axios'
  import closeBtn from '../parts/close_btn.vue'
  import thoughtAllModal from './thought_all_modal.vue'
  import thoughtAll from './thought_all.vue'

  export default {
    name: 'ThoughtAllText',

    props: { thoughts: Array },

    components: {
      closeBtn: closeBtn,
      thoughtAllModal: thoughtAllModal,
      thoughtAll: thoughtAll,
    },

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
