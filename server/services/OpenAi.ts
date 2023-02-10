import { Configuration, OpenAIApi } from "openai";
import { logger } from "../logger";

const runtimeConfig = useRuntimeConfig();
const configuration = new Configuration({
  apiKey: runtimeConfig.openaiApiKey,
});

const openai = new OpenAIApi(configuration);

interface Options {
  frequency_penalty?: number;
  temperature?: number;
  max_tokens?: number;
}

export async function createCompletion(prompt: string, options: Options = {}) {
  try {
    options.max_tokens = options.max_tokens || 300;
    options.temperature = options.temperature || 0.8;
    options.frequency_penalty = options.frequency_penalty || 0.5;

    const response = await openai.createCompletion({
      model: runtimeConfig.openaiModel,
      prompt,
      ...options,
    });

    const text = response.data.choices.at(0)?.text?.trim();
    return text;
  } catch (error: any) {
    logger.error(error);

    // if (error.response?.status === 429) {
    //   return {
    //     error:
    //       "Oops. Estamos recibiendo demasiadas peticiones en estos momentos. Por favor, inténtalo dentro de unos segundos.",
    //   };
    // }

    return;
  }
}
