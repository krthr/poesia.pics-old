import { Configuration, OpenAIApi } from 'openai'
import Env from '@ioc:Adonis/Core/Env'
import Logger from '@ioc:Adonis/Core/Logger'
import PoemGenerationException from 'App/Exceptions/PoemGenerationException'

const configuration = new Configuration({
  apiKey: Env.get('OPENAI_KEY'),
})

const openai = new OpenAIApi(configuration)

interface Options {
  frequency_penalty?: number
  temperature?: number
  max_tokens?: number
}

export async function createCompletion(prompt: string, options: Options = {}) {
  try {
    Logger.info('creating completion')

    options.max_tokens = options.max_tokens || 300
    options.temperature = options.temperature || 0.8
    options.frequency_penalty = options.frequency_penalty || 0.5

    const response = await openai.createChatCompletion({
      model: Env.get('OPENAI_MODEL', 'gpt-3.5-turbo	'),
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      ...options,
    })

    const poem = response.data.choices.at(0)?.message?.content.trim()
    if (!poem) {
      throw new Error('Poema vacío.')
    }

    return poem
  } catch (error) {
    Logger.error(error)
    throw new PoemGenerationException('E_POEM_GENERATION')
  }
}
