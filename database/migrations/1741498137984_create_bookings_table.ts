import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('mentor_id').unsigned().references('id').inTable('mentors').onDelete('CASCADE')
      table.integer('mentee_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.date('date').notNullable()
      table.time('time').notNullable()
      table.enum('status', ['pending', 'confirmed', 'canceled']).defaultTo('pending')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

