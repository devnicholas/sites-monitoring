// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Notification from "App/Models/Notification";

export default class NotificationsController {
    public async index({ auth, view }) {
        const notifications = await Notification.query()
            .where('user_id', auth.user.id)
            .orderBy('createdAt', 'desc')

        const notificationsOpeneds = await Notification.query()
            .where('user_id', auth.user.id)
            .where('opened', false)
            .orderBy('createdAt', 'desc')

        notificationsOpeneds.forEach((notification) => {
            notification.opened = true
            notification.save()
        })

        return view.render('admin/notifications/index', { notifications })
    }
}
