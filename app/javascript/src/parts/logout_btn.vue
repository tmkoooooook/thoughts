<template>
  <button @click="logout" class="btn">ログアウト</button>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LogOutBtn',

  methods: {
    async logout () {
      await axios.delete('/api/v1/users/sign_out')
      window.sessionStorage.clear()
      window.location.pathname = '/'
    }
  }
}
</script>
