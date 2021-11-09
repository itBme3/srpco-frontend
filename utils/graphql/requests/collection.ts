import { CollectionType } from '~/models/entry.model'
import { $graph } from '~/utils/graphql/init'
import { entryQuery } from '~/utils/graphql/queries/entries'

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
