<template>
  <div class="my-6 md:my-2 col-span-1">
    Anzahl der Wörter (ca.):
    <div>
      <input
        type="range"
        min="10"
        max="400"
        step="10"
        v-model="value"
        @input="emitValue"
      />

      <div>Ca. {{ value }} Wörter</div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const value = ref(200);

const emit = defineEmits(["emittedLength"]);
const emitValue = () => {
  emit("emittedLength", value.value);
};
</script>

<style scoped></style>
