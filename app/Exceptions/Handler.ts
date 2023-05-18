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
    switch (error.code) {
      case 'E_IMAGE_CAPTION':
      case 'E_IMAGE_NOT_PROCESSED':
      case 'E_POEM_GENERATION': {
        ctx.session.flash('error', error.message)
        return ctx.response.redirect('/')
      }

      case 'E_VALIDATION_FAILURE': {
        ctx.session.flash('error', error.messages.errors[0].message)
        return ctx.response.redirect(ctx.request.url())
      }

      case 'E_INVALID_AUTH_UID': {
        ctx.session.flash('error', 'Usuario no encontrado')
        return ctx.response.redirect('/login')
      }

      case 'E_UNAUTHORIZED_ACCESS': {
        ctx.session.flash('error', 'Debes iniciar sesión')
        return ctx.response.redirect('/login')
      }

      case 'E_INVALID_AUTH_PASSWORD': {
        ctx.session.flash('error', 'Contraseña inválida')
        return ctx.response.redirect('/login')
      }

      case 'E_USER_ALREADY_EXISTS': {
        ctx.session.flash('error', 'El usuario ya se encuentra en uso.')
        return ctx.response.redirect('/join')
      }

      default: {
        return super.handle(error, ctx)
      }
    }
  }
}
