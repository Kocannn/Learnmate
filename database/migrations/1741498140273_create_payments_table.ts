import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Payments extends BaseSchema {
  protected tableName = 'payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('booking_id')
        .unsigned()
        .references('id')
        .inTable('bookings')
        .onDelete('CASCADE')
      table.decimal('amount', 10, 2).notNullable()
      table.enum('status', ['pending', 'paid', 'failed']).defaultTo('pending')
      table.string('midtrans_transaction_id').nullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

