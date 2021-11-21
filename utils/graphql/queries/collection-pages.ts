import { blockFields } from '../fragments/blocks'
import { seoFields } from '../fragments/fields'

const defaults = `
title description
seo { ${seoFields} }
blocks {
      ... on ComponentBlocksBlockCollection {
            ${blockFields.ComponentBlocksBlockCollection}
      }
}
`
export const collectionPageFields = (key:string = 'default') => {
  const res: { [key: string]: string } = {
    default: defaults
  }
  return Object.keys(res).includes(key) ? res[key] : res.default
}
