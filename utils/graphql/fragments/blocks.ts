import { mediaFields } from './fields'

const blockSettingsFields = {
  DEFAULT: 'id __typename blockSettings { blockClasses }',
  card: `
  cardSettings {
      style cardClasses mediaClasses titleClasses textClasses
  }`,
  collection: `collectionSettings {
      sort limit gridClasses searchBar
  }`
}

export const blockFields = {
  ComponentBlocksBlockCard: `
      title text link openNewTab
      media {
        ${mediaFields()}
      },
      ${blockSettingsFields.DEFAULT}
      ${blockSettingsFields.card}
  `,
  ComponentBlocksBlockContent: `
      title content
      ${blockSettingsFields.DEFAULT}
      ${blockSettingsFields.card}
  `,
  ComponentBlocksBlockCollection: `
      collectionType collectionSettings { sort limit }
      ${blockSettingsFields.DEFAULT}
  `
}
