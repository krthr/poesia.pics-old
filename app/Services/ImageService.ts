import Logger from '@ioc:Adonis/Core/Logger'

import PoemGenerationException from 'App/Exceptions/PoemGenerationException'
import Sharp from 'sharp'
// import NodeVibrant from 'node-vibrant'

export async function processImage(imgBuffer: Buffer) {
  try {
    Logger.info('processing image')

    const buffer = await Sharp(imgBuffer).jpeg().resize(800, null).withMetadata().toBuffer()
    const base64 = `data:image/jpeg;base64,` + buffer.toString('base64')
    // const colors = await NodeVibrant.from(buffer).getPalette()

    return { base64, buffer }
  } catch (error) {
    Logger.error(error)
    throw new PoemGenerationException('E_IMAGE_NOT_PROCESSED')
  }
}
