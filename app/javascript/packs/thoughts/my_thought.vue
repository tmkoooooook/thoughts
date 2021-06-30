<template>
  <div class="my-thoughts">
    <div class="user-thumbnail">
      <img src="~thoughts_logo_005163.png" alt="">
    </div>
    <div class="thought-form">
      <form @submit.prevent="createThought">
        <input type="hidden" name="authenticity_token" :value="authenticity_token">
        <div class="thought-form-field title">
          <input type="text" v-model="thought.title" placeholder="thought titile">
        </div>
        <div class="thought-form-field text">
          <!-- 改行したり消したりする時resizeの挙動が変 -->
          <textarea v-model="thought.text" ref="area" @keydown="resize" placeholder="thought"></textarea>
        </div>
        <div class="thought-form-field submit">
          <input type="submit" value="thought" class="btn btn-light">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyThought',
  props: { authenticity_token: String },
  data: function () {
    return {
      thought: {
        title: '',
        text: ''
      }
    }
  },
  watch: {
    thought: 'resize'
  },
  methods: {
    createThought: function () {
      axios
        .post('/api/v1/thoughts', this.thought)
        .then(response => {
          let res_thought = response.data
          this.$router.push({ name: 'thought', params: { thoughtId: res_thought.id }})
        })
    },
    resize: function () {
      const area = this.$refs.area
      const autoHeight =
        (new Promise (function (size) {
          size(area.style.height = '200px')
        }))
        .then(function () {
          area.style.height = area.scrollHeight + 'px'
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
