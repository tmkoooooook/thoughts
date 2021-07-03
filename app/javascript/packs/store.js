import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store ({
  state: {
    user: {}
  },

  getters: {
    isAlreadyInterest: (state) => (id) => {
      return state.user.relationships.includes(id)
    },

    findRelationshipsId: (state) => (user_id) => {
      return state.user.relationships.find(rs => rs.interest_id === user_id)
    }
  },

  mutations: {
    setCurrentUser (state, response) {
      state.user = response.user
    }
  },

  actions: {
    async fetchCurrentUser (context) {
      const currentUser = await axios.get('/api/v1/users')
      context.commit('setCurrentUser', { user: currentUser.data })
    }
  }
})
