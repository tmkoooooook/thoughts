import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store ({
  state: {
    user: {
      relationships: []
    }
  },

  getters: {
    watchUser: (state) => {
      return state.user
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
    },

    async deleteRelationship ({ dispatch }, { id, interest }) {
      await axios.delete(`api/v1/relationships/${id}`, { data: interest })
      dispatch('fetchCurrentUser')
    },

    async createRelationship ({ dispatch }, interest) {
      await axios.post('api/v1/relationships', interest)
      dispatch('fetchCurrentUser')
    }
  }
})
