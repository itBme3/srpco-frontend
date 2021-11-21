
import { mediaFields } from './fields'

const blockSettingsFields = {
  DEFAULT: 'id __typename blockSettings { blockClasses }',
  card: `
  cardSettings {
      style cardClasses mediaClasses titleClasses textClasses
  }`,
  collection: `
    collectionType
    collectionSettings {
      sort limit searchBar
    }
    cardSettings {
      cardClasses mediaClasses titleClasses textClasses style
    }
  `
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
  `,
  ComponentBlocksBlockSpacer: `
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlocksBlockCollection: `
      collectionType collectionSettings { sort limit }
      ${blockSettingsFields.card}
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlocksBlockServices: `
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlocksBlockResources: `
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlocksBlockMaterials: `
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlocksBlockApplications: `
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlocksBlockDatasheets: `
      ${blockSettingsFields.DEFAULT}
  `
}
