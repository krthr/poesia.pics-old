import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'poems'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.text('id').primary()

      table.text('author').notNullable()
      table.text('caption').notNullable()
      table.text('image').notNullable()
      table.text('mood').notNullable()
      table.text('poem').notNullable()
      table.text('promp').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
