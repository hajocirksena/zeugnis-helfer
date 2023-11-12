<template>
  <div class="p-4 flex items-center flex-col">
    <h1>Melden Sie sich hier an:</h1>
    <input type="text" placeholder="E-Mail" v-model="eMail" />
    <input type="password" placeholder="Passwort" v-model="passwort" />
    <p v-if="errorMsg">{{ errorMsg }}</p>
    <button class="my-2" @click="register()">Anmelden</button>
    <button class="my-2" @click="signInWithGoogle()">
      Mit Google anmelden
    </button>
    <div>
      Noch kein Account? Hier <a href="/views/sign-up">registrieren</a>.
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import router from "@/router";

const eMail = ref();
const passwort = ref();
const errorMsg = ref();

const register = () => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, eMail.value, passwort.value)
    .then((userCredential) => {
      console.log("Erfolgreich registriert");
      router.push("/views/form");
    })
    .catch((error) => {
      console.error(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "Ungültige E-Mail";
          break;
        case "auth/user-not-found":
          errorMsg.value = "Kein Account mit dieser Email gefunden";
          break;
        case "auth/wrong-password":
          errorMsg.value = "Falsches Passwort";
          break;
        default:
          errorMsg.value = "E-Mail oder Passwort falsch";
      }
    });
};
const signInWithGoogle = () => {
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
