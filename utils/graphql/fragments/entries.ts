/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from 'graphql-request'
import { capitalize } from '../../funcs'
import { mediaFields, seoFields } from './fields'
import { EntryType } from '~/models/entry.model'
import { blockFields } from '~/utils/graphql/fragments/blocks'

export const getEntryFields = (entryType: EntryType | null | string, fragmentType: string = 'default', mediaField: string = 'media', addedKeys: string[] = []) => {
  const mediaKey = mediaField === 'media' && entryType === EntryType.DATASHEET ? 'file' : mediaField
  if (entryType === null) {
    return null
  }
  const fields = ['title', 'description', `seo { ${seoFields} }`, 'slug', 'type', ...(Array.isArray(addedKeys) ? addedKeys : '')].filter(k => !!k?.length)
  const defaults = {
    default: `
        ${fields.join(' ')}
        ${mediaKey} { ${mediaFields()} }
      `,
    collectionItem: `
        ${fields.join(' ')}
          ${[EntryType.MATERIAL, EntryType.APPLICATION].map(s => `${s}`).includes(entryType)
        ? 'gaskets (pagination: {limit: 3}, sort: ["order:ASC"]) { data { id attributes { slug title type collectionType }} }'
        : ''
      }
        ${mediaKey} {
          ${mediaFields(entryType === EntryType.DATASHEET ? 'tiny' : 'default')}
        }
      `,
    page: `
        ${fields.join(' ')} collectionType
        tags { data { id attributes { title slug } } }
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
          ... on ComponentBlockContent { ${blockFields.ComponentBlockContent} }
          ... on ComponentBlockCard { ${blockFields.ComponentBlockCard} }
          ... on ComponentBlockSpacer { ${blockFields.ComponentBlockSpacer} }
          ... on ComponentBlockResources { ${blockFields.ComponentBlockResources} }
          ... on ComponentBlockDatasheets { ${blockFields.ComponentBlockDatasheets} }
          ... on ComponentBlockGroup { ${blockFields.ComponentBlockGroup} }
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
    datasheet: {
      page: gql`
        ${defaults.page}
      `,
      collectionItem: gql`
        title slug
        ${mediaKey} { ${mediaFields('tiny')} }
      `
    },
    solution: {},
    page: {
      page: gql`
        ${defaults.page}
        content
        blocks {
          ... on ComponentBlockContent { ${blockFields.ComponentBlockContent} }
          ... on ComponentBlockCard { ${blockFields.ComponentBlockCard} }
          ... on ComponentBlockSpacer { ${blockFields.ComponentBlockSpacer} }
          ... on ComponentBlockResources { ${blockFields.ComponentBlockResources} }
          ... on ComponentBlockDatasheets { ${blockFields.ComponentBlockDatasheets} }
          ... on ComponentBlockGroup { ${blockFields.ComponentBlockGroup} }
        }
      `
    }
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
