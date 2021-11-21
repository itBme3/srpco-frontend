/* eslint-disable no-extra-boolean-cast */
import { gql } from 'graphql-request'
import { defaultCollectionVariables } from '../requests/collection'
import { queryVariables } from './variables'
import { CollectionType, EntryType } from '~/models/entry.model'
import { entryFields } from '~/utils/graphql/fragments/entries'

export const entryQuery = (data: { queryParams: { [key: string]: any }, entryType?: EntryType, collectionType?: CollectionType, fieldFragments?: string }) => {
  const { queryParams, fieldFragments = null } = data
  const entryType: string | null = !!data?.entryType?.length
    ? data.entryType
    : !!data.collectionType
        ? data.collectionType[data.collectionType.length - 1] === 's'
          ? data.collectionType.substr(0, data.collectionType.length - 1)
          : data.collectionType
        : null
  const collectionType: string | null = !!data?.collectionType?.length
    ? data.collectionType
    : !!data.entryType
        ? data.entryType[data.entryType.length - 1] !== 's'
          ? `${data.entryType}s`
          : data.entryType
        : null
  const queryType = !!data?.collectionType ? collectionType : entryType
  const fields = !!fieldFragments?.length
    ? fieldFragments
    : entryFields(entryType, !!!data.collectionType ? 'page' : 'collectionItem')
  const { props, variables } = queryVariables(collectionType
    ? { ...defaultCollectionVariables, ...queryParams }
    : queryParams)
  const query = gql`
            query (${props}) {
                  ${queryType}(${Object.keys(variables).map(k => `${k} : $${k}`).join(', ')}) {
                  ${fields}
                  }
            }
      `
  return { query, variables }
}
