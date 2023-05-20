import { Exception } from '@adonisjs/core/build/standalone'

const CODES = ['E_IMAGE_CAPTION', 'E_IMAGE_NOT_PROCESSED', 'E_POEM_GENERATION'] as const
type Code = (typeof CODES)[number]

const ERRORS: Record<Code, { message: string; status: number }> = {
  E_IMAGE_CAPTION: {
    message: 'No se ha podido obtener una descripción de la imagen. Intenta usando otra.',
    status: 422,
  },

  E_IMAGE_NOT_PROCESSED: {
    message: 'No se ha podido procesar la imagen. Intenta usando otra.',
    status: 422,
  },

  E_POEM_GENERATION: {
    message: 'No se pudo generar el poema. Inténtalo más tarde.',
    status: 500,
  },
} as const

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
  public rawMessage: string

  constructor(code: Code) {
    const message = ERRORS[code].message
    super(message, ERRORS[code].status, code)
    this.rawMessage = message
  }
}
