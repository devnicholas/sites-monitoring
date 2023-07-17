// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Site from "App/Models/Site"
import User from "App/Models/User"

export default class SearchesController {

    public static async index({ view, request }) {
        const search = request.input('s')

        const sites = await Site.query().where('name', 'iLIKE', `%${search}%`)
        const users = await User.query().where('name', 'iLIKE', `%${search}%`)

        return view.render('admin/search/index', { sites, users })
    }
}
