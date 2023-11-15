<template>
  <div class="md:grid md:grid-cols-2 mx-20 mt-12">
    <div class="md:col-span-1 p-4 flex justify-center flex-col">
      <H1>Willkommen beim Zeugnishelfer. </H1>
      <h3>Die App um bei Schülerbeurteilungen zu helfen.</h3>
    </div>
    <div class="md:col-span-1 p-4">
      <SignIn />
    </div>
  </div>
</template>
<script setup>
import SignIn from "/src/components/SignIn.vue";
</script>

<style scoped></style>
