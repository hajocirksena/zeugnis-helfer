<template>
  <div class="bg-indigo-500 w-full p-4 flex justify-between">
    This could become the header
    <button v-if="isLoggedIn" @click="logout">Logout</button>
  </div>
</template>
<script setup>
import router from "@/router";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { onMounted, ref } from "vue";

const isLoggedIn = ref(false);

const logout = () => {
  signOut(getAuth()).then(() => {
    router.push("/");
  });
};

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
</script>

<style scoped></style>
