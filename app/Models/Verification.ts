import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, afterSave } from '@ioc:Adonis/Lucid/Orm'
import Route from '@ioc:Adonis/Core/Route'
import Site from './Site'
import Notification from './Notification'

export default class Verification extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public siteId: number

  @column()
  public status: number

  @column()
  public message: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Site)
  public site: BelongsTo<typeof Site>

  @afterSave()
  public static async haveToSendNotification(verification: Verification) {
    const lastSiteVerification = await Verification
      .query()
      .where('site_id', verification.siteId)
      .orderBy('createdAt', 'desc')
      .first()

    if (lastSiteVerification && lastSiteVerification.status != verification.status) {
      const site = await Site.findOrFail(verification.siteId)
      console.log(`Mudança de status no "${site.name}". Anterior: ${lastSiteVerification.status} | Atual: ${verification.status}`)
      
      await Notification.create({
        userId: site.ownerId,
        text: `Mudança de status no "${site.name}". Anterior: ${lastSiteVerification.status} | Atual: ${verification.status}`,
        action: Route.makeUrl('admin_verifications.show', { id: verification.id })
      })
    }
  }
}
