/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from 'graphql-request'
import { capitalize } from '../../funcs'
import { mediaFields } from './media'
import { EntryType } from '~/models/entry.model'

export const entryFields: any = (entryType: EntryType, fragmentType: string = 'default', mediaKey: string = 'media', addedKeys: string[] = []) => {
  const fields = ['id', 'title', 'slug', 'type', ...(Array.isArray(addedKeys) ? addedKeys : '')].filter(k => !!k?.length)
  const fragmentFields: any = {
    defaults: {
      default: `
        ${fields.join(' ')}
        ${mediaKey} { ${mediaFields()} }
      `,
      collectionItem: `
        ${fields.join(' ')}
        ${[EntryType.MATERIAL, EntryType.APPLICATION].includes(entryType)
          ? 'gaskets (limit: 3, sort: "order:ASC") { id slug title collectionType }'
          : ''}
        ${mediaKey} {
          ${mediaFields(entryType === EntryType.DATASHEET ? 'tiny' : 'default')}
        }
      `,
      page: `
        ${fields.join(' ')}
        ${mediaKey} {
          ${mediaFields()}
        }
      `
    },
    gasket: {},
    application: {},
    material: {},
    supplier: {},
    resource: {},
    service: {},
    datasheet: {},
    solution: {}
  }
  Object.values(EntryType).forEach((key) => {
    Object.keys(fragmentFields.defaults).forEach((dKey) => {
      if (!!!fragmentFields[key] || !!!fragmentFields[key][dKey]) {
        if (!!!fragmentFields[key]) { fragmentFields[key] = {} }
        fragmentFields[key][dKey] = fragmentFields.defaults[dKey]
      }
    })
  })
  const keys = [
    Object.keys(fragmentFields).includes(entryType) ? entryType : 'default',
    Object.keys(fragmentFields[entryType]).includes(fragmentType) ? fragmentType : 'default'
  ]
  return gql`
    fragment EntryFields on ${capitalize(entryType)} {
        ${fragmentFields[keys[0]][keys[1]]}
    }
  `
}
