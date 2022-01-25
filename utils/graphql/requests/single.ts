import { gql } from 'graphql-request'
import { $graph } from '~/utils/graphql/init'
import { EntryType } from '~/models/entry.model'
import { getEntryFields } from '~/utils/graphql/fragments/entries'
import { parseResponse } from '../responses'

export const entryBySlug = async (entryType: EntryType | null, slug: string) => {
      if (entryType === null) {
            return
      }
      const collectionType = `${entryType}s`
      return await $graph.request(gql`
            query {
                  ${collectionType}(filters: { slug: { eq: "${slug}" } }, pagination: { limit: 1 }) {
                        data {
                              id
                              attributes {
                                    ${getEntryFields(entryType, 'page', entryType === EntryType.DATASHEET ? 'file' : 'media')}
                              }
                        }
                  }
            }
      `).then(res => {
            console.log(res)
            if (!!!res[collectionType]?.data?.length) return null;
            const entry = res[collectionType].data[0];
            return parseResponse({ id: entry.id, ...entry.attributes })
      })
}
