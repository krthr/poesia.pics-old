import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Poem from 'App/Models/Poem'
import StorePoemValidator from 'App/Validators/StorePoemValidator'
import { generatePoem } from 'App/Services/PoemsService'
import { schema } from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'

export default class PoemsController {
  public async index({ view }: HttpContextContract) {
    return view.render('pages/index')
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const body = await request.validate(StorePoemValidator)
    const generatedPoem = await generatePoem(body.image.tmpPath!, body.lang, body.mood)
    const newPoem = await Poem.create({
      userId: auth.user?.id,
      ...generatedPoem,
    })

    return response.redirect().toRoute('PoemsController.show', { id: newPoem.id })
  }

  public async show({ auth, request, response, view }: HttpContextContract) {
    const id = request.param('id')
    const poem = await Poem.query().where('id', id).preload('user').first()

    if (!poem) {
      return response.redirect('/')
    }

    if (!poem.isPublic && poem.user?.id !== auth.user?.id) {
      return response.redirect('/')
    }

    return view.render('pages/poem', { poem })
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({ is_public: schema.boolean.optional() }),
    })

    const id = request.param('id')
    const poem = await Poem.query()
      .where('id', id)
      .andWhere('user_id', auth.user!.id)
      .preload('user')
      .first()

    if (!poem) {
      return response.redirect().toRoute('PoemsController.userPoems')
    }

    poem.isPublic = !!body.is_public
    await poem.save()

    return response.redirect().toRoute('PoemsController.update', { id: poem.id })
  }

  public async userPoems({ auth, request, response, view }: HttpContextContract) {
    const username = request.param('username')
    const page = request.input('page', 1)

    const user = await User.findBy('username', username)

    if (!user) {
      return response.redirect('/')
    }

    const query = Poem.query().where('user_id', user.id)

    if (user.id !== auth.user?.id) {
      query.andWhere('is_public', true)
    }

    const poems = await query.preload('user').paginate(page, 50)
    return view.render('pages/user', { poems, user })
  }

  public async explore({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const poems = await Poem.query().where('is_public', true).preload('user').paginate(page, 30)
    return view.render('pages/explore', { poems })
  }
}
