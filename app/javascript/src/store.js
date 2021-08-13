import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import handler from '../src/utils/handler'
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
    },
    errors: []
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
    },

    setErrors (state, response) {
      state.errors = response
    },

    clearErrors (state) {
      state.errors = []
    }
  },

  actions: {
    async fetchCurrentUser ({ commit }) {
      let [response, errors] = await handler.methods.handle(axios.get('/api/v1/users'))
      if (errors) {
        commit('setErrors', errors)
      }
      else {
        commit('setCurrentUser', { user: response.data })
      }
    },

    async fetchThoughts ({ commit }, url) {
      let [response, errors] = await handler.methods.handle(axios.get(url))
      if (errors) {
        commit('setErrors', errors)
      }
      else {
        commit('setThoughts', { thoughts: response.data })
      }
    },

    async deleteRelationship ({ commit, dispatch }, { id, interest }) {
      let [response, errors] = await handler.methods.handle(axios.delete(`/api/v1/relationships/${id}`, { data: interest }))
      if (errors) {
        commit('setErrors', errors)
      }
      else {
        dispatch('fetchCurrentUser')
      }
    },

    async createRelationship ({ commit, dispatch }, interest) {
      let [response, errors] = await handler.methods.handle(axios.post('/api/v1/relationships', interest))
      if (errors) {
        commit('setErrors', errors)
      }
      else {
        dispatch('fetchCurrentUser')
      }
    }
  },
  plugins: [createPersistedState({ storage: sessionStorage })]
})
