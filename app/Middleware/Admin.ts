import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Models/Notification'

export default class Admin {
  public async handle({ auth, response, session, view }: HttpContextContract, next: () => Promise<void>) {

    if (auth.isLoggedIn && auth.user?.isAdmin) {
      const notifications = await Notification.query()
        .where('user_id', auth.user.id)
        .where('opened', false)
      console.log(notifications)
      console.log('notifications')
      view.share({ notifications })

      await next()
    } else {
      session.flash('error', 'Unauthorized access')
      return response.redirect().back()
    }
  }
}
