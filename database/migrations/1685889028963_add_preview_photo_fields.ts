import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'poems'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('photo_preview')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('photo_preview')
    })
  }
}
