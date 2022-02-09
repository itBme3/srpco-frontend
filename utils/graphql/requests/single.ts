import { gql } from 'graphql-request'
import { $graph } from '~/utils/graphql/init'
import { CollectionType, EntryType } from '~/models/entry.model'
import { getEntryFields } from '~/utils/graphql/fragments/entries'
import { getCollectionPage } from '~/utils/graphql/requests/collection'
import { parseResponse } from '../responses'
import { capitalize } from '~/utils/funcs'

export const entryBySlug = async (entryType: EntryType | null, slug: string, redirect: Function | null = null) => {
      if (entryType === null) { return }
      const entry: { [key: string]: any } | string | null = await getSingleEntry(entryType)
            .then(res => res === undefined ? null : res)
            .catch(err => {
                  console.error(err)
                  return null
            });
      if (typeof entry === 'string' || entry === null) { return entry }
      const res = typeof entry === 'string' || entry === null
            ? entry
            : parseResponse({ id: entry.id, ...entry.attributes });
      return res
}

export const getSingleEntry = async (path: string, redirect: Function | null = null): Promise<{ [key: string]: any } | string | null> => {
      const collectionTypes: { [key: string]: CollectionType } = {};
      Object.values(CollectionType).forEach((key: CollectionType) => {
            collectionTypes[`${key}`] = key
      }, {});
      const pathSegments = path.replace('/', '').split('/')
      const collectionType = Object.keys(collectionTypes).includes(pathSegments[0])
            ? collectionTypes[pathSegments[0]]
            : CollectionType.PAGES;
      const entryType = collectionType[collectionType.length - 1] === 's' ? collectionType.slice(0, collectionType.length - 1) : collectionType;
      const slug = path.split('/').pop();
      let entry: any;
      if (slug === collectionType) {
            entry = await getCollectionPage(collectionType).catch(console.error)
      } else {
            entry = await $graph.request(gql`
                  query {
                        ${collectionType}(filters: { slug: { eq: "${slug}" } }, pagination: { limit: 1 }) {
                              data {
                                    id
                                    attributes {
                                          ${getEntryFields(entryType, 'page', entryType === EntryType.DATASHEET ? 'file' : 'media')}
                                    }
                              }
                        }
                  }
            `).then(res => {
                  return !!res[collectionType]?.data?.length ? res[collectionType].data[0] : null
            }).catch(err => {
                  return { data: [], ERROR: err.message }
            });
      }
      if (!!entry) {
            if (slug === collectionType) { return entry }
            return parseResponse({ id: entry.id, ...entry.attributes })
      } else {
            return await getRedirectPath(entryType, slug)
                  .then((path: any) => {
                        if (typeof path === 'string' && typeof redirect === 'function') { redirect(302, path) }
                        return path
                  })
                  .catch((err: any) => {
                        console.error(err);
                        return null;
                  });
      }
}

export const getRedirectPath: any = async (entryType: EntryType, slug: string) => {
      const _collectionTypes = Object.values(CollectionType).map(t => `${t}`);
      const collectionType = `${entryType}s`
      const path = `${collectionType === 'pages' ? '' : `/${collectionType}`}/${slug}`
      const priorityCollectionTypes: { [key: string]: string[] } = {
            gaskets: ['materials', 'datasheets'],
            materials: ['gaskets', 'datasheets'],
            datasheets: ['gaskets', 'materials']
      }
      const collectionTypes: string[] = Object.keys(priorityCollectionTypes).includes(collectionType)
            ? [...priorityCollectionTypes[collectionType], ..._collectionTypes.filter(t => !priorityCollectionTypes[collectionType].includes(t))]
            : _collectionTypes;
      const redirectQuery = `query {
            redirects(filters: { old: { eq: "${path}" } } pagination: { limit: 1 } ) {
                  data { attributes {  old new } }
            }
            ${collectionTypes.map(collectionType => {
            return `${collectionType}( filters: { slug: { eq: "${slug}" } } pagination: { limit: 1 }) {
                              data { attributes {  slug type } }
                  }`
      })}
      }`;
      return await $graph.request(gql`${redirectQuery}`).then((res: any) => {
            if (!!res?.redirects?.data?.length) {
                  return res.redirects.data[0].attributes.new;
            }
            const matched = Object.keys(res).reduce((acc: any, key: string) => {
                  if (!!!res[key]?.data?.length) { return acc }
                  return { ...acc, [key]: res[key].data[0].attributes }
            }, {});
            let redirectPath: string | null = null
            for (let i = 0; i < collectionTypes.length && typeof redirectPath !== null; i++) {
                  if (!!matched[collectionTypes[i]]) {
                        redirectPath = `/${collectionTypes[i] === 'pages' ? '' : collectionTypes[i]}/${slug}`
                  }
            }
            return redirectPath;
      }).catch(err => {
            console.error(err)
            return null
      });
}