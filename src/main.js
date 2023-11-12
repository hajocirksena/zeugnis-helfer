import { createApp } from "vue";
import { createPinia } from "pinia";
import { getFirestore } from "firebase/firestore";
import App from "./App.vue";
import "./style.css";
import router from "./router";
const pinia = createPinia();

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXI6fRUBoWGAITxiJ3FwHun50kNZHV41o",
  authDomain: "zeugnishelfer.firebaseapp.com",
  projectId: "zeugnishelfer",
  storageBucket: "zeugnishelfer.appspot.com",
  messagingSenderId: "644983958520",
  appId: "1:644983958520:web:048706466d42459c84c40d",
  measurementId: "G-DFQ5JQ4HR3",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();
export default db;

const app = createApp(App);
app.use(pinia);
app.use(router);

app.mount("#app");
