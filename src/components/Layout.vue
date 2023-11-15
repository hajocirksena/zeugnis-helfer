<template>
  <Header class="fixed top-0" />
  <div class="mt-24 mx-8">
    <slot />
  </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
</script>
