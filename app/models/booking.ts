import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare mentorId: number

  @column()
  declare menteeId: number

  @column.date()
  declare date: DateTime

  @column.dateTime()
  declare time: DateTime

  @column()
  declare status: 'pending' | 'confirmed' | 'canceled'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

