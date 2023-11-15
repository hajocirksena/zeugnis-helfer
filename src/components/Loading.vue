<template>
  <div class="fixed top-0 w-full opacity-90 bg-gray-500 h-[100vh]"></div>
  <div class="absolute inset-0 flex flex-col justify-center items-center">
    <div class="spinner"></div>
  <div class="font-semibold mt-16 w-96 text-gray-900">
    Die Schülerbeurteilung für {{ processedStudentName }}  wird generiert. Bitte haben einen kleinen Moment geduld.
  </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';

const { studentName } = defineProps(['studentName']);

const processedStudentName = computed(() => studentName || "deine/n Schüler/in");
</script>

<style scoped>
.spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
