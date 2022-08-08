<template>
  <div>
    <AuthHeader></AuthHeader>
    <div class="auth-body">
      <div class="auth-ttl">新規登録</div>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="{ errors }" rules="max:20">
          <input v-model="name" id="ユーザーネーム" type="text" placeholder="ユーザーネーム" required />
          <div class="error">{{ errors[0] }}</div>
        </validation-provider>
        <input v-model="email" type="email" placeholder="メールアドレス" required />
        <br />
        <input v-model="password" type="password" placeholder="パスワード" required />
        <br />
        <button @click="register" :disabled="ObserverProps.invalid || !ObserverProps.validated">新規登録</button>
      </validation-observer>
    </div>
  </div>
</template>
<style>
*{
  text-decoration: none;
  color: inherit;
}
body {
  background-color: midnightblue;
  color: white;
}
input,
textarea {
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
.auth-body{
  width: 400px;
  margin: 30vh auto;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  color: black;
  text-align: center;
}
.auth-ttl{
  margin: 10px;
  font-weight: bold;
  color:black;
}
.error{
  margin: 0;
  padding: 0;
  font-size: 8px;
}
</style>
<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
      uid: null,
    }
  },
  methods: {
    register() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.uid = data.user.uid
          data.user.updateProfile({
            displayName: this.name,
          });
        })
        .then(() => {
          alert('ユーザ登録が完了しました')
          const sendData = {
            name: this.name,
            email: this.email,
            uid: this.uid
          };
          this.$axios.post("http://127.0.0.1:8000/api/v1/user/", sendData)
          this.$router.push('/login')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
  },
}
</script>