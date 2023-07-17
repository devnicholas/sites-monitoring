import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Site from "App/Models/Site";
import SiteValidator from "App/Validators/SiteValidator";

export default class SitesController {
  public async index({ view }) {
    const sites = await Site.query()

    return view.render('admin/sites/index', { sites })
  }

  public async create({ view }) {
    return view.render('admin/sites/create')
  }

  public async show({ request, view, params }) {
    const page = request.input('page', 1)
    const perPage = 10

    const site = await Site.findOrFail(params.id)

    const verifications = await site.related('verifications')
      .query()
      .orderBy('createdAt', 'desc')
      .preload('site')
      .paginate(page, perPage)

    return view.render('admin/sites/show', { verifications, site })
  }

  public async store({ request, response, session, auth }) {
    try {
      await request.validate(SiteValidator)
      const data = request.only(['name', 'url', 'interval'])
      
      data.owner_id = auth.user.id

      await Site.create(data)

      session.flash('success', 'Site adicinado com sucesso')

      return response.redirect().toRoute('admin_sites.index')
    } catch (error) {
      if (error.flashToSession) {
        session.flash('errors', error.messages)
      } else {
        session.flash('error', 'Ocorreu um erro ao cadastrar. Verifique os dados e tente novamente')
      }
      return response.redirect().back()
    }
  }

  public async edit({ params, view }) {
    const site = await Site.findOrFail(params.id)

    return view.render('admin/sites/edit', { site })
  }

  public async update(ctx: HttpContextContract) {
    const { request, params, session, response } = ctx
    try {
      const site = await Site.findOrFail(params.id)

      await request.validate(new SiteValidator(ctx, site))

      site.merge(request.only(['name', 'url', 'interval']))

      await site.save()

      session.flash('success', 'Site editado com sucesso')
      return response.redirect().toRoute('admin_sites.index')
    } catch (error) {
      if (error.flashToSession) {
        session.flash('errors', error.messages)
      } else {
        session.flash('error', 'Ocorreu um erro ao salvar. Verifique os dados e tente novamente')
      }
      return response.redirect().back()
    }
  }

  public async destroy({ params, response, session }) {
    try {
      const site = await Site.findOrFail(params.id)

      await site.delete()

      session.flash('success', 'Site removido com sucesso')
      return response.redirect().toRoute('admin_sites.index')
    } catch (error) {
      session.flash('error', 'Ocorreu um erro. Tente novamente mais tarde')
      return response.redirect().back()
    }
  }
}

