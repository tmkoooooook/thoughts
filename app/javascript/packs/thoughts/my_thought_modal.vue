<template>
  <b-modal scrollable hide-header hide-footer no-close-on-backdrop no-close-on-esc static id="my_thought" v-if="$mq === 'sp'">
    <div class="my-thought">
      <closeBtn modalId="my_thought" url="/users"/>
      <div class="thought-form">
        <form @submit.prevent="createThought">
          <!-- <input type="hidden" name="authenticity_token" :value="authenticity_token"> -->
          <div class="thought-form-field title">
            <input type="text" v-model="thoughtTitle" placeholder="thought titile">
          </div>
          <div class="thought-form-field text">
            <!-- 改行したり消したりする時resizeの挙動が変 -->
            <textarea v-model="thoughtText" ref="area" @keydown="resize" placeholder="thought"></textarea>
          </div>
          <div class="thought-form-field submit">
            <input type="submit" value="thought" class="btn btn-light">
          </div>
        </form>
      </div>
    </div>
  </b-modal>
</template>

<script>
import closeBtn from '../parts/close_btn.vue'

export default {
  name: 'MyThoughtModal',

  components: {
    closeBtn: closeBtn
  },

  props: {
    value: Object
  },

  computed: {
    thoughtTitle: {
      get () {
        return this.value.title
      },

      set (title) {
        this.inputThought({ title })
      }
    },
    thoughtText: {
      get () {
        return this.value.text
      },

      set (text) {
        this.inputThought({ text })
      }
    }
  },

  methods: {
    createThought () {
      this.$emit('createThought')
    },

    resize () {
      this.$emit('resize')
    },

    inputThought (thought) {
      this.$emit('input', { ...this.value, ...thought })
    }
  }
}
</script>
