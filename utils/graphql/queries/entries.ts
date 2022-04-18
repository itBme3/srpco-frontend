/* eslint-disable no-extra-boolean-cast */
import { gql } from 'graphql-request'
import { defaultCollectionVariables } from '../requests/collection'
import { queryVariables } from './variables'
import { CollectionType, EntryType } from '~/models/entry.model'
import { getEntryFields } from '~/utils/graphql/fragments/entries'
import { capitalize } from '~/utils/funcs'

export const entryQuery = (data: { queryParams: { [key: string]: any }, entryType?: EntryType, collectionType?: CollectionType, fieldFragments?: string }) => {
  const { queryParams, fieldFragments = null } = data
  const entryType: string | null = !!data?.entryType?.length
    ? data.entryType
    : !!data.collectionType
      ? data.collectionType[data.collectionType.length - 1] === 's'
        ? data.collectionType.substring(0, data.collectionType.length - 1)
        : data.collectionType
      : ''
  const collectionType: string = !!data?.collectionType?.length
    ? data.collectionType
    : !!data.entryType
      ? data.entryType[data.entryType.length - 1] !== 's'
        ? `${data.entryType}s`
        : data.entryType
      : ''
  const queryType = !!data?.collectionType ? collectionType : entryType

  const fields = !!fieldFragments?.length
    ? fieldFragments
    : getEntryFields(entryType, !!!data.collectionType ? 'page' : 'collectionItem')
  const { props, variables } = queryVariables(collectionType
    ? { ...defaultCollectionVariables, ...queryParams }
    : queryParams, entryType);

  const query = gql`
            query ${capitalize(queryType)}(${props}) {
                  ${queryType}(${Object.keys(variables).map(k => `${k} : $${k}`).join(', ')}) {
                    data {
                      id
                      attributes {
                        ${fields}
                      }
                    }
                  }
            }
      `
  return { query, variables }
}
