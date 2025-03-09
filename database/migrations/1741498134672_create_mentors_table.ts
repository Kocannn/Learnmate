import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Mentors extends BaseSchema {
  protected tableName = 'mentors'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('category').notNullable()
      table.text('bio').nullable()
      table.decimal('rating', 2, 1).defaultTo(0)
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
