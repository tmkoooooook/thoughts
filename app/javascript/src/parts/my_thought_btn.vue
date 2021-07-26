<template>
  <button @click="showMyThought" class="new-thought btn">
    <span>thought</span>
  </button>
</template>

<script>
export default {
  name: 'MyThoughtBtn',

  methods: {
    showMyThought () {
      this.$emit('activeMyThought')
    }
  }
}
</script>
