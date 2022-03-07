import { getMetaTags } from '~/utils/seo'

export const seoHead = (globalSeo, page) => {
    const { defaultSeo = {}, siteName = 'SRPCO' } = [null, undefined].includes(globalSeo) ? {} :globalSeo
    let { title = page?.title || null, image = page?.media || null, description = page?.description || null } = !!page && !!page.seo ? page.seo : {}
    if (!image && !!page?.image) { image = page?.image; }
    if (!image && !!defaultSeo.image) { image = defaultSeo.image; }
    if (!title && !!page?.title) { title = page?.title; }
    if (!title && !!defaultSeo?.title) { title = defaultSeo?.title; }
    if (!description && !!page?.description) { description = page?.description; }
    if (!description && !!defaultSeo.description) { description = defaultSeo.description; }
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