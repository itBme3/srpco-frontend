
import { mediaFields } from '~/utils/graphql/fragments/fields'

export const blockSettingsFields = {
  DEFAULT: 'id __typename blockSettings { classes sidebar }',
  card: `cardSettings { style classes showExcerpt showMoreLinks }`,
  collection: `
    collectionType
    collectionSettings { sort limit infiniteScroll searchBar filters updateUrl }
    cardSettings { style classes }
  `
}

export const blockFields: { [key: string]: string } = {
  ComponentBlockCard: `
      title text link openNewTab youtube
      media { ${mediaFields.default} }
      ${blockSettingsFields.DEFAULT}
      ${blockSettingsFields.card}
  `,
  ComponentBlockCarousel: `
    slides { media { ${mediaFields.default} } content classes }
    carouselOptions
    ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlockHero: `
      title text youtube
      heroSettings { classes style }
      buttons { id text link openNewTab buttonClasses }
      ${blockSettingsFields.DEFAULT}
      media { ${mediaFields.default} }
  `,
  ComponentBlockButtons: `
      title
      buttons { id text link openNewTab buttonClasses }
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlockContent: `
      title content
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlockSpacer: `
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlockCollection: `
      collectionType title
      collectionSettings {
        sort limit
        updateUrl
        loadingMore
        buttonLink
        buttonText
      }
      ${blockSettingsFields.DEFAULT}
      ${blockSettingsFields.card}
  `,
  ComponentBlockServices: `
      title
      services {
        data {
          id
          attributes {
            title slug
              collectionType
              type youtube
            media { ${mediaFields.default} }
          }
        }
      }
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlockResources: `
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
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlockMaterials: `
      title
      materials {
        data {
          id
          attributes {
        title slug
              collectionType
              type
        media { ${mediaFields.default} }
          }
        }
      }
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlockApplications: `
      title
      applications {
        data {
            id
            attributes {
              title slug
              collectionType
              type
              media { ${mediaFields.default} }
            }
        }
      }
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlockDatasheets: `
      datasheets {
        data {
            id
            attributes {
              title slug
              collectionType
              type
              file { ${mediaFields.default} }
            }
        }
      }
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlockGaskets: `
      gaskets {
        data {
          id
          attributes {
            title slug
            collectionType
            type
            media { ${mediaFields.default} }
          }
        }
      }
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentBlockGroup: `
      groupStyle
      title
      sections {
        id title
        content
        gaskets {
          data {
            id
            attributes {
              title slug
              collectionType
              type
              media { ${mediaFields.default} }
            }
          }
        }
        datasheets {
          data {
            id
            attributes {
              title slug
              collectionType
              type
              file { ${mediaFields.default} }
            }
          }
        }
        materials {
          data {
            id
            attributes {
              title slug
              collectionType
              type
              media { ${mediaFields.default} }
            }
          }
        }
        resources {
          data {
            id
            attributes {
              title slug
              collectionType
              type
              media { ${mediaFields.default} }
            }
          }
        }
      }
      ${blockSettingsFields.DEFAULT}
  `,
  ComponentSolutionsChallenge: `
    title content
    ${blockSettingsFields.DEFAULT}
  `,
  ComponentSolutionsSolution: `
    title content
    ${blockSettingsFields.DEFAULT}
  `,
  ComponentSolutionsResults: `
    title content
    ${blockSettingsFields.DEFAULT}
  `,
  ComponentSolutionsUsed: `
    title content
    gaskets {
      data { id attributes {
          title
          slug
          collectionType
          type
          media { ${mediaFields.default} }
        }
      }
    }
    datasheets {
      data { id attributes {
          title
          slug
          collectionType
          type
          file { ${mediaFields.tiny} }
        }
      }
    }
    materials {
      data { id attributes {
          title
          slug
          collectionType
          type
          media { ${mediaFields.default} }
        } 
      }
    }
    ${blockSettingsFields.DEFAULT}
    ${blockSettingsFields.card}
  `,
  ComponentBlockIconList: `
    title 
    icon 
    items { 
      id icon text classes 
    }
    ${blockSettingsFields.DEFAULT}
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