<template>
  <div class="bg-indigo-500 w-full p-4 flex justify-between h-16">
    header
    <div class="flex items-end">
      <div>
        <router-link class="mr-4 text-gray-300" to="/views/form"
          >Helferlein</router-link
        >
      </div>
      <div>
        <router-link class="text-gray-300 mr-4" to="/views/results"
          >Results</router-link
        >
      </div>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </div>
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
