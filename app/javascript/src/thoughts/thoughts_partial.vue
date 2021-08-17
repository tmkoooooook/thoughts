<template>
  <div class="thoughts-box parent-box">
    <div class="thoughts-partial">
      <div class="thoughts-top">
        <h2>ホーム</h2>
        <ErrorMessages/>
      </div>
      <UserShow v-if="isUserShow"/>
      <ThoughtsCollection v-if="isThoughtCollectionShow" @activateThoughtAll="activateThoughtAll" :thoughts="thoughts"/>
      <router-view name="interests"/>
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
  import UserShow from '../user/user_show.vue'
  import MyThought from "../thoughts/my_thought.vue"
  import ThoughtsCollection from "../thoughts/thoughts_collection.vue"
  import ErrorMessages from '../parts/error_messages.vue'
  import { mapActions, mapState } from 'vuex'

  const regex = /^interest[ser]+$/

  export default {
    name: 'ThoughtsPartial',

    components: {
      UserShow,
      MyThought,
      ThoughtsCollection,
      ErrorMessages
    },

    data: function () {
      return {
        myThoughtActive: false,
        thoughtAllActive: false,
        isUserShow: false
      }
    },

    created () {
      this.setIsUserShow()
      this.runFetchThoughts()
    },

    computed: {
      ...mapState([
        'thoughts'
      ]),

      isThoughtCollectionShow () {
        return !regex.test(this.$route.name)
      },

      selectFetchThoughtsUrl () {
        if (this.$attrs.userId) {
          return `/api/v1/thoughts/${this.$attrs.userId}`
        }
        else {
          return '/api/v1/thoughts'
        }
      }
    },

    watch: {
      $route (to, from) {
        this.setIsUserShow()
        if (to.name === 'thought') return
        if (regex.test(to.name)) return
        this.runFetchThoughts()
      }
    },

    methods: {
      ...mapActions([
        'fetchThoughts'
      ]),

      runFetchThoughts () {
        this.fetchThoughts(this.selectFetchThoughtsUrl)
      },

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
      },

      setIsUserShow () {
        if (this.$route.name === 'userShow') {
          this.isUserShow = true
        }
        else if (window.localStorage.getItem('isShowUser')) {
          this.isUserShow = true
        }
        else {
          this.isUserShow = false
        }
      }
    }
  }
</script>
