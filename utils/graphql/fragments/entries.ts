/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from 'graphql-request'
import { mediaFields, seoFields } from './fields'
import { EntryType } from '~/models/entry.model'
import { blockFields, defaultBlockFields } from '~/utils/graphql/fragments/blocks'

export const getEntryFields = (entryType: EntryType | null | string, fragmentType: string = 'default', mediaField: string = 'media', addedKeys: string[] = []) => {
  const mediaKey = mediaField === 'media' && entryType === EntryType.DATASHEET ? 'file' : mediaField
  if (entryType === null) {
    return null
  }
  const fields = ['title', 'description', 'slug', 'type', 'createdAt', 'updatedAt', 'publishedAt', ...(Array.isArray(addedKeys) ? addedKeys : '')]
    .filter(k => !!k?.length).join(' ');
  const defaults = {
    default: `
        ${fields}
        ${mediaKey} { ${mediaFields.default} }
      `,
    collectionItem: `
        ${fields} ${[EntryType.MATERIAL, EntryType.APPLICATION].map(s => `${s}`).includes(entryType)
        ? 'gaskets (pagination: {limit: 3}, sort: ["order:ASC"]) { data { id attributes { slug title type collectionType }} }'
        : ''
      }
        ${mediaKey} {
          ${mediaFields[entryType === EntryType.DATASHEET ? 'tiny' : 'default']}
        }
      `,
    page: `
        ${fields} collectionType
        tags { data { id attributes { title slug } } }
        pageSettings { classes }
        seo { ${seoFields} }
        ${mediaKey} {
          ${mediaFields.default}
        }
      `
  }
  const fragmentFields: any = {
    defaults,
    gasket: {
      page: gql`
        ${defaults.page}
          content suppliers {
            data {
              id attributes {
                title slug media { ${mediaFields.default} } 
                description color
              }
            }
          }
          blocks {
            ... on ComponentBlockHero { ${blockFields.ComponentBlockHero} }
            ... on ComponentBlockDatasheets { ${blockFields.ComponentBlockDatasheets} }
            ... on ComponentBlockGaskets { ${blockFields.ComponentBlockGaskets} }
            ... on ComponentBlockResources { ${blockFields.ComponentBlockResources} }
            ${defaultBlockFields}
          }`
    },
    application: {
      page: gql`
        ${defaults.page}
        content
        blocks {
          ... on ComponentBlockHero { ${blockFields.ComponentBlockHero} }
          ${defaultBlockFields}
        }
      `
    },
    material: {
      page: gql`
        ${defaults.page}
        content
        blocks {
          ... on ComponentBlockHero { ${blockFields.ComponentBlockHero} }
          ${defaultBlockFields}
        }
      `
    },
    supplier: {
      default: `
        ${defaults.default}
        color totalConverters
      `,
      collectionItem: `
        ${defaults.collectionItem}
        color totalConverters
      `,
      page: `
        content
        ${defaults.page}
        color totalConverters
        blocks {
          ... on ComponentBlockHero { ${blockFields.ComponentBlockHero} }
          ${defaultBlockFields}
        }
      `,
    },
    resource: {
      page: gql`
        ${defaults.page}
        content youtube
        blocks {
          ... on ComponentBlockHero { ${blockFields.ComponentBlockHero} }
          ${defaultBlockFields}
        }
      `
    },
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
        ${mediaKey} { ${mediaFields.tiny} }
      `
    },
    solution: {
      page: gql`
          ${defaults.page}
          blocks {
            ... on ComponentSolutionsChallenge { ${blockFields.ComponentSolutionsChallenge} }
            ... on ComponentSolutionsSolution { ${blockFields.ComponentSolutionsSolution} }
            ... on ComponentSolutionsResults { ${blockFields.ComponentSolutionsResults} }
            ... on ComponentSolutionsUsed{ ${blockFields.ComponentSolutionsUsed} }
          }
      `
    },
    page: {
      page: gql`
        ${defaults.page}
        content
        blocks {
          ... on ComponentBlockCollection { ${blockFields.ComponentBlockCollection} }
          ... on ComponentBlockHero { ${blockFields.ComponentBlockHero} }
          ... on ComponentBlockDatasheets { ${blockFields.ComponentBlockDatasheets} }
          ... on ComponentBlockResources { ${blockFields.ComponentBlockResources} }
          ${defaultBlockFields}
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
    ${fragmentFields[keys[0]][keys[1]]}
  `
}
