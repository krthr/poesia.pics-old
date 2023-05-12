import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const MESSAGE = 'No se pudo generar el poema. Inténtalo más tarde.'
const CODE = 'E_POEM_GENERATION'
const STATUS = 500

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new PoemGenerationException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class PoemGenerationException extends Exception {
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
