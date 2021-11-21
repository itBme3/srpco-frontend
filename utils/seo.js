import { getStrapiMedia } from './medias'

export function getMetaTags (seo) {
  const tags = []

  if (seo.title) {
    tags.push(
      {
        property: 'og:title',
        content: seo.title
      },
      {
        name: 'twitter:title',
        content: seo.title
      }
    )
  }
  if (seo.description) {
    tags.push(
      {
        name: 'description',
        content: seo.description
      },
      {
        property: 'og:description',
        content: seo.description
      },
      {
        name: 'twitter:description',
        content: seo.description
      }
    )
  }
  if (seo.image) {
    const imageUrl = getStrapiMedia(seo.image.url)
    tags.push(
      {
        name: 'image',
        content: imageUrl
      },
      {
        property: 'og:image',
        content: imageUrl
      },
      {
        name: 'twitter:image',
        content: imageUrl
      }
    )
  }
  if (seo.article) {
    tags.push({
      property: 'og:type',
      content: 'article'
    })
  }
  tags.push({ name: 'twitter:card', content: 'summary_large_image' })

  return tags
}
