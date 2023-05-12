import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { nanoid } from 'nanoid'

export default class Poem extends BaseModel {
  public static primaryKey = 'id'

  @column()
  public id: string

  @column()
  public author: string

  @column()
  public caption: string

  @column()
  public image: string

  @column()
  public mood: string

  @column()
  public poem: string

  @column()
  public promp: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @computed()
  public get createdAtLabel() {
    return this.createdAt.toLocaleString({
      month: 'short',
      year: 'numeric',
      day: '2-digit',
    })
  }

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static createId(poem: Poem) {
    poem.id = nanoid(10)
  }
}
