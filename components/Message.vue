<template>
  <div class="div-message" v-if="isShow">
    <div>
      <div class="wrapper">
        <h2>{{message.username}}</h2>
        <img v-if="!myLike" src="~/assets/heart.png" class="div-mark" @click="storeLike()"></img>
        <div v-else class="div-mark"></div>
        <div class="div-mark">{{likesNum}}</div>
        <img v-if="myLike" src="~/assets/cross.png" class="div-mark" @click="destroyLike(myLikeId)"></img>
        <div v-else class=" div-mark">
        </div>
        <div v-if="isIndex" class="div-mark"></div>
        <img v-if="isIndex" src="~/assets/detail.png" class="div-mark" @click="getComments(messageId)"></img>
      </div>
      <p>{{message.content}}</p>
    </div>
    <img v-if="myPost" @click="destroyPost(messageId)" src="~/assets/cross.png" width="50px" height="50px"></img>
  </div>
</template>
<style>
.div-message{
  border-width: 1px;
  border-color: white;
  border-style: solid;
  width: auto;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
}
.div-mark{
  width: 30px;
  height: 30px;
  margin: 5px;
}
</style>
<script>
import firebase from '~/plugins/firebase'
export default {
  props: {
    uid: '',
    messageId: '',
  }, 
  data() {
    return {
      myLikeId: null,
    }
  },
  computed: {
    isShow() {
      if (this.$store.state.postboard.visiblePost === 'all') {
        return true;
      } else if (this.$store.state.postboard.visiblePost == this.messageId){
        return true;
      }
    },
    messages() {
      return this.$store.state.postboard.messages;
    },
    message() {
      for (let i = 0; i < this.messages.length; i++){
        if (this.messages[i]['id'] === this.messageId) {
          return this.messages[i];
        }
      }
    },
    isIndex() {
      if(this.$store.state.postboard.visiblePost === 'all'){
        return true;
      } else {
        return false;
      } 
    },
    myPost() {
      if (this.uid === this.message.uid) {
        return true;
      }
      else return false;
    },
    myLike() {
      for (let i = 0; i < this.message.likes.length; i++) {
          if (this.message.likes[i]['uid'] == this.uid) {
            this.myLikeId = this.message.likes[i]['id'];
            return true;
          }
      } 
      return false;
    },
    likesNum() {
      if (this.message.hasOwnProperty('likes')) {
        return this.message.likes.length;
      }
    },
  },
  methods: {
    getComments(id) {
      this.$router.push('/posts/' + id );
    },
    async destroyPost(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/v1/post/" + id);
      this.$store.dispatch('postboard/upToDateMessagesAction')
    },
    async storeLike() {
      const sendData = {
        post_id: this.messageId,
        uid: this.uid,
      };
      await this.$axios.post("http://127.0.0.1:8000/api/v1/like/", sendData);
      this.$store.dispatch('postboard/upToDateMessagesAction')
    },
    async destroyLike(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/v1/like/" + id);
      this.$store.dispatch('postboard/upToDateMessagesAction')
    },
  },
  created() {
  },
}
</script>