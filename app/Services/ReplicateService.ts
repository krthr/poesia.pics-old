import Env from '@ioc:Adonis/Core/Env'
import Logger from '@ioc:Adonis/Core/Logger'
import PoemGenerationException from 'App/Exceptions/PoemGenerationException'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: Env.get('REPLICATE_API_TOKEN'),
})

export async function getImageCaption(image: string) {
  try {
    Logger.info('getting image caption')

    const response = await replicate.run(
      'salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746',
      {
        input: {
          image,
        },
      }
    )

    const caption = (response as String)?.replace(/Caption:/, '').trim()
    if (!caption) {
      throw new Error('Empty caption')
    }

    return caption
  } catch (error) {
    Logger.error(error)
    throw new PoemGenerationException('E_IMAGE_CAPTION')
  }
}
