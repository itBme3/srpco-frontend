import { CollectionType, EntryType } from "~/models/entry.model";

export const state = () => ({})

export const actions: any = {
      async getEntry({ dispatch }: any, props: { path: string, redirect?: Function | null }): Promise<{ [key: string]: any } | string | null> {
            const { path, redirect = null } = props;
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
                  entry = await dispatch('getCollectionPage', collectionType).catch(console.error)
            } else {
                  entry = await this.$content(collectionType)
                        .where({ slug: slug })
                        .limit(1)
                        .fetch()
                        .then((e: any) => Array.isArray(e) ? e[0] : null)
            }
            console.log({ entry })
            if (!!entry) {
                  return entry
            } else {
                  return await dispatch('getRedirectPath', { entryType, slug })
                        .then((path: any) => {
                              if (typeof path === 'string' && typeof redirect === 'function') {
                                    return redirect(302, path)
                              }
                              return path
                        })
                        .catch((err: any) => {
                              console.error(err);
                              return null;
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
            for (let i = 0; i < collectionTypes.length && !foundRedirect; i++) {
                  await (async () => {
                        foundRedirect = await this.$content(collectionTypes[i]).where({ slug: slug }).limit(1).fetch()
                              .then((res: any) => Array.isArray(res) && res[0]?.slug ? `${collectionTypes[i] === 'pages' ? `/${res[0]?.slug}` : `/${collectionTypes[i]}/${res[0]?.slug}`}` : null);
                        return foundRedirect
                  })()
                  if (foundRedirect) {
                        return foundRedirect
                  }
                  if (i === collectionTypes.length - 1) {
                        return '404'
                  }
            }
      }
}