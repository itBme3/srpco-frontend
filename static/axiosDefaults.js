function isJsonObject(item) {
      try {
            item = ![undefined, null].includes(item) && ['number', 'string', 'boolean', 'function'].includes(typeof item)
                  ? item :
                  JSON.stringify(item);
            item = JSON.parse(item);
      } catch (e) {
            return false;
      }
      if (typeof item === "object" && item !== null) {
            return true;
      }
      return false;
}


const collectionTypes = [
      'gaskets',
      'applications',
      'materials',
      'suppliers',
      'resources',
      'services',
      'datasheets',
      'solutions'
]

const populate = ['media', 'seo.image', 'file',
      'blocks.media', 'blocks.file', 'blocks.sections',
      'blocks.blockSettings',
      'blocks.collectionSettings',
      'blocks.heroSettings',
      'buttons',
      'blocks.buttons',
      'blocks.links',
      'blocks.slides',
      'blocks.items',
      'blocks.cardSettings',
      'pageSettings',
      'settings',
      'supplier',
      'links',
      'links.nested',
      'supplier.media',
      ...collectionTypes,
      ...collectionTypes.map(collectionType => `${collectionType}.${collectionType === 'datasheets' ? 'file' : 'media' }`),
      ...collectionTypes.map(collectionType => `blocks.${collectionType}`),
      ...collectionTypes.map(collectionType => `solutions.used.${collectionType}`),
      ...collectionTypes.map(collectionType => `blocks.${collectionType}.${collectionType === 'datasheets' ? 'file' : 'media' }`),
      ...collectionTypes.map(collectionType => `blocks.sections.${collectionType}`),
      ...collectionTypes.map(collectionType => `blocks.sections.${collectionType}.${collectionType === 'datasheets' ? 'file' : 'media' }`),
]

const parseResponse = (_obj) => {
      if (!isJsonObject(_obj)) { return _obj }
      if (Array.isArray(_obj)) {
            return _obj.map(itm => parseResponse(itm))
      }
      const obj = Object.keys(_obj).includes('attributes')
            ? { ..._obj.attributes, id: _obj.id }
            : _obj;
            const keys = Object.keys(obj);
            if (!keys || !keys.length) {
                  return obj;
            }
            return keys.reduce((acc, key) => {
                  if (key === 'data') {
                        if (obj[key] === null) {
                              return acc
                        }
                        if (Array.isArray(obj.data)) {
                              return { ...acc, ...obj.data.map((_itm) => parseResponse({ id: _itm.id, ..._itm.attributes })) }
                        }
                        return { ...acc, ...parseResponse({ id: obj.data.id, ...obj.data.attributes }) }
                  }
                  if (Array.isArray(obj[key])) {
                        return {
                              ...acc, [key]: obj[key].map((itm) => {
                                    if (isJsonObject(itm)) {
                                          if (!!itm && !!itm.data) {
                                                if (Array.isArray(itm.data)) {
                                                      return itm.data.map((_itm) => parseResponse({ id: _itm.id, ..._itm.attributes }))
                                                }
                                                return parseResponse({ id: itm.id, ...itm.data.attributes })
                                          }
                                          return parseResponse(itm)
                                    }
                                    return itm
                              })
                        }
                  }
                  if (obj[key] && !!obj[key].data) {
                        if (Array.isArray(obj[key].data)) {
                              return { ...acc, [key]: obj[key].data.map((_itm) => parseResponse({ id: _itm.id, ..._itm.attributes })) }
                        }
                        return { ...acc, [key]: parseResponse({ id: obj[key].data.id, ...obj[key].data.attributes }) }
                  }
                  if (isJsonObject(obj[key])) {
                        return { ...acc, [key]: parseResponse(obj[key]) }
                  } else if (['publishedAt', 'createdAt', 'updatedAt'].includes(key)) {
                        return {...acc, [key]: new Date(obj[key]).getTime(), [`${key}String`]: obj[key]}
                  }
                  return { ...acc, [key]: obj[key] };
            }, {})
      }
const pathWhitelist = [
      '/',
      '/locations',
      '/contact',
      '/login',
      '/search'
]

module.exports = {
      collectionTypes,
      populate,
      parseResponse,
      pathWhitelist
}