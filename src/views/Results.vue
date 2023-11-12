<template>
  <div>
    <h1>Schülerbeurteilungen:</h1>
    <ul>
      <li v-for="(item, index) in subCollectionData" :key="index" class="p-4">
        <div>Name: {{ item.name }}</div>
        <div>Ergebnis: {{ item.content }}</div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import useFirebase from "@/composables/useFirebase";

const { getFromFirebase } = useFirebase();
const subCollectionData = ref([]);

onMounted(async () => {
  const data = await getFromFirebase();
  subCollectionData.value = data;
});
</script>

<style scoped></style>
