<template>
  <div class="thought-all-content" v-if="$mq === 'pc'">
    <div class="edit-delete" v-if="thought.user_id === $parent.currentUserId">
      <button class="fas fa-trash" @click="deleteThought(thought.id)"/>
    </div>
    <closeBtn url="/users"/>
    <h1>{{ thought.title }}</h1>
    <p>{{ thought.text }}</p>
  </div>
</template>

<script>
import closeBtn from '../parts/close_btn.vue'

export default {
  name: 'ThoughtAll',

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
  },
}
</script>
