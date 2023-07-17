import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Models/Notification'

export default class NotificationMiddleware {
  public async handle({ auth, view }: HttpContextContract, next: () => Promise<void>) {

    if (auth.isLoggedIn && auth.user) {
      const notifications = await Notification.query()
        .where('user_id', auth.user.id)
        .where('opened', false)
      
      const notificationsQty = notifications.length

      view.share({ notificationsQty })

    }
    await next()
  }
}
