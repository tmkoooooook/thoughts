<template>
  <div>
    <div v-for="error in setErrors" :key="error">
      <b-alert variant="danger" show>{{ error }}</b-alert>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ErrorMessages',
    props: ['errors'],
    computed: {
      setErrors () {
        if (Array.isArray(this.errors)) {
          return this.errors
        }
        else if (this.errors.full_messages) {
          return this.errors.full_messages
        }
      }
    }
  }
</script>
