import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthValidator from 'App/Validators/AuthValidator'
import { Exception } from '@adonisjs/core/build/standalone'
import User from 'App/Models/User'

export default class AuthController {
  public async join({ auth, request, response, session, view }: HttpContextContract) {
    session.flashExcept(['_csrf'])

    if (request.intended() === 'GET') {
      return view.render('pages/join')
    }

    const body = await request.validate(AuthValidator)

    console.log({ body })

    const username = body.username
    const password = body.password

    const alreadyExists = await User.findBy('username', username)
    if (alreadyExists) {
      throw new Exception('El usuario ya existe.', 300, 'E_USER_ALREADY_EXISTS')
    }

    const user = await User.create({ username, password })
    await auth.use('web').login(user, true)

    return response.redirect('/')
  }

  public async login({ auth, request, response, session, view }: HttpContextContract) {
    session.flashExcept(['_csrf'])

    if (request.intended() === 'GET') {
      return view.render('pages/login')
    }

    const body = await request.validate(AuthValidator)

    console.log({ body })

    const username = body.username
    const password = body.password

    await auth.attempt(username, password)

    return response.redirect('/')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect('/login')
  }
}
