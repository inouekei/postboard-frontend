<template>
  <div class="div-side">
    <img src="~/assets/logo.png" width="150px"></img>
    <div class="link-wrapper" @click="home">
      <img class="div-mark" src="~/assets/home.png" width="30px"></img>ホーム
    </div>
    <div class="link-wrapper" @click="logout">
      <img src="~/assets/logout.png" width="30px" class="div-mark"></img>ログアウト
    </div>
    <div>シェア</div>
    <validation-observer ref="obs" v-slot="ObserverProps">
      <validation-provider v-slot="{ errors }" rules="max:120">
        <textarea v-model="content" id="投稿内容" required></textarea>
        <div class="error">{{ errors[0] }}</div>
      </validation-provider>
      <div class="div-btn">
        <button @click="storePost" :disabled="ObserverProps.invalid || !ObserverProps.validated">シェアする</button>
      </div>
    </validation-observer>
  </div>
</template>
<style>
#投稿内容 {
  width: 150px;
  height: 150px;
  border-color: white;
}
.div-side{
  padding: 20px;
}
.link-wrapper{
  display: flex;
  align-items: center;
}
</style>
<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      content: '',
    }
  },
  methods: {
    async storePost() {
      const user = firebase.auth().currentUser;
      const sendData = {
        content: this.content,
        uid: user.uid
      };
      await this.$axios.post("http://127.0.0.1:8000/api/v1/post/", sendData);
      this.$store.dispatch('postboard/upToDateMessagesAction')
    },
    home() {
      this.$router.push('/')
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました')
          this.$router.push('/login')
        })
    },
  },
}
</script>