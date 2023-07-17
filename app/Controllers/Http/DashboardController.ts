// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Notification from "App/Models/Notification";
import Site from "App/Models/Site";
import User from "App/Models/User";
import Verification from "App/Models/Verification";

export default class DashboardController {

    public static async index({ view }) {
        const users = await (await User.query()).length
        const sites = await (await Site.query()).length
        const verifications = await (await Verification.query()).length
        const notifications = await (await Notification.query()).length
        // console.log(users[0].$extras.count)
        return view.render('admin/main', { users, sites, verifications, notifications })
    }
}
