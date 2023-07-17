// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Site from "App/Models/Site";
import Verification from "App/Models/Verification";

export default class VerificationsController {
    public async index({ request, view }) {
        const page = request.input('page', 1)
        const perPage = 20

        const verifications = await Verification
            .query()
            .orderBy('createdAt', 'desc')
            .preload('site')
            .paginate(page, perPage)

        return view.render('admin/verifications/index', { verifications })
    }

    public async show ({ params, view }) {
        const verification = await Verification.findOrFail(params.id)
        const site = await verification.related('site').query().firstOrFail()
    
        return view.render('admin/verifications/show', { verification, site })
      }
}
