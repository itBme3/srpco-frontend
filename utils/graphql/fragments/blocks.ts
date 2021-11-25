
import { mediaFields } from '~/utils/graphql/fragments/fields'

export const blockSettingsFields = {
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

export const blockFields:{[key:string]: string} = {
  ComponentBlocksBlockCard: `
      title text link openNewTab
      media {
        ${mediaFields()}
      }
      ${blockSettingsFields.DEFAULT}
      ${blockSettingsFields.card}
  `,
  ComponentBlocksBlockHero: `
      title text youtube heroStyle
      heroSettings { containerClasses mediaClasses titleClasses textClasses contentClasses buttonsClasses overlayClasses }
      buttons { id text link openNewTab buttonClasses }
      media { ${mediaFields()} }
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlocksBlockContent: `
      title content titleClasses contentClasses
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
      title
      services {
        title slug collectionType type youtube
        media { ${mediaFields('default')} }
      }
  `,
  ComponentBlocksBlockResources: `
      ${blockSettingsFields.DEFAULT}
      title
      resources {
        title slug resourceType collectionType type
        media { ${mediaFields('default')} }
      }
  `,
  ComponentBlocksBlockMaterials: `
      ${blockSettingsFields.DEFAULT}
      title
      materials {
        title slug collectionType type
        media { ${mediaFields('default')} }
      }
  `,
  ComponentBlocksBlockApplications: `
      ${blockSettingsFields.DEFAULT}
      title
      applications {
        title slug collectionType type
        media { ${mediaFields('default')} }
      }
  `,
  ComponentBlocksBlockDatasheets: `
      ${blockSettingsFields.DEFAULT}
      datasheets {
        title slug collectionType type
        file { ${mediaFields('default')} }
      }
  `,
  ComponentBlocksBlockGaskets: `
      ${blockSettingsFields.DEFAULT}
      gaskets {
        title slug collectionType type
        media { ${mediaFields('default')} }
      }
  `
}
