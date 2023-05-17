import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NoAuthMiddleware {
  protected redirectTo = '/'

  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.isLoggedIn) {
      return response.redirect(this.redirectTo)
    }

    await next()
  }
}
