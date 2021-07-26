const VueAxiosPlugin = {}
export default VueAxiosPlugin.install = function(Vue, { axios, store }) {
  const csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  axios.defaults.headers.common = {
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRF-Token": csrf_token,
    "access-token": store.state.sessionUser.access_token,
    "uid": store.state.sessionUser.uid,
    "client": store.state.sessionUser.client
  }
  Vue.axios = axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return axios
      }
    }
  })
}
