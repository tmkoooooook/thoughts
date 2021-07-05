<template>
  <b-modal scrollable hide-header hide-footer no-close-on-backdrop no-close-on-esc static id="thought_all" v-if="$mq === 'sp'">
    <div class="thought-all-content">
      <div class="edit-delete" v-if="thought.user_id === $parent.currentUserId">
        <button class="fas fa-trash" @click="deleteThought(thought.id)"/>
      </div>
      <closeBtn modalId="thought_all" url="/users"/>
      <h1>{{ thought.title }}</h1>
      <p>{{ thought.text }}</p>
    </div>
  </b-modal>
</template>

<script>
import closeBtn from '../parts/close_btn.vue'

export default {
  name: 'ThoughtAllModal',

  props: {
    thought: Object,
  },

  components: {
    closeBtn: closeBtn
  },

  methods: {
    deleteThought (thoughtId) {
      this.$emit('deleteThought', thoughtId)
    },
  }
}
</script>
