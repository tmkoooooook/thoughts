<template>
  <div class="thoughts-partial">
    <UserShow v-if="isUserShow"/>
    <div v-else class="thoughts-top">
      <h2>ホーム</h2>
      <MyThoughtBtn/>
    </div>
    <div class="separation"></div>
    <div class="thought-info" v-for="thought in thoughts" :key="thought.id">
      <router-link :to="{ name: 'thought', params: { userId: thought.user.user_id ,thoughtId: thought.id }}" class="thought-info-link">
        <div class="user-thumbnail">
          <router-link :to="{ name: 'userShow', params: { userId: thought.user.user_id } }">
            <img src="~thoughts_logo_005163.png" alt="user-logo">
          </router-link>
        </div>
        <div class="user-info">
          <router-link :to="{ name: 'userShow', params: { userId: thought.user.user_id } }">
            {{ thought.user.name }}
            <span class="user-id">{{ thought.user.user_id }}</span>
          </router-link>
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
  import InterestingBtn from '../interests/interesting_btn.vue'
  import UserShow from '../user/user_show.vue'
  import MyThoughtBtn from "../parts/my_thought_btn.vue";

  export default {
    name: 'ThoughtCollection',

    props: { thoughts: Array },

    data: function () {
      return {
        isUserShow: false
      }
    },

    components: {
      InterestingBtn,
      UserShow,
      MyThoughtBtn
    },
    //UserShowが/usersなどでも開いてしまうのでroutingの検知をしている。
    beforeRouteEnter (to, from, next) {
      if (to.name === 'userShow') {
        next(vm => vm.isUserShow = true)
      }
      else if (from.name === 'userShow' && to.name === 'thought') {
        next(vm => vm.isUserShow = true)
        }
      else {
        next(vm => vm.isUserShow = false)
      }
    }
  }
</script>
