<template>
  <div>
    <div class="separation"></div>
    <div class="info" v-for="thought in thoughts" :key="thought.id">
      <div class="info-link">
        <div class="user-thumbnail">
          <router-link :to="{ name: 'userShow', params: { userId: thought.user.user_id } }" class="user-show-link">
            <UserImage :imageUrl="thought.user.icon_image.url"/>
          </router-link>
        </div>
        <div class="user-info">
          <router-link :to="{ name: 'userShow', params: { userId: thought.user.user_id } }" class="user-show-link">
            {{ thought.user.name }}
            <span class="user-id">{{ thought.user.user_id }}</span>
          </router-link>
          <div @click="emitActivateThoughtAll(thought.user.user_id, thought.id)" class="thought-content">
            <h3>{{ thought.title }}</h3>
            <p>{{ thought.shorted_text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserImage from '../parts/user_image.vue'

  export default {
    name: 'ThoughtsCollection',
    props: { thoughts: Array },
    components: { UserImage },
    methods: {
      emitActivateThoughtAll (userId, thoughtId) {
        this.$emit('activateThoughtAll', userId, thoughtId)
      }
    }
  }
</script>
