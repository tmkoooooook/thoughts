<template>
  <div class="thought-all-content" id="thought_all" v-if="thought && $mq === 'pc'">
    <div class="edit-delete" v-if="thought.user_id === watchUser.id">
      <button class="fas fa-trash" @click="deleteThought(thought.id)"/>
    </div>
    <h1>{{ thought.title }}</h1>
    <p>{{ thought.text }}</p>
  </div>
  <b-modal id="thought_all_modal"
    v-else-if="thought && $mq === 'sp'"
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
      <CloseBtn modalId="thought_all_modal" :route="closeBtnRoute"/>
      <h1>{{ thought.title }}</h1>
      <p>{{ thought.text }}</p>
    </div>
  </b-modal>
</template>

<script>
  import axios from 'axios'
  import CloseBtn from '../parts/close_btn.vue'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'ThoughtAllText',

    props: { thoughts: Array },

    components: {
      CloseBtn,
    },

    data: function () {
      return {
        fromRoute: {},
      }
    },

    mounted () {
      if (this.$mq === 'sp') this.showModal()
    },

    computed: {
      thought () {
        return this.thoughts.find(thought => thought.id == this.$attrs.thoughtId)
      },

      closeBtnRoute () {
        if (window.localStorage.getItem('isShowUser')) {
          return { name: 'userShow', params: { userId: window.localStorage.getItem('isShowUser') } }
        }
        else {
          return { name: 'userHome' }
        }
      },

      ...mapGetters ([
        'watchUser'
      ])
    },

    methods: {
      ...mapMutations([
        'setErrors'
      ]),

      async deleteThought (id) {
        if (window.confirm('本当に削除しますか')) {
          let [response, errors] = await this.handle(axios.delete(`/api/v1/thoughts/${id}`))
          if (errors) {
            this.setErrors(errors)
          }
          else {
            this.$router.push('/users')
          }
        }
      },

      showModal () {
        this.$bvModal.show('thought_all_modal')
      }
    },

    beforeRouteEnter (to, from, next) {
      if (!from.params.userId) next()
      else {
        const routeName = { name: from.name, params: { userId: from.params.userId } }
        window.localStorage.setItem('isShowUser', from.params.userId)
        next(vm => vm.fromRoute = routeName)
      }
    },

    beforeRouteLeave (to, from, next) {
      window.localStorage.clear()
      next()
    }
  }
</script>
