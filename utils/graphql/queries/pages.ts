import { gql } from 'graphql-request'
import { blockFields } from '../fragments/blocks'
import { seoFields } from '../fragments/fields'

export const homepageQuery = gql`
query {
  homepage(publicationState: LIVE) {
      title
      description
      blocks {
        ${Object.keys(blockFields)
        .filter(key => !['ComponentBlocksBlockApplications', 'ComponentBlocksBlockServices'].includes(key))
        .reduce((acc, key: string) => {
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
  }
}`
