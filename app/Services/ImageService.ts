import Logger from '@ioc:Adonis/Core/Logger'

import PoemGenerationException from 'App/Exceptions/PoemGenerationException'
import Sharp from 'sharp'

function toBase64(buffer: Buffer) {
  return `data:image/jpeg;base64,` + buffer.toString('base64')
}

export async function processImage(imgBuffer: Buffer) {
  try {
    Logger.info('processing image')

    const processedImage = Sharp(imgBuffer).jpeg().resize(800, null).withMetadata()

    const buffer = await processedImage.toBuffer()
    const previewBuff = await processedImage.resize(10, null).blur(10).toBuffer()

    const base64 = toBase64(buffer)
    const preview = toBase64(previewBuff)

    return { base64, buffer, preview }
  } catch (error) {
    Logger.error(error)
    throw new PoemGenerationException('E_IMAGE_NOT_PROCESSED')
  }
}

export function encodedImageToBuff(image: String) {
  image = image.replace('data:image/jpeg;base64,', '')
  return Buffer.from(image, 'base64')
}
