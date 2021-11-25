import { gql } from 'graphql-request'
import { blockSettingsFields } from '../fragments/blocks'
import { mediaFields } from '../fragments/fields'

export const navigationQuery = gql`
      query {
      navigation(publicationState: LIVE) {
            links {
                  id text link
                  icon openNewTab
                  nested { id link text icon openNewTab }
            }
      }
}`

export const footerQuery = gql`
      query {
            footer(publicationState: LIVE) {
                  blocks {
                  ... on ComponentNavigationLink {
                        title
                        titleLink
                        ${blockSettingsFields.DEFAULT}
                        links { id openNewTab icon text link }
                  }
                  ... on ComponentNavigationContent {
                              ${blockSettingsFields.DEFAULT}
                              title
                              content
                              images {
                                    id link openNewTab imageClasses
                                    image { ${mediaFields('default')} }
                              }
                        }
                  }
            }
      }`

export const globalQuery = gql`
  query {
    global(publicationState: LIVE) {
      siteName
      defaultSeo {
        title
        description
        image {
          url
          formats
          mime
          alternativeText
        }
      }
    }
  }
`
