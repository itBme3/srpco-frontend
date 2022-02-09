import { gql } from 'graphql-request'
import { blockSettingsFields } from '../fragments/blocks'
import { mediaFields } from '../fragments/fields'

export const navigationQuery = gql`
      query {
      navigation {
            data {
                  id
                  attributes {
                        links {
                              id text link
                              icon openNewTab
                              nested { id link text icon openNewTab }
                        }
                  }
            }
      }
}`

export const footerQuery = gql`
      query {
            footer {
                  data {
                        id
                        attributes {
                              blocks {
                              ... on ComponentNavigationLink {
                                    text
                                    link
                                    id __typename
                                    nested { id openNewTab icon text link }
                              }
                              ... on ComponentNavigationContent {
                                          id __typename
                                          title
                                          content
                                          images {
                                                id link openNewTab imageClasses
                                                image { ${mediaFields.default} }
                                          }
                                    }
                              }
                        }
                  }
            }
      }`

export const globalQuery = gql`
  query {
    global {
      data {
            id
            attributes {
                  siteName
                  defaultSeo {
                        title
                        description
                        image {
                             data {
                                   id
                                   attributes {
                                         url
                                          formats
                                          mime
                                          alternativeText
                                    }
                             }
                        }
                  }
            }
      }
    }
  }
`
