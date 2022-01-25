import { gql } from 'graphql-request'
import { CollectionType } from '~/models/entry.model'
import { $graph } from '~/utils/graphql/init'
import { entryQuery } from '~/utils/graphql/queries/entries'
import { collectionPageFields } from '~/utils/graphql/queries/collection-pages'
import { parseResponse } from '../responses'

export const defaultCollectionVariables = {
  sort: ['publishedAt:ASC'],
  filters: { publishedAt: { notNull: true } },
  pagination: { limit: 10, start: 0 }
}

export const getCollection = async (
  collectionType: CollectionType,
  queryParams: { [key: string]: any } = defaultCollectionVariables
) => {
  const { query, variables } = entryQuery({ queryParams, collectionType })
  console.log({ query, variables })
  return await $graph.request(query, variables).then(res => {
    console.log({ res });
    const parsedRes = res[collectionType].data.map((entry: any) => parseResponse({ id: entry.id, ...entry.attributes }))
    console.log({ parsedRes });
    return parsedRes;
  }).catch(console.error)
}

export const getCollectionPage = async (collectionType: CollectionType) => {
  let queryNamespace = `${collectionType}Collection`
  if (queryNamespace[queryNamespace.length - 1] === 's') {
    queryNamespace = queryNamespace.substr(0, queryNamespace.length - 1)
  }
  return await $graph.request(
    gql`
    query {
      ${queryNamespace} {
          data {
          id attributes {
            ${collectionPageFields(collectionType)}
          }
        }
      }
    }`
  ).then(entry => {
    if (!!!entry[queryNamespace] || !!!entry[queryNamespace]?.data?.id) return null;
    return parseResponse(entry[queryNamespace])
  })
}
