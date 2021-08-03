<template>
  <div>
    <div>
      <VueLoading
        type="spiningDubbles"
        color="#005163"
        :size="{ width: '60px', height: '60px' }"
        />
    </div>
  </div>
</template>

<script>
  import { VueLoading } from 'vue-loading-template'

  export default {
    name: 'Loading',
    components: {
      VueLoading
    }
  }
</script>
