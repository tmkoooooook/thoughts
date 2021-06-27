<template>
  <div class="thoughts-partial">
    <div class="thoughts-top">
      <h2>ホーム</h2>
      <div class="new-thought btn">
        <span>thought</span>
      </div>
    </div>
    <div class="separation"></div>
    <div class="thought-info" v-for="thought in thoughts" :key="thought.id">
      <router-link :to="{ name: 'thought', params: { thoughtId: thought.id }}" class="thought-info-link">
        <div class="user-thumbnail">
          <img src="~thoughts_logo_005163.png" alt="user-logo">
        </div>
        <div class="user-info">
          <a href="#">thought.user.name</a>
          <span>thought.user.user_id</span>
          <div class="thought-content">
            <h3>{{ thought.title }}</h3>
            <p>{{ thought.shorted_text }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import 'thoughts_logo_005163.png'
  export default {
    name: 'ThoughtCollection',
    props: { thoughts: Array }
  }
</script>
