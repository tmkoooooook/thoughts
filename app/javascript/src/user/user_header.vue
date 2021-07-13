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
            <router-link to="/users">
              <i class="fa fa-house-user"></i>
              <span>ホーム</span>
            </router-link>
          </li>
          <li>
            <router-link to="/users">
              <i class="fa fa-user"></i>
              <span>プロフィール</span>
            </router-link>
          </li>
          <li>
            <router-link to="/users">
              <i class="fa fa-cog"></i>
              <span>設定</span>
            </router-link>
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
