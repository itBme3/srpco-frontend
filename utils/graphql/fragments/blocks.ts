
import { mediaFields } from '~/utils/graphql/fragments/fields'

export const blockSettingsFields = {
  DEFAULT: 'id __typename blockSettings { classes sidebar }',
  card: `cardSettings { style classes }`,
  collection: `
    collectionType
    collectionSettings { sort limit infiniteScroll searchBar filters updateUrl }
    cardSettings { style classes }
  `
}

export const blockFields: { [key: string]: string } = {
  ComponentBlockCard: `
      title text link openNewTab
      media { ${mediaFields.default} }
      ${blockSettingsFields.DEFAULT}
      ${blockSettingsFields.card}
  `,
  ComponentBlockHero: `
      ${blockSettingsFields.DEFAULT}
      title text youtube
      heroSettings { classes style }
      buttons { id text link openNewTab buttonClasses }
      media { ${mediaFields.default} }
  `,
  ComponentBlockContent: `
      ${blockSettingsFields.DEFAULT}
      title content
  `,
  ComponentBlockSpacer: `
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlockCollection: `
      ${blockSettingsFields.DEFAULT}
      ${blockSettingsFields.card}
      collectionType collectionSettings { sort limit infiniteScroll updateUrl }
  `,
  ComponentBlockServices: `
      ${blockSettingsFields.DEFAULT}
      title
      services {
        data {
          id
          attributes {
            title slug collectionType type youtube
            media { ${mediaFields.default} }
          }
        }
      }
  `,
  ComponentBlockResources: `
      ${blockSettingsFields.DEFAULT}
      title
      resources {
        data {
          id
          attributes {
          title slug resourceType collectionType type
          media { ${mediaFields.default} }
          }
        }
      }
  `,
  ComponentBlockMaterials: `
      ${blockSettingsFields.DEFAULT}
      title
      materials {
        data {
          id
          attributes {
        title slug collectionType type
        media { ${mediaFields.default} }
          }
        }
      }
  `,
  ComponentBlockApplications: `
      ${blockSettingsFields.DEFAULT}
      title
      applications {
        data {
            id
            attributes {
              title slug collectionType type
              media { ${mediaFields.default} }
            }
        }
      }
  `,
  ComponentBlockDatasheets: `
      ${blockSettingsFields.DEFAULT}
      datasheets {
        data {
            id
            attributes {
              title slug collectionType type
              file { ${mediaFields.default} }
            }
        }
      }
  `,
  ComponentBlockGaskets: `
      ${blockSettingsFields.DEFAULT}
      gaskets {
        data {
          id
          attributes {
            title slug collectionType type
            media { ${mediaFields.default} }
          }
        }
      }
  `,
  ComponentBlockGroup: `
      ${blockSettingsFields.DEFAULT}
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
              media { ${mediaFields.default} }
            }
          }
        }
        datasheets {
          data {
            id
            attributes {
              title slug collectionType type
              file { ${mediaFields.default} }
            }
          }
        }
        materials {
          data {
            id
            attributes {
              title slug collectionType type
              media { ${mediaFields.default} }
            }
          }
        }
      }
  `,
  ComponentSolutionsChallenge: `
    ${blockSettingsFields.DEFAULT}
    title content
  `,
  ComponentSolutionsSolution: `
    ${blockSettingsFields.DEFAULT}
    title content
  `,
  ComponentSolutionsResults: `
    ${blockSettingsFields.DEFAULT}
    title content
  `,
  ComponentSolutionsUsed: `
    ${blockSettingsFields.DEFAULT}
    ${blockSettingsFields.card}
    title content
    gaskets {
      data { id attributes {
          title slug collectionType type
          media { ${mediaFields.default} }
        }
      }
    }
    datasheets {
      data { id attributes {
          title slug collectionType type
          file { ${mediaFields.tiny} }
        }
      }
    }
    materials {
      data { id attributes {
          title slug collectionType type
          media { ${mediaFields.default} }
        } 
      }
    }
  `
}


export const defaultBlockFields: string = [
  'ComponentBlockCard',
  'ComponentBlockGroup',
  'ComponentBlockContent',
  'ComponentBlockSpacer',
].reduce((acc, key: string) => {
  return acc + `
      ... on ${key} {
          ${blockFields[key]}
      }`
}, '');