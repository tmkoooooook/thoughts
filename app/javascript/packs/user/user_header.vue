<template>
  <header class="user-header">
    <div class="user-nav">
      <div class="image-wrapper">
        <router-link to="/users">
          <img src="~thoughts_logo_white.png" alt="thoughts_logo">
        </router-link>
      </div>
      <nav>
        <ul class="user-nav-list">
          <li>
            <i class="fa fa-house-user"></i>
            <router-link to="/users">ホーム</router-link>
          </li>
          <li>
            <i class="fa fa-user"></i>
            <router-link to="/users">プロフィール</router-link>
          </li>
          <li>
            <i class="fa fa-cog"></i>
            <router-link to="/users">設定</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
  import 'thoughts_logo_white.png'

  export default {
    name: 'UserHeader'
  }
</script>
