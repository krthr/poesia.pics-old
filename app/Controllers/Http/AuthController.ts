import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Limiter } from '@adonisjs/limiter/build/services'
import AuthValidator from 'App/Validators/AuthValidator'
import User from 'App/Models/User'
import UserAlreadyExistException from 'App/Exceptions/UserAlreadyExistException'
import TooManyRequestException from 'App/Exceptions/TooManyRequestException'

export default class AuthController {
  private async createLimiter(action: string, key: string) {
    const limiter = Limiter.use({
      requests: 10,
      duration: '15 mins',
      blockDuration: '30 mins',
    })

    const throttleKey = `${action}_${key}`
    if (await limiter.isBlocked(throttleKey)) {
      throw new TooManyRequestException('Límite de intentos alcanzado. Inténtalo más tarde.')
    }

    return { limiter, throttleKey }
  }

  public async join({ auth, request, response, session, view }: HttpContextContract) {
    session.flashExcept(['_csrf'])

    if (request.intended() === 'GET') {
      return view.render('pages/join')
    }

    const body = await request.validate(AuthValidator)
    const username = body.username
    const password = body.password

    const limit = await this.createLimiter('join', username)
    await limit.limiter.increment(limit.throttleKey)

    const alreadyExists = await User.findBy('username', username)
    if (alreadyExists) {
      throw new UserAlreadyExistException()
    }

    const user = await User.create({ username, password })
    await auth.use('web').login(user, true)

    await limit.limiter.delete(limit.throttleKey)

    return response.redirect('/')
  }

  public async login({ auth, request, response, session, view }: HttpContextContract) {
    session.flashExcept(['_csrf'])

    if (request.intended() === 'GET') {
      return view.render('pages/login')
    }

    const body = await request.validate(AuthValidator)
    const username = body.username
    const password = body.password

    const limit = await this.createLimiter('login', username)
    await limit.limiter.increment(limit.throttleKey)

    await auth.attempt(username, password)
    await limit.limiter.delete(limit.throttleKey)

    return response.redirect('/')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect('/login')
  }
}
