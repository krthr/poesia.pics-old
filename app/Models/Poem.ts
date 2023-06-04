import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  beforeCreate,
  belongsTo,
  column,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import { nanoid } from 'nanoid'
import User from './User'

export default class Poem extends BaseModel {
  public static primaryKey = 'id'

  @column()
  public id: string

  @column()
  public userId?: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public isPublic: boolean

  @column()
  public author: string

  @column()
  public caption: string

  @column()
  public mood: string

  @column()
  public photo: Buffer

  @column()
  public photoPreview?: string

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
    poem.id = nanoid(21)
  }

  @computed()
  public get photoPath() {
    return `/images/poems/${this.id}.jpg`
  }
}
