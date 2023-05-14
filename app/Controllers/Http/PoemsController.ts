import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Poem from 'App/Models/Poem'
import StorePoemValidator from 'App/Validators/StorePoemValidator'
import { generatePoem } from 'App/Services/PoemsService'

export default class PoemsController {
  public async index({ view }: HttpContextContract) {
    return view.render('pages/index')
  }

  public async store({ request, response }: HttpContextContract) {
    const body = await request.validate(StorePoemValidator)
    const generatedPoem = await generatePoem(body.image.tmpPath!, body.lang, body.mood)
    const newPoem = await Poem.create(generatedPoem)

    return response.redirect().toRoute('PoemsController.show', { id: newPoem.id })
  }

  public async show({ request, response, view }: HttpContextContract) {
    const id = request.param('id')
    const poem = await Poem.findBy('id', id)

    if (!poem) {
      return response.redirect('/')
    }

    const diff = poem.createdAt.diffNow('days')
    if (diff.days > 10) {
      return response.redirect('/')
    }

    return view.render('pages/poem', { poem })
  }
}
