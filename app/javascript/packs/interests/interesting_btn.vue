<template>
  <div class="interesting-form" v-if="!currentUser">
    <form @submit.prevent="createInterest()" v-if="!relationship">
      <input type="hidden" v-model="interest.interest_id">
      <input type="submit" value="interesting" class="btn">
    </form>
    <form @submit.prevent="deleteInterest(relationship.id)" v-else>
      <input type="hidden" v-model="interest.interest_id">
      <input type="submit" value="uninteresting" class="btn uninteresting-btn">
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: '',

  data: function () {
    return {
      currentUser: false,
      interest: {
        interest_id: ''
      },
      relationship: []
    }
  },

  props: { userId: Number },

  created () {
    this.fetchInterestUserId()
  },

  mounted() {
    this.fetchRelationship(this.userId, { ms: 10 })
    this.isCurrentUser({ ms: 10 })
  },

  methods: {
    createInterest () {
      axios
        .post('api/v1/relationships', this.interest)
        .then(this.fetchCurrentUser)
        .then(this.fetchRelationship(this.userId, { ms: 100 }))
    },

    deleteInterest (id) {
      if (window.confirm('本当に解除しますか')) {
        axios
          .delete(`/api/v1/relationships/${id}`, { data: this.interest })
          .then(this.fetchCurrentUser)
          .then(this.fetchRelationship(this.userId, { ms: 100 }))
      }
    },

    fetchInterestUserId () {
      this.interest.interest_id = this.userId
    },

    fetchRelationship (user_id, delayTime) {
      //タイミング次第でstate.userが格納されていないため、エラーが出る
      //苦肉の策としてタイミングをずらしている.解決したい
      setTimeout(() => {
      this.relationship = this.$store.getters.findRelationshipsId(user_id)
    }, delayTime.ms)
    },

    isCurrentUser (delayTime) {
      //タイミング次第でstate.userが格納されていないため、エラーが出る
      //苦肉の策としてタイミングをずらしている.解決したい
      setTimeout(() => {
        if (this.userId === this.$store.state.user.id)
          this.currentUser = true
      }, delayTime.ms)
    },
    fetchCurrentUser () {
      this.$store.dispatch('fetchCurrentUser')
    }
  }
}
</script>
