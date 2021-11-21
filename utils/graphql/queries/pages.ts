import { gql } from 'graphql-request'
import { blockFields } from '../fragments/blocks'
import { seoFields } from '../fragments/fields'

export const homepageQuery = gql`
query {
  homepage(publicationState: LIVE) {
      title
      description
      blocks {
        ... on ComponentBlocksBlockCard {
          ${blockFields.ComponentBlocksBlockCard}
        },
        ... on ComponentBlocksBlockCollection {
          ${blockFields.ComponentBlocksBlockCollection}
        }
      }
      seo {
        ${seoFields}
      }
  }
}`
