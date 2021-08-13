<template>
  <div class="fade-in-alert">

  </div>
</template>

<script>
import ErrorMessages from '../parts/error_messages.vue'

export default {
  name: 'FadeInAlert',
  components: {
    ErrorMessages
  }
}
</script>

<style scoped>
.fade-in-alert {
  position: fixed;
}
</style>
