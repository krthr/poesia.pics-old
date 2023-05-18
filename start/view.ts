import View from '@ioc:Adonis/Core/View'
import { addCollection, edgeIconify } from 'edge-iconify'
import { icons } from '@iconify-json/ph'
import { MOODS_DICT, MOODS } from 'App/Constants/Moods'

addCollection(icons)
View.use(edgeIconify)

View.global('MOODS', MOODS)
View.global('MOODS_DICT', MOODS_DICT)
