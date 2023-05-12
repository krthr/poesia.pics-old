import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const MESSAGE = 'No se ha podido procesar la imagen. Intenta usando otra.'
const CODE = 'E_IMAGE_NOT_PROCESSED'
const STATUS = 422

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ImageNotProcessedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ImageNotProcessedException extends Exception {
  constructor() {
    super(MESSAGE, STATUS, CODE)
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send({
      errors: [
        {
          code: CODE,
          message: MESSAGE,
        },
      ],
    })
  }
}
