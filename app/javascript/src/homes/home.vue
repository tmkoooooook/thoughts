<template>
<div class="main">
  <div class="main-content">
    <div class="container">
      <h1 class="main-content-head">
        <img src="~thoughts_logo_005163.png" alt="thoughts_logo">
      </h1>
    </div>
    <div class="main-content-box">
      <p class="main-content-text">Update Your Thoughts</p>
      <ul class="main-content-nav">
        <li>
          <router-link :to="{ name: 'signIn' }" class="btn btn-light">Log in</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'signUp' }" class="btn btn-outline-light">Sign up</router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="introduction">
    <div class="container">
      <div class="introduction-content">
        <h2 class="introduction-head">thoughtsとは</h2>
        <div class="introduction-text">
          <p>
            あなたの考えを共有し、あなたの知らない考えを発見できるアプリケーションです。
            <br>
            thoughtsであなたの知らない考えを発見し、さらに自分の考えを深めることができます。
            <br>
            あなたの知らない考えを発見したとしても、否定するだけではアップデートはされません。
            <br>
            否定できる根拠はあるのか、その根拠は根拠たり得るのか、考えてみましょう。
            <br>
            根拠が出てこないのであれば、それは、見えていない世界があるかもしれません。
            <br>
            その場合、まず無知の知を知り、根拠となる理由を自ら見つけていきましょう。
            <br>
          </p>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <div class="footer-box">
      <div class="footer-image">
        <router-link :to="{ name: 'home'}">
          <img src="~thoughts_logo_white.png" alt="thoughts_logo">
        </router-link>
      </div>
      <div class="footer-copyright">
        <small>
          ©2021-{{ date | moment('YYYY') }} thoughts
        </small>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
  import 'thoughts_logo_005163.png'

  export default {
    name: 'home',
    data: function () {
      return {
        date: this.$moment().format()
      }
    }
  }
</script>
