<template>
  <div class="container">
    <SideNav></SideNav>
    <div class="sec-right">
      <h1>ホーム</h1>
      <Message v-for="message in $store.state.postboard.messages" :uid="uid" :message-id="message.id"></Message>
    </div>
  </div>
  </div>
</template>
<style>
* {
  text-decoration: none;
  color: inherit;
  margin: 0;
}
body {
  background-color: midnightblue;
  color: white;
}
h1{
  border-style: solid;
  border-color: white;
  width: auto;
  padding-left: 10px;
  margin: auto;
}
input, textarea {
  width: 300px;
  height: 30px;
  border-radius: 10px;
  border-width: 1px;
  margin: 5px;
  padding: 5px;
  background-color: inherit;
  resize: none;
}
button {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background-color: indigo;
  color: white;
}
.container{
  display: flex;
  width: 100%;
}
.sec-right {
  width: 100%;
}
.wrapper {
  padding: 10px 0;
}
.div-btn {
  display: flex;
  justify-content: right;
}

</style>
<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      uid: '',
    };
  },
  methods: {
  },
  created() {
    this.$store.dispatch('postboard/upToDateMessagesAction');
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/login');
      }
      else this.uid = user.uid;
    })
    this.$store.dispatch('postboard/upToDatePostAction', 'all');
  },
};
</script>
