<template>
  <div class="fixed top-0 w-full opacity-80 bg-gray-500 h-[100vh]"></div>
  <div class="box p-8 w-full flex flex-col">
    <button class="absolute top-2 right-2 rounded-full" @click="closeOverlay()">
      x
    </button>
    <TextAreaUi name="Mein Vorschlag" v-model="receivedResult" />
    <button @click="saveResult()">Speichern</button>
  </div>
</template>
<script setup>
import TextAreaUi from "@/components/TextAreaUi.vue";
import { ref, defineEmits } from "vue";
import useFirebase from "@/composables/useFirebase";

const { sendToFirebase } = useFirebase();

const { result, studentName } = defineProps({
  result: String,
  studentName: String,
});
const receivedResult = ref(result);
const receivedStudentName = ref(studentName);

const emit = defineEmits(["closeOverlay"]);

const saveResult = async () => {
  await sendToFirebase(receivedStudentName.value, receivedResult.value);
  closeOverlay();
};

const closeOverlay = () => {
  receivedResult.value = "";
  emit("closeOverlay");
};
</script>

<style scoped>
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 95%;
  width: 80%;
  border-radius: 20px;
  z-index: 10;
  background: linear-gradient(135deg, rgba(31, 9, 92), rgba(4, 4, 42));
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
