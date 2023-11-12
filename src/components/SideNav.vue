<template>
  <div class="bg-blue-950 w-[250px] p-4">
    <div>
      <button class="rounded-full" @click="$emit('close-menu')">X</button>
    </div>
    <div>
      <router-link to="/">Home</router-link>
    </div>
    <div>
      <router-link to="/views/results">Results</router-link>
    </div>
    <div>
      <router-link to="/views/sign-up">Sign up</router-link>
    </div>
    <div>
      <router-link to="/views/sign-in">Sign in</router-link>
    </div>
    <div>
      <router-link to="/views/form">The Form</router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
