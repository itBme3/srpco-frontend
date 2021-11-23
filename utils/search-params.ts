export const strapiFilterParams = (queryParams: {[key:string]: any}, collection:string) => {
  const {
    limit = 6,
    sort = 'published_at:DESC',
    start = 0,
    q = null,
    supplier = null,
    type = null
  } = queryParams
  const query: { [key:string]: any } = { limit, sort, start, where: { supplier, type } }
  for (const key in query.where) {
    if (typeof query.where[key] !== 'string' || query.where[key].length === 0) {
      delete query.where[key]
    }
  }
  if (typeof q !== 'string' || q.length === 0) {
    return query
  }
  const w = query.where
  const searchFields = ['title', 'description', 'slug']
  if (collection === 'datasheets') {
    searchFields.push('fileContent')
  }
  if (['gaskets', 'resources', 'suppliers'].includes(collection)) {
    searchFields.push('content')
  }

  return {
    ...query,
    where: {
      _or: searchFields.reduce((acc:any[], key:string) => {
        return [...acc, { ...w, [`${key}_contains`]: q }]
      }, [])
    }
  }
}
