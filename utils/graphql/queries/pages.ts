import { gql } from 'graphql-request'
import { blockFields } from '../fragments/blocks'
import { seoFields } from '../fragments/fields'

export const homepageQuery = (() => {
  const attributes = `
    title
    description
    pageSettings { classes }
    blocks {
      ${[
      'ComponentBlockContent',
      'ComponentBlockSpacer',
      'ComponentBlockCollection',
      'ComponentBlockDatasheets',
      'ComponentBlockResources',
      'ComponentBlockGaskets',
      'ComponentBlockGroup',
      'ComponentBlockHero',
      'ComponentBlockCard',
      'ComponentBlockIconList',
    ].reduce((acc, key: string) => {
      return acc + `
                                ... on ${key} {
                                  ${blockFields[key]}
                                }
                              `
    }, '')}
    }
    seo {
      ${seoFields}
    }
  `
  return gql`
    query {
      homepage {
        data {
          id
          attributes {
            ${attributes}
          }
        }
      }
    }`
})()