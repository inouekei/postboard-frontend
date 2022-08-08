import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyBwZFb4AsR1XXnZt6f1M2p2zBXzD7GUCzE",
      authDomain: "postboardpj.firebaseapp.com",
      projectId: "postboardpj",
      storageBucket: "postboardpj.appspot.com",
      messagingSenderId: "152301271935",
      appId: "1:152301271935:web:df14fba28331731825b84a",
      measurementId: "G-CMVMLW802P"
    }
  )
}
  
export default firebase
