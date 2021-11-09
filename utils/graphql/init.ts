/* eslint-disable import/no-mutable-exports */
import { GraphQLClient } from 'nuxt-graphql-request'

let $graph: GraphQLClient

export function initializeGraphQl (graphql: { [client: string]: GraphQLClient }) {
  $graph = graphql.default
}

export { $graph }
