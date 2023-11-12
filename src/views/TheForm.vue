<template>
  <div class="text-sm w-full mx-4">
    <div class="grid grid-cols-3 gap-2 my-4">
      <div class="col-span-1">
        Schulform:
        <select class="w-fit" v-model="selectedSchulform">
          <option
            :value="option.value"
            v-for="option in schulform"
            :key="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="col-span-1 w-full">
        Anrede:
        <div v-for="option in anrede" :key="option.value">
          <input
            type="radio"
            name="anredeGroup"
            :id="option.label"
            :value="option.value"
            v-model="selectedAnrede"
          />
          <label class="mx-2" :for="option.label">{{ option.label }}</label>
        </div>
      </div>
      <Slider @emittedLength="handleLength" />
    </div>

    <div class="w-full grid grid-cols-2 gap-2">
      <div class="col-span-2">
        <label class="mr-2">Name der SchülerIn:</label>
        <input type="text" name="Name" v-model="name" placeholder="Name" />
      </div>

      <TextAreaUi
        name=" Fachlich/Methodische Stärken"
        v-model="fachlicheStärken"
        placeholder="Für ein besseres Ergebnis für dem Fach ein Attribut hinzu (z.B. Deutsch (Rechtschreibung))"
      />
      <TextAreaUi
        name="Fachlich/Methodische Schwächen"
        v-model="fachlicheSchwächen"
        placeholder="Für ein besseres Ergebnis für dem Fach ein Attribut hinzu (z.B. Deutsch (Rechtschreibung))"
      />
      <TextAreaUi
        name="Soziale Stärken"
        v-model="sozialeStärken"
        placeholder="Auffälig positives im Sozialverhalten"
      />
      <TextAreaUi
        name="Soziale Schwächen"
        v-model="sozialeSchwächen"
        placeholder="Auffälig negatives im Sozialverhalten"
      />
      <TextAreaUi
        name="Ämter"
        v-model="ämter"
        placeholder="Klassensprecher, Streitschlichter o.Ä. engagement"
      />
      <TextAreaUi
        name="Organisatorisches"
        v-model="organisatorisches"
        placeholder="Unentschuldigte Fehlzeiten, Verspätung, Vergessenes Material o.Ä. "
      />

      <button class="m-4 col-span-2" @click="sendPromptAndReceiveResult()">
        senden
      </button>
    </div>
  </div>
  <Loading v-if="loading">loading...</Loading>
  <ResultOverlay
    @close-overlay="result = ''"
    :result="result"
    v-if="result"
    :studentName="name"
  />
</template>
<script setup>
import { computed, reactive, ref } from "vue";
import useOpenAi from "../composables/useOpenAi.ts";
import prompts from "../assets/prompts.json";
import TextAreaUi from "@/components/TextAreaUi.vue";
import Slider from "@/components/Slider.vue";
import ResultOverlay from "@/components/ResultOverlay.vue";
import Loading from "@/components/Loading.vue";

const name = ref("");
const fachlicheStärken = ref("");
const fachlicheSchwächen = ref("");
const sozialeStärken = ref("");
const sozialeSchwächen = ref("");
const organisatorisches = ref("");
const anzahlDerWörter = ref(200);
const ämter = ref("");
const result = ref("");
const loading = ref(false);

const { getResult, resultFromAI } = useOpenAi();

const handleLength = (value) => {
  anzahlDerWörter.value = value;
};

const schulform = reactive([
  {
    label: "Grundschule",
    value: "einer Grundschule",
    selected: true,
  },
  {
    label: "Klassen 5-8",
    value: "der Jahrgänge 5-8",
    selected: false,
  },
  {
    label: "Klassen 9-10",
    value: "der Jahrgänge 9-10",
    selected: false,
  },
  {
    label: "Oberstufe",
    value: "in der Oberstufe",
    selected: false,
  },
  {
    label: "Berufsschule",
    value: "einer Berufsschule",
    selected: false,
  },
]);
const selectedSchulform = ref(schulform[0].value);

const anrede = reactive([
  {
    label: "Direkte Anrede",
    value: "Direkte Anrede",
    selected: true,
  },
  {
    label: "Anrede in dritter Person",
    value: "Anrede in dritter Person",
    selected: false,
  },
]);
const selectedAnrede = ref(anrede[0].value);

const anredePrompt = computed(() => {
  return selectedAnrede.value === "Direkte Anrede"
    ? "Spreche den Schüler direkt an."
    : "Spreche über den Schüler in dritter Person.";
});

const sendPromptAndReceiveResult = async () => {
  window.scrollTo(0, 0);
  loading.value = true;
  const individualInfoPrompt = prompts.individualInformationPrompt
    .replace("${name.value}", name.value)
    .replace("${fachlicheStärken.value}", fachlicheStärken.value)
    .replace("${fachlicheSchwächen.value}", fachlicheSchwächen.value)
    .replace("${sozialeStärken.value}", sozialeStärken.value)
    .replace("${sozialeSchwächen.value}", sozialeSchwächen.value)
    .replace("${ämter.value}", ämter.value)
    .replace("${organisatorisches.value}", organisatorisches.value);
  await getResult(
    individualInfoPrompt,
    0,
    0,
    selectedSchulform.value,
    anredePrompt.value,
    anzahlDerWörter.value,
  );
  result.value = resultFromAI.value?.choices[0].message.content;
  loading.value = false;
};
</script>
<style></style>
