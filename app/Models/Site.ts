import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Verification from './Verification'
import User from './User'

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ownerId: number

  @column()
  public name: string

  @column()
  public url: string

  @column()
  public interval: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Verification)
  public verifications: HasMany<typeof Verification>

  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>
}
