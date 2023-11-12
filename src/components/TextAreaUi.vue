<template>
  <div>
    <label class="block text-sm font-medium">{{ name }}:</label>
    <textarea
      :name="name"
      :value="modelValueRef"
      @input="onInput"
      :placeholder="placeholder"
      class="w-full text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      ref="textareaRef"
      :style="{ height: `${textareaHeight}px` }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";

const props = defineProps({
  name: String,
  modelValue: String,
  placeholder: String,
});

const modelValueRef = ref(props.modelValue);

const textareaRef = ref(null);
const textareaHeight = ref(0);

onMounted(() => {
  setTextareaHeight();
});

watch(modelValueRef, () => {
  // Nach einer kurzen Verzögerung (nextTick) die Höhe des Textfelds aktualisieren
  nextTick(() => {
    setTextareaHeight();
  });
});

function setTextareaHeight() {
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
}

function onInput(event) {
  // Beim Eingabeevent die Model-Value aktualisieren
  modelValueRef.value = event.target.value;
}
</script>
