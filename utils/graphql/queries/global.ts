import { gql } from 'graphql-request'

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
                  links {
                        text
                        link
                  }
                  }
                  ... on ComponentNavigationContent {
                              title
                              content
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
