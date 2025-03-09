import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Reviews extends BaseSchema {
  protected tableName = 'reviews'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('mentor_id').unsigned().references('id').inTable('mentors').onDelete('CASCADE')
      table.integer('mentee_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('rating').notNullable()
      table.text('comment').nullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

