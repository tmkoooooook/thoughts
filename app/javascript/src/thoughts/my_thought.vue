<template>
  <div class="my-thought-box">
    <div class="thought-btn">
      <MyThoughtBtn @activeMyThought="activateMyThought"/>
    </div>
    <div class="my-thought" id="my_thought" v-if="myThoughtActive && $mq === 'pc'">
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
    </div>
    <b-modal id="my_thought_modal" v-else-if="myThoughtActive && $mq === 'sp'" scrollable hide-header hide-footer no-close-on-backdrop no-close-on-esc static>
      <div class="my-thought">
        <CloseBtn @activeMyThought="activateMyThought" modalId="my_thought_modal"/>
        <div class="thought-form">
          <form @submit.prevent="createThought">
            <div class="thought-form-field title">
              <input type="text" name="title" v-model="thought.title" placeholder="thought titile" autocomplete="off">
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
import MyThoughtBtn from '../parts/my_thought_btn.vue'
import CloseBtn from '../parts/close_btn.vue'
import { mapActions } from 'vuex'

export default {
  name: 'MyThought',

  props: {
    authenticity_token: String,
    myThoughtActive: Boolean,
  },

  components: {
    MyThoughtBtn,
    CloseBtn
  },

  data: function () {
    return {
      thought: { title: '', text: '' },
      fromRoute: { name: 'userHome' }
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
      await axios.post('/api/v1/thoughts', this.thought)
      this.thought = { title: '', text: '' }
      this.runFetchThoughts()
    },

    activateMyThought () {
      this.$emit('activateMyThought')
      if (this.$mq === 'sp' && !this.myThoughtActive) {
        setTimeout(() => this.$bvModal.show('my_thought_modal'), 10)
      }
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
    }
  }
}
</script>
