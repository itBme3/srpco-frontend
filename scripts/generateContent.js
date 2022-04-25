const fs = require('fs')
const { promises: { readdir, unlink, mkdir } } = require('fs')
const path = require('path')
const axios = require('axios');
const apiUrl = process.env.NODE_ENV === 'production' && typeof process.env.API_URL === 'string' && process.env.API_URL.length > 0
  ? process.env.API_URL
      : typeof process.env.NGROK === 'string' && process.env.NGROK.length > 0
  ? `https://${process.env.NGROK}.ngrok.io` 
    : 'http://localhost:1337';

const { collectionTypes, populate, parseResponse } = require('../static/axiosDefaults')
      
const dirs = ['pages', ...collectionTypes.filter(c => !['tags'].includes(c))];

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

const getDirectories = async () => {
      return (await readdir('content', { withFileTypes: true }))
            .filter(dirent => dirent.isDirectory())
            .map(dirent => {
                  return dirent.name
            })
}

const getFilesInDir = async (dir) => {
      return (await readdir(dir, { withFileTypes: true }))
            .filter(dirent => dirent.isFile())
            .map(dirent => dirent.name)
}

const purgeCurrentContent = async () => {
      const directories = await getDirectories();
      const missingDirs = dirs.filter(dir => !directories.includes(dir))
      const currentFiles = await getFilesInDir('content');
      return await Promise.all([
            ...missingDirs.map(async dir => (await mkdir(path.join('content', dir), { recursive: true }))),
            ...currentFiles.map(async p => (await unlink(path.join('content', p)))),
            ...directories.map(async directory => {
                  const paths = (await readdir(path.join('content', directory)));
                  return await Promise.all(paths
                        .map(async p => (await unlink(path.join('content', directory, p)))))
            }),
      ])
}

const generateContent = async () => {
      return await purgeCurrentContent().then(async () => {
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
                  return await writeFile(outputPath, data)
            }))
      });
}

generateContent()
      .catch(console.error)