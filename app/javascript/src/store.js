import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store ({
  state: {
    user: {
      relationships: []
    },
    thoughts: [],
    sessionUser: {
      access_token: '',
      uid: '',
      client: ''
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
    },

    setThoughts (state, response) {
      state.thoughts = response.thoughts
    },

    setUserSessionTokens (state, response) {
      state.sessionUser.access_token = response.headers["access-token"]
      state.sessionUser.uid = response.headers.uid
      state.sessionUser.client = response.headers.client
    }
  },

  actions: {
    async fetchCurrentUser ({ commit }) {
      const currentUser = await axios.get('/api/v1/users')
      commit('setCurrentUser', { user: currentUser.data })
    },

    async fetchThoughts ({ commit }, url) {
      const thoughts = await axios.get(url)
      commit('setThoughts', { thoughts: thoughts.data })
    },

    async deleteRelationship ({ dispatch }, { id, interest }) {
      await axios.delete(`/api/v1/relationships/${id}`, { data: interest })
      dispatch('fetchCurrentUser')
    },

    async createRelationship ({ dispatch }, interest) {
      await axios.post('/api/v1/relationships', interest)
      dispatch('fetchCurrentUser')
    }
  },
  plugins: [createPersistedState({ storage: sessionStorage })]
})
