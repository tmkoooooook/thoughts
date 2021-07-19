<template>
  <button @click="closeThought">✖︎</button>
</template>

<script>
export default {
  name: 'closeBtn',

  props: {
    modalId: String,
    route: Object
  },

  methods: {
    closeThought () {
      if (this.$mq === 'sp') {
        this.$bvModal.hide(`${this.modalId}`)
      }
      this.$emit('myThought')
      if (this.route) {
        this.$router.push(this.route)
      }
    }
  }
}
</script>
