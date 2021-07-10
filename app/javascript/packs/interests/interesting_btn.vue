<template>
  <div class="interesting-form" v-if="isOtherUser">
    <form @submit.prevent="deleteInterest(relationship)" v-if="relationship">
      <input type="hidden" v-model="interest.interest_id">
      <input type="submit" value="uninteresting" class="btn uninteresting-btn">
    </form>
    <form @submit.prevent="createInterest()" v-else>
      <input type="hidden" v-model="interest.interest_id">
      <input type="submit" value="interesting" class="btn interesting-btn">
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: '',

  data: function () {
    return {
      interest: {
        interest_id: ''
      }
    }
  },

  props: { userId: Number },

  created () {
    this.fetchInterestUserId()
  },

  computed: {
    ...mapGetters([
      'watchUser'
    ]),

    relationship () {
      const relationship = this.watchUser.relationships.find(relation => relation.interest_id === this.userId)
      return relationship
    },

    isOtherUser () {
      return this.userId !== this.watchUser.id
    }
  },

  methods: {
    ...mapActions([
      'deleteRelationship',
      'createRelationship'
    ]),

    createInterest () {
      this.createRelationship(this.interest)
    },

    deleteInterest (id) {
      if (window.confirm('本当に解除しますか')) {
        this.deleteRelationship({ id: id, interest: this.interest })
      }
    },

    fetchInterestUserId () {
      this.interest.interest_id = this.userId
    }
  }
}
</script>
