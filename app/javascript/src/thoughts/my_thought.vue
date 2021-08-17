<template>
  <div class="my-thought-box">
    <div class="thought-btn">
      <MyThoughtBtn @activeMyThought="activateMyThought"/>
    </div>
    <div class="my-thought" id="my_thought" v-if="myThoughtActive && $mq === 'pc'">
      <MyThoughtForm/>
    </div>
    <b-modal id="my_thought_modal" v-else-if="myThoughtActive && $mq === 'sp'" scrollable hide-header hide-footer no-close-on-backdrop no-close-on-esc static>
      <div class="my-thought">
        <CloseBtn @activeMyThought="activateMyThought" modalId="my_thought_modal"/>
        <MyThoughtForm/>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import MyThoughtForm from '../thoughts/my_thought_form.vue'
  import MyThoughtBtn from '../parts/my_thought_btn.vue'
  import CloseBtn from '../parts/close_btn.vue'

  export default {
    name: 'MyThought',

    props: {
      myThoughtActive: Boolean,
    },

    components: {
      MyThoughtForm,
      MyThoughtBtn,
      CloseBtn
    },

    methods:{
      activateMyThought () {
        this.$emit('activateMyThought')
        if (this.$mq === 'sp' && !this.myThoughtActive) {
          setTimeout(() => this.$bvModal.show('my_thought_modal'), 10)
        }
      },
    }
  }
</script>
