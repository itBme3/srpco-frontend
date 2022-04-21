const fs = require('fs')
const path = require('path')
const axios = require('axios');
const apiUrl = process.env.NODE_ENV === 'production' && typeof process.env.API_URL === 'string' && process.env.API_URL.length > 0
  ? process.env.API_URL
      : typeof process.env.NGROK === 'string' && process.env.NGROK.length > 0
  ? `https://${process.env.NGROK}.ngrok.io` 
    : 'http://localhost:1337';

console.log({apiUrl})
const { collectionTypes, populate, parseResponse } = require('../static/axiosDefaults')
// const collectionTypes = [
//       'gaskets',
//       'applications',
//       'materials',
//       'suppliers',
//       'resources',
//       'services',
//       'datasheets',
//       'solutions'
// ]

// const populate = ['media', 'seo.image', 'file',
//       'blocks.media', 'blocks.file', 'blocks.sections',
//       'blocks.blockSettings',
//       'blocks.collectionSettings',
//       'blocks.heroSettings',
//       'buttons',
//       'blocks.cardSettings',
//       'pageSettings',
//       'settings',
//       'supplier',
//       'links',
//       'links.nested',
//       'supplier.media',
//       ...collectionTypes,
//       ...collectionTypes.map(collectionType => `${collectionType}.${collectionType === 'datasheets' ? 'file' : 'media' }`),
//       ...collectionTypes.map(collectionType => `blocks.${collectionType}`),
//       ...collectionTypes.map(collectionType => `blocks.${collectionType}.${collectionType === 'datasheets' ? 'file' : 'media' }`),
//       ...collectionTypes.map(collectionType => `blocks.sections.${collectionType}`),
// ]



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