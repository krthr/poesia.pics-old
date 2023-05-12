import View from '@ioc:Adonis/Core/View'
import { addCollection, edgeIconify } from 'edge-iconify'
import { icons } from '@iconify-json/ph'
import { MOODS_ICONS } from 'App/Constants/Moods'

addCollection(icons)
View.use(edgeIconify)

View.global('MOODS_ICONS', MOODS_ICONS)
