<template>
  <div class="thoughts-box parent-box">
    <div class="thoughts-partial">
      <div class="thoughts-top">
        <h2>ホーム</h2>
      </div>
      <router-view name="user_show"/>
      <div class="separation"></div>
      <div class="thought-info" v-for="thought in thoughts" :key="thought.id">
        <div class="thought-info-link">
          <div class="user-thumbnail">
            <router-link :to="{ name: 'userShow', params: { userId: thought.user.user_id } }" class="user-show-link">
              <img src="~thoughts_logo_005163.png" alt="user-logo">
            </router-link>
          </div>
          <div class="user-info">
            <router-link :to="{ name: 'userShow', params: { userId: thought.user.user_id } }" class="user-show-link">
              {{ thought.user.name }}
              <span class="user-id">{{ thought.user.user_id }}</span>
            </router-link>
            <div @click="activateThoughtAll(thought.user.user_id, thought.id)" class="thought-content">
              <h3>{{ thought.title }}</h3>
              <p>{{ thought.shorted_text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="thought">
      <div class="sticky-container">
        <MyThought @activateMyThought="activateMyThought" :myThoughtActive="myThoughtActive"/>
        <router-view name="thought_all" v-if="!myThoughtActive" :thoughts="thoughts"/>
      </div>
    </div>
  </div>
</template>

<script>
  import 'thoughts_logo_005163.png'
  import MyThought from "../thoughts/my_thought.vue";

  export default {
    name: 'ThoughtCollection',

    props: {
      thoughts: Array
      },

    components: {
      MyThought
    },

    data: function () {
      return {
        myThoughtActive: false,
        thoughtAllActive: false
      }
    },

    methods: {
      activateMyThought () {
        if (!this.myThoughtActive) {
          this.thoughtAllActive = false
        }
        this.myThoughtActive = !this.myThoughtActive
      },

      activateThoughtAll (userId, thoughtId) {
        this.thoughtAllActive = true
        this.myThoughtActive = false
        if (this.$attrs.userId === userId && this.$attrs.thoughtId == thoughtId) return

        const route = { name: 'thought', params: { userId: userId, thoughtId: thoughtId } }
        this.$router.push(route)
      }
    }
  }
</script>
