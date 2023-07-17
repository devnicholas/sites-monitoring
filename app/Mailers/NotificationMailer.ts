import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import Notification from 'App/Models/Notification'
import User from 'App/Models/User'

export default class NotificationMailer extends BaseMailer {
  constructor(private notification: Notification) {
    super()
  }

  public async prepare(message: MessageContract) {
    const user = await User.findOrFail(this.notification.userId)
    const action = this.notification.action ? 
      Env.get('APP_URL') + this.notification.action : 
      false

    message
      .subject('Nova notificação')
      .from('noreply@example.com')
      .to(user.email)
      .htmlView('emails/notification', {
        name: user.name,
        notification: this.notification,
        action,
      })
  }
}
