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
      this.$emit('activeMyThought')
      if (this.$mq === 'sp') {
        this.$bvModal.hide(`${this.modalId}`)
      }
      if (this.route) {
        this.$router.push(this.route)
      }
    }
  }
}
</script>
