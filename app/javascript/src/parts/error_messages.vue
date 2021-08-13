<template>
  <div>
    <div v-for="error in setErrors" :key="error">
      <b-alert v-if="sign" variant="danger" show>{{ error }}</b-alert>
      <b-alert
        v-else
        variant="danger"
        fade
        :show="dismissCountDown"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        {{ error }}
      </b-alert>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'ErrorMessages',

    props: {
      sign: {
        type: Boolean,
        default: false
      }
    },

    data: function () {
      return {
        dismissSecs: 10,
        dismissCountDown: 0,
        showDismissibleAlert: false
      }
    },

    mounted () {
      this.showAlert()
    },

    watch: {
      setErrors: 'showAlert',
      dismissCountDown: function () {
        if (!this.dismissCountDown) {
          setTimeout(() => {
            this.clearErrors()
          }, 1000)//fade effectが意味なくなるためタイミングをずらしている
        }
      }
    },

    computed: {
      ...mapState([
        'errors'
      ]),

      setErrors () {
        if (Array.isArray(this.errors)) {
          return this.errors
        }
        else if (this.errors.full_messages) {
          return this.errors.full_messages
        }
      }
    },

    methods: {
      ...mapMutations([
        'clearErrors'
      ]),

      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },

      showAlert() {
        if (this.errors.length !== 0) {
          this.dismissCountDown = this.dismissSecs
        }
      }
    }
  }
</script>
