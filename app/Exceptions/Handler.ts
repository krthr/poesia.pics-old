/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract): Promise<any> {
    if (
      [
        'E_VALIDATION_FAILURE',
        'E_IMAGE_CAPTION',
        'E_IMAGE_NOT_PROCESSED',
        'E_POEM_GENERATION',
      ].includes(error.code)
    ) {
      console.error(error)
      ctx.session.flash('error', error.messages?.errors[0]?.message)
      return ctx.view.render('pages/index')
    }

    return super.handle(error, ctx)
  }
}
