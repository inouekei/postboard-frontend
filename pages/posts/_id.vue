<template>
  <div class="container">
    <SideNav></SideNav>
    <div class="sec-right">
      <h1>コメント</h1>
      <Message v-for="message in $store.state.postboard.messages" :uid="uid" :message-id="message.id"></Message>
      <h3>コメント</h3>
      <div class="div-comment" v-for="comment in comments">
        <div class="wrapper">
          <div>
            <h4>{{comment.username}}</h4>
            <p>{{comment.content}}</p>
          </div>
          <img v-if="comment.myComment" @click="destroyComment(comment.id)" src="~/assets/cross.png" width="50px"></img>
        </div>
      </div>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="{ errors }" rules="max:120">
          <input id="コメント" type="text" v-model="content"></input>
          <div class="error">{{ errors[0] }}</div>
        </validation-provider>
        <div class="div-btn">
          <button @click="storeComment($route.params.id)"
            :disabled="ObserverProps.invalid || !ObserverProps.validated">コメント</button>
        </div>
      </validation-observer>
    </div>
  </div>
  </div>
</template>
<style>
h3 {
  width: auto;
  border-style: solid;
  border-color: white;
  text-align: center;
}
.div-comment{
  border-style: solid;
  border-color: white;
  padding: 8px;
}
#コメント{
  width: 90%;
  height: 30px;
  border-style: solid;
  border-color: white;
}
</style>
<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      uid: '',
      comments: [],
      content: '',
    };
  },
  computed: {
  },
  methods: {
    async getComments(postId) {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/v1/post/" + postId);
      this.comments = resData.data.data.comments;
      for (let i = 0; i < this.comments.length; i++){
        if (this.comments[i]['uid'] === this.uid){
          this.comments[i]['myComment'] = true;
        } else {
          this.comments[i]['myComment'] = false;
        }
      }
    },
    async storeComment(id) {
      const sendData = {
        post_id: id,
        uid: this.uid,
        content: this.content,
      };
      const resData = await this.$axios.post("http://127.0.0.1:8000/api/v1/comment/", sendData);
      this.getComments(id)
    },
    async destroyComment(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/v1/comment/" + id);
      this.getComments(this.$route.params.id)
    },
  },
  created() {
    this.$store.dispatch('postboard/upToDatePostAction', this.$route.params.id);
    this.$store.dispatch('postboard/upToDateMessagesAction');
    this.getComments(this.$route.params.id);
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/login');
      }
      else this.uid = user.uid;
    })
  },
};
</script>
