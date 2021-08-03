<template>
  <img v-if="!imageUrl" src="~thoughts_logo_white.png" alt="user-thumbnail">
  <img v-else :src="imageUrl" alt="user-thumbnail">
</template>

<script>
export default {
  name: 'UserImage',
  props: { imageUrl: String }
}
</script>
