<template>
  <div class="p-4 flex items-center flex-col">
    <h1>Willkommen zur Registrierung</h1>
    <input type="text" placeholder="E-Mail" v-model="eMail" />
    <input type="password" placeholder="Passwort" v-model="passwort" />
    <button class="my-2" @click="register()">Registrieren</button>
    <button class="my-2" @click="signUpWithGoogle()">
      Registrierung mit Google
    </button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import router from "@/router";

const eMail = ref();
const passwort = ref();

const register = () => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, eMail.value, passwort.value)
    .then((userCredential) => {
      router.push("/views/form");
    })
    .catch((error) => {
      console.error(error.code);
      alert("Hier ist etwas schiefgelaufen");
    });
};
const signUpWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      router.push("/views/form");
    })
    .catch((error) => {
      console.error(error.code);
    });
};
</script>

<style scoped></style>
