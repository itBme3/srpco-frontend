/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from 'graphql-request'
import { EntryType } from '~/models/entry.model'

export const defaultsEntryFields = (mediaKey:string = 'media', addedFields:string[] = []) => {
  const fields = ['id', 'title', 'slug', mediaKey]
  if (!Array.isArray(addedFields)) { return fields }
  return `${fields} ${addedFields.join(' ')}`
}

export const EntryResponseFragments: any = (keyPath: string = 'default.default', mediaKey: string = 'media', addedKeys: string[] = []) => {
  const fields = ['id', 'title', 'slug', ...(Array.isArray(addedKeys) ? addedKeys : '')].filter(k => !!k?.length)
  const actions:any = {
    default: {
      default: gql`
      fragment EntryFields on Gasket {
          ${fields.join(' ')}
          ${mediaKey} {
            url alternativeText format mime
          }
      }`
    },
    gasket: {
      default: gql`
      fragment EntryFields on Gasket {
          ${fields.join(' ')}
          ${mediaKey} {
            url alternativeText format mime
          }
      }`
    }
  }
  const keySegments = keyPath.split('.')
  const groupKey = Object.keys(actions).includes(keySegments[0]) ? keySegments[0] : 'default'
  const funcKey = Object.keys(actions[groupKey]).includes(keySegments[1]) ? keySegments[1] : 'default'
  return actions[groupKey][funcKey]()
}
