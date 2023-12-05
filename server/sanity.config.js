import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'beauty-app-server',

  projectId: '17dgjl6y',
  dataset: 'beauty-app',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
