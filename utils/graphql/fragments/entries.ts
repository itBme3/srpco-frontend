/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from 'graphql-request'
import { capitalize } from '../../funcs'
import { mediaFields, seoFields } from './fields'
import { EntryType } from '~/models/entry.model'
import { blockFields } from '~/utils/graphql/fragments/blocks'

export const getEntryFields = (entryType: EntryType | null | string, fragmentType: string = 'default', mediaKey: string = 'media', addedKeys: string[] = []) => {
  if (entryType === null) {
    return null
  }
  const fields = ['id', 'title', 'description', `seo { ${seoFields} }`, 'slug', 'type', ...(Array.isArray(addedKeys) ? addedKeys : '')].filter(k => !!k?.length)
  const defaults = {
    default: `
        ${fields.join(' ')}
        ${mediaKey} { ${mediaFields()} }
      `,
    collectionItem: `
        ${fields.join(' ')}
        ${
        [EntryType.MATERIAL, EntryType.APPLICATION].map(s => `${s}`).includes(entryType)
          ? 'gaskets (limit: 3, sort: "order:ASC") { id slug title type collectionType }'
          : ''
        }
        ${mediaKey} {
          ${mediaFields(entryType === EntryType.DATASHEET ? 'tiny' : 'default')}
        }
      `,
    page: `
        ${fields.join(' ')} collectionType
        tags { title slug }
        ${mediaKey} {
          ${mediaFields()}
        }
      `
  }
  const fragmentFields: any = {
    defaults,
    gasket: {
      page: gql`
        ${defaults.page}
        content
        blocks {
          ... on ComponentBlocksBlockContent { ${blockFields.ComponentBlocksBlockContent} }
          ... on ComponentBlocksBlockCard { ${blockFields.ComponentBlocksBlockCard} }
          ... on ComponentBlocksBlockSpacer { ${blockFields.ComponentBlocksBlockSpacer} }
          ... on ComponentBlocksBlockResources { ${blockFields.ComponentBlocksBlockResources} }
          ... on ComponentBlocksBlockMaterials { ${blockFields.ComponentBlocksBlockMaterials} }
          ... on ComponentBlocksBlockDatasheets { ${blockFields.ComponentBlocksBlockDatasheets} }
        }
      `
    },
    application: {},
    material: {},
    supplier: {},
    resource: {},
    service: {
      collectionItem: `
        ${defaults.collectionItem}
        youtube
      `,
      page: `
        ${defaults.page}
        youtube
      `
    },
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
  if (fragmentType === 'page') {
    return gql`${fragmentFields[keys[0]][keys[1]]}`
  }
  return gql`
    ... on ${capitalize(entryType)} {
        ${fragmentFields[keys[0]][keys[1]]}
    }
  `
}
