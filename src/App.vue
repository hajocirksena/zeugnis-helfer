<template>
  <router-view v-if="!isLoggedIn" />
  <div v-if="isLoggedIn">
    <Header />
    <div class="flex">
      <SideNav v-if="sidebarVisible" @close-menu="sidebarVisible = false" />
      <div v-if="!sidebarVisible">
        <button
          v-if="!sidebarVisible"
          class="rounded-full m-4"
          @click="sidebarVisible = true"
        >
          >
        </button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import SideNav from "@/components/SideNav.vue";
import Header from "@/components/Header.vue";
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const sidebarVisible = ref(false);

const isLoggedIn = ref(false);

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
</script>
