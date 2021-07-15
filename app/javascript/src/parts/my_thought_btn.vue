<template>
  <router-link :to="{name: 'myThought'}" class="new-thought btn">
    <span>thought</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MyThoughtBtn',

  computed: {
    ...mapGetters([
      'watchUser'
    ])
  }
}
</script>
