import { gql } from 'graphql-request'
import { blockFields } from '../fragments/blocks'
import { seoFields } from '../fragments/fields'

const defaults = gql`
    title description
    seo { ${seoFields} }
    blocks {
    ${[
    'ComponentBlockCollection'
  ].reduce((acc, key: string) => {
    return acc + gql`
                  ... on ${key} {
                      ${blockFields[key]}
                  }
                `
  }, '')}
  }
`
export const collectionPageFields = (key: string = 'default') => {
  const res: { [key: string]: string } = {
    default: defaults
  }
  return Object.keys(res).includes(key) ? res[key] : res.default
}
