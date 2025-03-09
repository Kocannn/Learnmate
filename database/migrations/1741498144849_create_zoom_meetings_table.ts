import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ZoomMeetings extends BaseSchema {
  protected tableName = 'zoom_meetings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('booking_id')
        .unsigned()
        .references('id')
        .inTable('bookings')
        .onDelete('CASCADE')
      table.string('zoom_meeting_id').notNullable()
      table.string('zoom_link').notNullable()
      table.timestamp('start_time').notNullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

