
import { mediaFields } from '~/utils/graphql/fragments/fields'

export const blockSettingsFields = {
  DEFAULT: 'id __typename',
  card: `
  cardSettings {
      style cardClasses mediaClasses titleClasses textClasses
  }`,
  collection: `
    collectionType
    collectionSettings {
      sort limit infiniteScroll updateUrl
    }
    cardSettings {
      cardClasses mediaClasses titleClasses textClasses style
    }
  `
}

export const blockFields: { [key: string]: string } = {
  ComponentBlockCard: `
      title text link openNewTab
      media {
        ${mediaFields()}
      }
      blockSettings { blockClasses }
      ${blockSettingsFields.DEFAULT}
      ${blockSettingsFields.card}
  `,
  ComponentBlockHero: `
      ${blockSettingsFields.DEFAULT}
      title text youtube
      heroSettings { containerClasses mediaClasses titleClasses textClasses contentClasses buttonsClasses overlayClasses style }
      buttons { id text link openNewTab buttonClasses }
      media { ${mediaFields()} }
      blockSettings { blockClasses }
  `,
  ComponentBlockContent: `
      ${blockSettingsFields.DEFAULT}
      title content titleClasses contentClasses
      blockSettings { blockClasses }
  `,
  ComponentBlockSpacer: `
      ${blockSettingsFields.DEFAULT}
      blockSettings { blockClasses }
  `,
  ComponentBlockCollection: `
      ${blockSettingsFields.DEFAULT}
      collectionType collectionSettings { sort limit infiniteScroll updateUrl }
      ${blockSettingsFields.card}
      blockSettings { blockClasses }
  `,
  ComponentBlockServices: `
      ${blockSettingsFields.DEFAULT}
      blockSettings { blockClasses }
      title
      services {
        data {
          id
          attributes {
            title slug collectionType type youtube
            media { ${mediaFields('default')} }
          }
        }
      }
  `,
  ComponentBlockResources: `
      ${blockSettingsFields.DEFAULT}
      blockSettings { blockClasses }
      title
      resources {
        data {
          id
          attributes {
        title slug resourceType collectionType type
        media { ${mediaFields('default')} }
          }
        }
      }
  `,
  ComponentBlockMaterials: `
      ${blockSettingsFields.DEFAULT}
      blockSettings { blockClasses }
      title
      materials {
        data {
          id
          attributes {
        title slug collectionType type
        media { ${mediaFields('default')} }
          }
        }
      }
  `,
  ComponentBlockApplications: `
      ${blockSettingsFields.DEFAULT}
      blockSettings { blockClasses }
      title
      applications {
        data {
            id
            attributes {
              title slug collectionType type
              media { ${mediaFields('default')} }
            }
        }
      }
  `,
  ComponentBlockDatasheets: `
      ${blockSettingsFields.DEFAULT}
      blockSettings { blockClasses }
      datasheets {
        data {
            id
            attributes {
              title slug collectionType type
              file { ${mediaFields('default')} }
            }
        }
      }
  `,
  ComponentBlockGaskets: `
      ${blockSettingsFields.DEFAULT}
      blockSettings { blockClasses }
      gaskets {
        data {
          id
          attributes {
            title slug collectionType type
            media { ${mediaFields('default')} }
          }
        }
      }
  `,
  ComponentBlockGroup: `
      ${blockSettingsFields.DEFAULT}
      blockSettings { blockClasses }
      groupStyle
      title
      sections {
        id title
        content
        gaskets {
          data {
            id
            attributes {
              title slug collectionType type
              media { ${mediaFields('default')} }
            }
          }
        }
        datasheets {
          data {
            id
            attributes {
          title slug collectionType type
          file { ${mediaFields('default')} }
            }
          }
        }
        materials {
          data {
            id
            attributes {
          title slug collectionType type
          media { ${mediaFields('default')} }
            }
          }
        }
      }
  `
}
