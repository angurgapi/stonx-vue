import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import { firebase } from '@firebase/app'
import store from "./store";
import './layout.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import ScrollLoader from 'vue-scroll-loader'
import router from './router/router'


Vue.config.productionTip = false
Vue.use(ScrollLoader)
Vue.use(Vuelidate)

const firebaseConfig = {
  apiKey: "AIzaSyB5jcuYUAzp1_S0UkiAhXyLwXwTVc3cAGs",
  authDomain: "stonks-9a8fb.firebaseapp.com",
  projectId: "stonks-9a8fb",
  storageBucket: "stonks-9a8fb.appspot.com",
  messagingSenderId: "157306008205",
  appId: "1:157306008205:web:0e1a38249f4c3e88d7a8c4",
  measurementId: "G-3SGNG1L2BN"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
