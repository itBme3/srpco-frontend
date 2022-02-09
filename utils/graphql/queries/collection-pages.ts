
import { blockFields, defaultBlockFields } from '../fragments/blocks'
import { seoFields } from '../fragments/fields'



export const defaultCollectionPageFields = `
    title description
    seo { ${seoFields} }
    blocks {
      ... on ComponentBlockCollection { ${blockFields.ComponentBlockCollection} }
      ${defaultBlockFields}
    }
    pageSettings { classes }
`