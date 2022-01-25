<template>
  <div class="single-entry gasket">
    <h1>test page</h1>
    <pre v-if="!!page"><code>{{ JSON.stringify(page, null, 4) }}</code></pre>
    <!-- <Heading
      v-if="![null, undefined].includes(page)"
      heading-type="page"
      :title="page.title"
      :description="page.description"
      :media="page.media"
      media-ratio="4:3"
      media-classes="rounded-mg shadow-2xl max-w-[380px]"
    />
    <div
      v-if="![null, undefined].includes(page) && Array.isArray(page.blocks) && page.blocks.length > 0"
      class="blocks grid-cols-12 before:box-inherit after:box-inherit"
    >
      <div
        v-if="![undefined, null].includes(page) && typeof page.content === 'string'"
        class="page-content entry-block col-span-12"
      >
        <BlockContent :block="{ content: page.content }" />
      </div>
      <template v-for="(block, index) in page.blocks">
        <Block
          v-if="![null, undefined].includes(block)"
          class="break-inside"
          :key="block.id + '-' + index"
          :block="block"
        />
      </template>
    </div>
    <EntrySideBar :blocks="['one block', 'two', 'three']" /> -->
  </div>
</template>

<script>
import { EntryType } from '~/models/entry.model'
import { entryBySlug } from '~/utils/graphql/requests/single'
import { $graph } from '~/utils/graphql/init'
import { gql } from 'graphql-request'
import { parseResponse } from '~/utils/graphql/responses'

export default {
  scrollToTop: true,
  async asyncData ({ params }) {
    // const slug = params.slug
    const slug = 'adhesives-tapes'
    const filters = `{ slug: { eq: "${slug}" } }`
    const _query = gql`
      query {
        gaskets(filters: { slug: { eq: "${slug}" } }) {
          data {
            id
            attributes {
                title description
                seo { 
                  title description
                  image {
                    data { id attributes { url formats } }
                  }
                } slug type collectionType
                tags { data { id attributes { title slug } } }
                media {
                  data { attributes { name url alternativeText mime formats caption } }
                }
                content
                blocks {
                    ... on ComponentBlockContent { 
                            title content titleClasses contentClasses
                            id __typename blockSettings { blockClasses classes }
                        }
                    ... on ComponentBlockCard { 
                            title text link openNewTab
                            media {
                                data { attributes { name url alternativeText mime formats caption } }
                            }
                            id __typename blockSettings { blockClasses classes }
                            
                        cardSettings {
                            style classes
                        }
                    }
                    ... on ComponentBlockSpacer { 
                        id __typename blockSettings { blockClasses classes }
                    }
                    ... on ComponentBlockResources { 
                        id __typename blockSettings { blockClasses classes }
                        title
                        resources {
                            data {
                            id
                            attributes {
                            title slug resourceType collectionType type
                            media { data { attributes { name url alternativeText mime formats caption } } }
                            }
                            }
                        }
                    }
                    ... on ComponentBlockDatasheets { 
                        id __typename blockSettings { blockClasses classes }
                        datasheets {
                            data {
                                id
                                attributes {
                                title slug collectionType type
                                file { data { attributes { name url alternativeText mime formats caption } } }
                                }
                            }
                        }
                    }
                    ... on ComponentBlockGroup { 
                        id __typename blockSettings { blockClasses classes }
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
                                media { data { attributes { name url alternativeText mime formats caption } } }
                                }
                            }
                            }
                            datasheets {
                            data {
                                id
                                attributes {
                            title slug collectionType type
                            file { data { attributes { name url alternativeText mime formats caption } } }
                                }
                            }
                            }
                            materials {
                            data {
                                id
                                attributes {
                            title slug collectionType type
                            media { data { attributes { name url alternativeText mime formats caption } } }
                                }
                            }
                            }
                        }
                    }
                }
            }
        }
        }
      }
    `

    const page =
      // await $graph.request(_query)
      await entryBySlug(EntryType.GASKET, slug)
        .then(res => {
          return res
          // if (!!!res?.gaskets?.data?.length) return null;
          // return parseResponse({ id: res.gaskets.data[0].id, ...res.gaskets.data[0].attributes })
        })
    console.log({ page })
    return {
      // slug: params.slug,
      slug: slug,
      page
    }
  },
  // watch: {
  //   slug: {
  //     immediate: true,
  //     async handler (slug) {
  //       this.page = slug !== undefined ? await entryBySlug(EntryType.GASKET, slug) : null
  //       return this.page
  //     }
  //   }
  // }
}
</script>
