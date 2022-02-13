import { getStrapiMedia } from './medias'

export const globalSeo = {
  siteName: 'SRPCO',
  description: 'Custom Gasket Fabrication & Die-cutting Solutions Since 1951',
  image: '/favicon.png'
}

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


export const seoHead = (page) => {
    const { defaultSeo = {}, siteName = 'SRPCO' } = [null, undefined].includes(globalSeo) ? {} :globalSeo
    let { title = page?.title || null, image = page?.media || null, description = page?.description || null } = !!page && !!page.seo ? page.seo : {}
    if (!!!image && !!page?.image) { image = page?.image; }
    if (!!!image && !!defaultSeo.image) { image = defaultSeo.image; }
    if (!!!title && !!page?.title) { title = page?.title; }
    if (!!!title && !!defaultSeo?.title) { title = defaultSeo?.title; }
    if (!!!description && !!page?.description) { description = page?.description; }
    if (!!!description && !!defaultSeo.description) { description = defaultSeo.description; }
    const seo = { title, image, description };

    const fullSeo = {
      ...defaultSeo,
      ...Object.keys(seo).reduce((acc, key) => {
        if (seo[key] === null || typeof seo[key] === 'undefined') {
          return acc
        }
        return { ...acc, [key]: seo[key] }
      }, {})
    }
    const meta = getMetaTags(fullSeo)
    return {
      titleTemplate: `%s | ${siteName}`,
      title: fullSeo.title,
      meta
    }
}