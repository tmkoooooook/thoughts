<template>
  <div class="sticky-container">
    <myThoughtForm
      @createThought="createThought()"
      @resize="resize()"
      ref="formTextarea"
      v-model="thought"
      v-if="$mq === 'pc'"/>
    <myThoughtModal
      @createThought="createThought()"
      @resize="resize()"
      ref="modalTextarea"
      v-model="thought"
      v-if="$mq === 'sp'"/>
  </div>

</template>

<script>
import axios from 'axios'
import closeBtn from '../parts/close_btn.vue'
import myThoughtModal from './my_thought_modal.vue'
import myThoughtForm from './my_thought_form.vue'

export default {
  name: 'MyThought',

  props: { authenticity_token: String },

  components: {
    closeBtn: closeBtn,
    myThoughtModal: myThoughtModal,
    myThoughtForm: myThoughtForm,
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
      this.$bvModal.show('my_thought')
  },

  watch: {
    thought: 'resize'
  },

  methods: {
    createThought () {
      axios
        .post('/api/v1/thoughts', this.thought)
        .then(response => {
          let res_thought = response.data
          this.$router.push({ name: 'thought', params: { thoughtId: res_thought.id }})
        })
    },

    resize () {
      if (this.$mq === 'sp') {
        var area = this.$refs.modalTextarea.$refs.area
      }
      else {
        var area = this.$refs.formTextarea.$refs.area
      }
      const autoHeight =
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
