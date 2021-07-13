<template>
  <button @click="closeThought(modalId, url)">✖︎</button>
</template>

<script>
export default {
  name: 'closeBtn',

  props: {
    modalId: String,
    url: String
  },

  methods: {
    closeThought (modalId, url) {
      this.$bvModal.hide(`${modalId}`)
      this.$router.push(`${url}`)
    },
  },
}
</script>
