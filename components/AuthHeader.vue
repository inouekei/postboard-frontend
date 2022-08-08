<template>
  <header>
    <img src="~/assets/logo.png" width="150px"></img>
    <div class="auth-menu">
      <NuxtLink to="/register">新規登録</NuxtLink>
      <NuxtLink to="/login">ログイン</NuxtLink>
    </div>
  </header>
</template>
<style>
header{
  display: flex;
  justify-content: space-between;
}
.auth-menu{
  width: 200px;
  display: flex;
  justify-content: space-around;
  padding: 10px;
}
</style>
<script>
</script>