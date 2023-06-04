import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'poems'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.binary('photo')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('photo')
    })
  }
}
