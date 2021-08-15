<template>
  <button @click="logout" class="btn">ログアウト</button>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  name: 'LogOutBtn',

  methods: {
    ...mapMutations([
      'setErrors',
    ]),

    async logout () {
      let [response, errors] = await this.handle(axios.delete('/api/v1/users/sign_out'))
      if (errors) {
        this.setErrors(errors)
      }
      else {
        window.sessionStorage.clear()
        window.localStorage.clear()
        window.location.pathname = '/'
      }
    }
  }
}
</script>
