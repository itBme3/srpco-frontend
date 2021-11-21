import { gql } from 'graphql-request'
import { $graph } from '~/utils/graphql/init'
import { EntryType } from '~/models/entry.model'
import { getEntryFields } from '~/utils/graphql/fragments/entries'

export const entryBySlug = async (entryType: EntryType | null, slug: string) => {
  if (entryType === null) {
    return
  }
  const fields = getEntryFields(entryType, 'page', entryType === EntryType.DATASHEET ? 'file' : 'media')
  const collectionType = `${entryType}s`
  return await $graph.request(gql`
            query {
                  ${collectionType}(where: { slug: "${slug}" }, limit: 1) {
                        ${fields}
                  }
            }
      `).then(res => !!res[collectionType] && !!res[collectionType][0] ? res[collectionType][0] : null)
}
