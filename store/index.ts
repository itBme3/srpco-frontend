import qs from "qs";
import { CollectionType, EntryType } from "~/models/entry.model";
import { parseResponse, populate } from '~/static/axiosDefaults'

export const state = () => ({})

export const actions: any = {
      async getEntry({ dispatch }: any, props: { route: any, only?: string[] }): Promise<{ [key: string]: any } | string> {
            const { route = null, only = null } = props;
            if (!route) {
                  throw new Error('route was not defined')
            }
            const collectionTypes: CollectionType[] = Object.values(CollectionType);
            const pathSegments = route.path.replace('/', '').split('/')
            const collectionType = collectionTypes.includes(route?.slug)
                  ? route.slug
                  : collectionTypes.includes(route?.collection)
                        ? route.collection
                        : collectionTypes.includes(pathSegments[0])
                              ? pathSegments[0]
                              : CollectionType.PAGES;
            const entryType = collectionType[collectionType.length - 1] === 's' ? collectionType.slice(0, collectionType.length - 1) : collectionType;
            const slug = route?.params?.slug ? route.params.slug : route.path.split('/').pop();
            let entry: any;
            if (slug === collectionType) {
                  entry = await dispatch('getCollectionPage', collectionType).catch(console.error)
            } else {
                  let entryCall = this.$content(collectionType)
                        .where({ slug: slug })
                        .limit(1);
                  if (only?.length) { entryCall = entryCall.only(only) }
                  entry = await entryCall
                        .fetch()
                        .then((e: any) => Array.isArray(e) ? e[0] : null)
            }
            if (!!entry) {
                  return entry
            } else {
                  return await dispatch('getRedirectPath', { entryType, slug })
                        .catch((err: any) => {
                              console.error(err);
                              return '404';
                        });
            }
      },
      async getCollectionPage({ }, collectionType: CollectionType) {
            return await this.$content(`${collectionType}-collection`).fetch()
                  .catch(console.error)
      },
      async getRedirectPath({ }, { entryType, slug }: { entryType: EntryType, slug: string }) {
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

            let foundRedirect: any = await this.$content('redirects').where({ old: path }).limit(1).fetch()
                  .then((res: any) => Array.isArray(res) ? res[0] : null);
            if (foundRedirect?.new) {
                  return foundRedirect.new
            }
            const entriesWithMatchingSlug: any[] = await this.$content({ deep: true }).where({ slug: slug }).only(['slug', 'collectionType']).fetch()
            let foundMatch: any = null;
            for (let i = 0; i < collectionTypes.length && !foundMatch; i++) {
                  foundMatch = entriesWithMatchingSlug.filter(entry => entry.collectionType === collectionTypes[i])[0]
            }

            if (foundMatch) {
                  return `/${foundMatch.collectionType === 'pages' ? '' : `${foundMatch.collectionType}/`}${foundMatch.slug}`
            }

            return '404'

      },
      async getEntryUpdates({ }, props: { path: string, slug?: string, params?: { [key: string]: any } }) {
            const { slug = null } = props;
            let { params = {}, path } = props;
            if (!path) {
                  return
            }
            if (path?.indexOf('/') === 0) {
                  if (path === '/') {
                        path = 'homepage'
                  } else {
                        path = path.substring(1, path.length)
                  }
            }
            try {
                  if (Object.keys(params).length === 0) {
                        params = {}
                  }
            } catch {
                  params = {}
            }
            try {
                  if (slug) {
                        if (!params.filters) {
                              params.filters = {}
                        }
                        params.filters.slug = slug
                  }
                  const callParams = {
                        ...(params ? params : {})
                  }
                  const contentEntry = slug
                        ? await this.$content(path, slug)
                              .fetch()
                        : await this.$content(path)
                              .fetch();
                  const queryString = qs.stringify({
                        ...callParams,
                        fields: ['updatedAt']
                  }, { encodeValuesOnly: true });
                  const shouldFetchUpdates = await this.$axios.$get(`${process.env.apiUrl}/api/${path}?${queryString}`).then((res: any) => {
                        const entry = Array.isArray(res.data) && res.data[0]?.attributes
                              ? res.data[0]?.attributes
                              : res.data?.attributes;
                        const contentEntryUpdated = new Date(contentEntry?.updatedAt || 0).getTime();
                        const updatedAt = new Date(entry?.updatedAt || Date.now()).getTime();
                        return !contentEntry?.updatedAt || updatedAt > contentEntryUpdated
                  });
                  callParams.populate = populate;
                  if (shouldFetchUpdates) {
                        const queryString = qs.stringify(callParams, { encodeValuesOnly: true })
                        return this.$axios.$get(`${process.env.apiUrl}/api/${path}?${queryString}`)
                              .then((res: any) => res?.data ? parseResponse(Array.isArray(res.data) ? res.data[0] : res.data) : {})
                  }
                  return {}
            } catch (err) {
                  console.error(err);
                  return {}
            }
      }
}