export default {
  methods: {
    handle: function (promise) {
      return promise
        .then(data => ([data, undefined]))
        .catch(error => Promise.resolve([undefined, error.response.data.errors]))
    },
  }
}
