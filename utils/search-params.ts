export const strapiFilterParams = (queryParams: { [key: string]: any }, collection: string) => {
  const {
    limit = 6,
    sort = ['publishedAt:DESC'],
    start = 0,
    q = null,
    supplier = null,
    suppliers = null,
    type = null,
    constantFilters = {}
  } = queryParams
  const query: { [key: string]: any } = {
    pagination: { limit, start },
    sort: Array.isArray(sort) ? sort : [sort],
    filters: {
      ...constantFilters,
      supplier: {
        slug: { [Array.isArray(supplier) ? 'in' : 'eq']: supplier }
      },
      suppliers: {
        slug: { [Array.isArray(suppliers) ? 'in' : 'eq']: suppliers }
      },
      resourceType: {
        [Array.isArray(type) ? 'containsi' : 'eq']: type
      }
    }
  }
  for (const key in query.filters) {
    const operator = ['suppliers', 'supplier'].includes(key)
      ? Object.keys(query.filters[key].slug)[0]
      : Object.keys(query.filters[key])[0]
    if (
      (['suppliers', 'supplier'].includes(key) && ((typeof query.filters[key].slug[operator] !== 'string' && !Array.isArray(query.filters[key].slug[operator])) || !query.filters[key].slug[operator]?.length))
      || (!['suppliers', 'supplier'].includes(key) && ((typeof query.filters[key][operator] !== 'string' && !Array.isArray(query.filters[key][operator])) || !query.filters[key][operator]?.length))
    ) {
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
  if (['gaskets', 'datasheets', 'resources', 'suppliers'].includes(collection)) {
    searchFields.push('content')
  }

  return {
    ...query,
    filters: {
      or: searchFields.reduce((acc: any[], key: string) => {
        return [...acc, { ...queryFilters, [key]: { containsi: q } }]
      }, [])
    }
  }
}
