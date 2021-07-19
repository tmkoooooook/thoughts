<template>
  <button @click="showMyThought" class="new-thought btn">
    <span>thought</span>
  </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MyThoughtBtn',

  computed: {
    ...mapGetters([
      'watchUser'
    ])
  },

  methods: {
    showMyThought () {
      this.$emit('myThought')
    }
  }
}
</script>
