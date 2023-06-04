import { BaseCommand } from '@adonisjs/core/build/standalone'
// import Poem from 'App/Models/Poem'
// import { encodedImageToBuff, processImage } from 'App/Services/ImageService'

export default class UpdatePoemsPhoto extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'update:poems_photo'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    this.logger.info('Hello world!')

    // const poems = await Poem.query().whereNull('photo').orWhereNull('photo_preview')

    // for (const poem of poems) {
    //   this.logger.info(`processing poem id=${poem.id}`)

    //   const imgBuff = encodedImageToBuff(poem.image)
    //   const { buffer, preview } = await processImage(imgBuff)

    //   poem.photo = buffer
    //   poem.photoPreview = preview

    //   await poem.save()
    // }
  }
}
