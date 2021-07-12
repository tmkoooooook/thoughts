<template>
  <div class="sticky-container">
    <div class="my-thought" id="my_thought" v-if="$mq === 'pc'">
      <closeBtn url="/users"/>
      <div class="thought-form">
        <form @submit.prevent="createThought">
          <!-- <input type="hidden" name="authenticity_token" :value="authenticity_token"> -->
          <div class="thought-form-field title">
            <input type="text" name="title" v-model="thought.title" placeholder="thought titile">
          </div>
          <div class="thought-form-field text">
            <textarea name="text" v-model="thought.text" ref="area" @keydown="resize" placeholder="thought"></textarea>
          </div>
          <div class="thought-form-field submit">
            <input type="submit" value="thought" class="btn btn-light">
          </div>
        </form>
      </div>
    </div>
    <b-modal v-if="$mq === 'sp'" scrollable hide-header hide-footer no-close-on-backdrop no-close-on-esc static id="my_thought_modal">
      <div class="my-thought">
        <closeBtn modalId="my_thought_modal" url="/users"/>
        <div class="thought-form">
          <form @submit.prevent="createThought">
            <!-- <input type="hidden" name="authenticity_token" :value="authenticity_token"> -->
            <div class="thought-form-field title">
              <input type="text" name="title" v-model="thought.title" placeholder="thought titile">
            </div>
            <div class="thought-form-field text">
              <textarea name="text" v-model="thought.text" ref="modalArea" @keydown="resize" placeholder="thought"></textarea>
            </div>
            <div class="thought-form-field submit">
              <input type="submit" value="thought" class="btn btn-light">
            </div>
          </form>
        </div>
      </div>
    </b-modal>
  </div>

</template>

<script>
import axios from 'axios'
import closeBtn from '../parts/close_btn.vue'

export default {
  name: 'MyThought',

  props: { authenticity_token: String },

  components: {
    closeBtn: closeBtn
  },

  data: function () {
    return {
      thought: {
        title: '',
        text: ''
      }
    }
  },

  mounted () {
    if (this.$mq === 'sp')
      this.$bvModal.show('my_thought_modal')
  },

  watch: {
    thought: {
      handler: 'resize',
      deep: true
    }
  },

  methods: {
    async createThought () {
      await axios.post('/api/v1/thoughts', this.thought)
      this.$router.push('/users')
    },

    resize () {
      let area
      if(this.$mq === 'sp')
        { area = this.$refs.modalArea }
      else
        { area = this.$refs.area }

      (new Promise (function (size) {
        size(area.style.height = '200px')
      }))
      .then(function () {
        area.style.height = area.scrollHeight + 'px'
      })
    },
  }
}
</script>
