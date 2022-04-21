const fs = require('fs')
const path = require('path')
const axios = require('axios');
const apiUrl = typeof process.env.NGROK === 'string' && process.env.NGROK.length > 0
  ? `https://${process.env.NGROK}.ngrok.io`
    : typeof process.env.API_URL === 'string' && process.env.API_URL.length > 0
  ? process.env.API_URL 
    : 'http://localhost:1337';

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
      'blocks.cardSettings',
      'pageSettings',
      'settings',
      'supplier',
      'links',
      'nested',
      ...collectionTypes,
      ...collectionTypes.map(collectionType => `blocks.${collectionType}`),
      ...collectionTypes.map(collectionType => `blocks.sections.${collectionType}`),
]

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


function parseResponse(_obj) {
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
                  }
                  return { ...acc, [key]: obj[key] };
            }, {})
      }


const getEntries = async (collectionType, params = {}) => {
      return await axios(`${apiUrl}/api/${collectionType}`, {
            params: {
                  ...params,
                  'pagination[limit]': 200,
                  populate
            }
      }).then(res => res && res.data && res.data.data ? parseResponse(res.data.data) : res)
}

const fetchContent = async ({ dir, slug }) => {
      try {
            if (dir === 'entries') {
                  return await getEntries(slug,
                        {
                              publicationState: 'live',
                              'pagination[limit]': 200
                        }
                  )
            }
            if (dir === 'collection') {
                  return await getEntries(`${slug}-collection`)
            }
            return await getEntries(slug)
      } catch (err) {
            console.error(err)
            return null
      }
}

const writeFile = (path, data) => {
      const fileData = JSON.stringify(data)
      if (typeof fileData !== 'string') { resolve(null) }
      return new Promise((resolve) => {
            fs.writeFile(path, fileData, (err) => {
                  if (err) {
                        console.error(err)
                  }
                  resolve(data)
            })
      })
}

const generateContent = async () => {
      const filePaths = [
            ...['navigation', 'footer', 'homepage', 'tags', 'redirects'].map(slug => path.join('/', slug)),
            ...collectionTypes.map(slug => `/${slug}-collection`),
            ...['pages', ...collectionTypes].map(slug => `/${slug}`)
      ]
      return await Promise.all(filePaths.map(async filePath => {
            const pathSegments = filePath.split('/');
            const slug = (() => {
                  const _slug = pathSegments.pop()
                  if (typeof _slug === 'string') { return _slug }
                  return null
            })();
            const dir = (() => {
                  const _dir = pathSegments.pop()
                  if (typeof _dir === 'string') {
                        return !_dir.length ? '/' : _dir
                  }
                  return null
            })();
            if (!dir || !slug) {
                  return;
            }
            const data = await fetchContent({ dir, slug });
            if (!data) { return }
            if (['pages', ...collectionTypes].includes(slug)) {
                  return await Promise.all((Array.isArray(data) ? data : [data]).map(async entry => {
                        if (!entry || !entry.slug) {
                              console.error('missing slug')
                              return
                        }
                        const outputPath = path.join(`content`, filePath, `${entry.slug}.json`)
                        return await writeFile(outputPath, entry)
                  }))
            }
            const outputPath = path.join(`content`, `${filePath}.json`)
            if (dir === '/') {
                  if (slug === 'redirects' && Array.isArray(data)) {
                        data.forEach((entry) => {
                              entry.slug = entry.old
                        })
                  }
            }
            console.log({generated: outputPath})
            return await writeFile(outputPath, data)
      }))
}

generateContent()
      .catch(console.error)