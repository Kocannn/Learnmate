import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ZoomMeeting extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bookingId: number

  @column()
  declare zoomMeetingId: string

  @column()
  declare zoomLink: string

  @column.dateTime()
  declare startTime: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

