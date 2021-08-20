<template>
  <div class="no-content">
    <span class="no-content-statement">
      {{ statement }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'NoContent',
    data: function () {
      return {
        statement: '',
        recommendation: ''
      }
    },
    created () {
      this.setStatementType()
    },
    watch: {
      $route: 'setStatementType'
    },
    methods: {
      setStatementType () {
        switch (this.$route.name) {
          case 'userHome':
          case 'interests':
            this.statement = '興味のある人を探してみましょう！'
            this.recommendation = 'recommendUser'
            break
          case 'userShow':
          case 'interesters':
            this.statement = '考えを発信し多くの人に興味を持ってもらいましょう！'
            this.recommendation = 'MyThoughtBtn'
            break
          default:
            break
        }
      }
    }
  }
</script>
