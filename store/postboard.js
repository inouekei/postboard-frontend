import firebase from '~/plugins/firebase'

export const state = () => ({
  messages: [],
  currentUser: null,
  visiblePost: null
});

export const mutations = {
  upToDateMessagesMutation(state, payload) {
    state.messages = payload;
  },
  upToDateUserMutation(state, payload) {
    state.currentUser = payload;
  },
  upToDatePostMutation(state, payload) {
    state.visiblePost = payload;
  }
}

export const actions = {
  async upToDateMessagesAction(context) {
    const resData = await this.$axios.get(
      "http://127.0.0.1:8000/api/v1/post/"
    );
    context.commit("upToDateMessagesMutation", resData.data.data);
  },
  upToDateUserAction(context) {
    firebase.auth().onAuthStateChanged((user) => {
      context.commit("upToDateUserMutation", user);
    })
  },
  upToDatePostAction(context, postId) {
    context.commit("upToDatePostMutation", postId);
  },
}