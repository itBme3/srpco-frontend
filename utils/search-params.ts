export const strapiFilterParams = (queryParams: { [key: string]: any }, collection: string) => {
  const {
    limit = 6,
    sort = ['publishedAt:DESC'],
    start = 0,
    q = null,
    supplier = null,
    type = null
  } = queryParams
  const query: { [key: string]: any } = { pagination: { limit, start }, sort: Array.isArray(sort) ? sort : [sort], filters: { supplier: { eq: supplier }, type: { eq: type } } }
  for (const key in query.filters) {
    if (typeof query.filters[key] !== 'string' || query.filters[key].length === 0) {
      delete query.filters[key]
    }
  }
  if (typeof q !== 'string' || q.length === 0) {
    return query
  }
  const queryFilters = query.filters
  const searchFields = ['title', 'description', 'slug']
  if (collection === 'datasheets') {
    searchFields.push('fileContent')
  }
  if (['gaskets', 'resources', 'suppliers'].includes(collection)) {
    searchFields.push('content')
  }

  return {
    ...query,
    filters: {
      or: searchFields.reduce((acc: any[], key: string) => {
        return [...acc, { ...queryFilters, [key]: { contains: q } }]
      }, [])
    }
  }
}
