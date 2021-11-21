import { gql } from 'graphql-request'
import { CollectionType } from '~/models/entry.model'
import { capitalize } from '~/utils/funcs'
import { $graph } from '~/utils/graphql/init'
import { entryQuery } from '~/utils/graphql/queries/entries'
import { collectionPageFields } from '~/utils/graphql/queries/collection-pages'

export const defaultCollectionVariables = {
  sort: 'published_at:ASC',
  where: { published_at_null: false },
  limit: 10,
  start: 0
}

export const getCollection = async (
  collectionType: CollectionType,
  queryParams: { [key: string]: any } = defaultCollectionVariables
) => {
  const { query, variables } = entryQuery({ queryParams, collectionType })
  return await $graph.request(query, variables)
}

export const getCollectionPage = async (collectionType: CollectionType) => {
  let queryNamespace = `collection${capitalize(collectionType)}`
  if (queryNamespace[queryNamespace.length - 1] === 's') {
    queryNamespace = queryNamespace.substr(0, queryNamespace.length - 1)
  }
  return await $graph.request(
    gql`
    query {
      ${queryNamespace}(publicationState: LIVE) {
        ${collectionPageFields(collectionType)}
      }
    }`
  )
}
