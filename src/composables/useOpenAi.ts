import OpenAI from "openai";
import { ref } from "vue";
//@ts-ignore
import prompts from "../assets/prompts.json";

const maxTokens = 50;

const useOpenAi = () => {
  const openai = new OpenAI({
    apiKey: "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", // NEVER COMMIT YOUR API KEY
    dangerouslyAllowBrowser: true,
  });
  const resultFromAI = ref<OpenAI.Chat.Completions.ChatCompletion>();
  const getResult = async (
    individualInformationPrompt: string,
    temperature: number,
    top_p: number,
    selectedSchulform: string,
    anredePrompt: string,
    länge: number,
  ) => {
    const systemprompt = prompts.systemprompt
      .replace("${schultyp.value}", selectedSchulform)
      .replace("${anredePrompt}", anredePrompt);
    const längeprompt = prompts.längeprompt.replace("${länge.value}", länge);
    // @ts-ignore
    resultFromAI.value = await openai.chat.completions.create({
      messages: [
        { role: "user", content: individualInformationPrompt },
        { role: "system", content: systemprompt + längeprompt },
      ],
      model: "gpt-4",
      temperature: temperature,
      top_p: top_p,
      max_tokens: länge * 3,
    });
  };

  return {
    resultFromAI,
    getResult,
  };
};

export default useOpenAi;
