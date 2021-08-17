<template>
  <div class="thought-form">
    <form @submit.prevent="createThought">
      <div class="thought-form-field title">
        <input type="text" name="title" v-model="thought.title" placeholder="thought titile" autocomplete="off">
      </div>
      <div class="thought-form-field text">
        <textarea name="text" v-model="thought.text" ref="area" @keydown="resize" placeholder ="thought"></textarea>
      </div>
      <div class="thought-form-field submit">
        <input type="submit" value="thought" class="btn btn-light">
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'MyThoughtForm',

    data: function () {
      return {
        thought: { title: '', text: '' }
      }
    },

    watch: {
      thought: {
        handler: 'resize',
        deep: true
      }
    },

    methods: {
      ...mapActions([
        'fetchThoughts'
      ]),

      ...mapMutations([
        'setErrors'
      ]),

      runFetchThoughts () {
        let urlParams = this.$route.params.userId
        let url
        if (urlParams) {
          url = `/api/v1/thoughts/${urlParams}`
        }
        else {
          url = '/api/v1/thoughts'
        }
        this.fetchThoughts(url)
      },

      async createThought () {
        let [response, errors] = await this.handle(axios.post('/api/v1/thoughts', this.thought))
        if(errors) {
          this.setErrors(errors)
        }
        else {
          this.thought = { title: '', text: '' }
          this.runFetchThoughts()
        }
      },

      async resize () {
        let area = this.$refs.area
        await Promise.resolve(area.style.height = '200px')
        area.style.height = area.scrollHeight + 'px'
      }
    }
  }
</script>
