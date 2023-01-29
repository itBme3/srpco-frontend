import qs from "qs";
import { CollectionType, EntryType, EntryItem } from "~/models/entry.model";
import { parseResponse, populate } from '~/static/axiosDefaults'

const defaultSort = 'publishedAt:desc';

interface State {
	entry: EntryItem | null;
	collectionType: CollectionType | null;
	next: EntryItem[];
	filters: Record<string, any>;
	sort: string;
}
const INITIAL_STATE: State = {
	next: [],
	collectionType: null,
	sort: defaultSort,
	entry: null,
	filters: {},
};

export const state = () => (INITIAL_STATE);

export const mutations = {
      setEntry(state: any, entry: any) {
            state.entry = entry
	},
	setNext(state: any, val: EntryItem[] | null = null) {
            state.next = val
      },
	setCollectionType(state: any, collectionType: CollectionType | null) {
            state.collectionType = collectionType
	},
	/** used on single entries to determine where user came from */
	setCollectionInfo(state: any, val: { sort: string, entry: number, collection: CollectionType, filters?: any }) {
            const { sort: initialSort = defaultSort, entry = null, filters = {}, collection = null } = val;
            let sort = Array.isArray(initialSort) ? initialSort[0] : initialSort;
            if (!sort.includes(':')) {
                  sort = ['published', 'created', 'updated'].includes(sort) ? `${sort}At:desc` : `${sort}:desc`
            }
            state.sort = sort;
            state.entry = entry;
            state.filters = filters;
            state.collection = collection;
      },
}

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
                  entry = await dispatch('getCollectionEntry', collectionType).catch(console.error)
            } else {
                  let entryCall = this.$content(collectionType)
                        .where({ slug })
                        .limit(1);
                  if (only?.length) { entryCall = entryCall.only(only) }
                  entry = await entryCall
                        .fetch()
                        .then((e: any) => Array.isArray(e) ? e[0] : null)
            }
		if (entry) {
			return entry;
		}
		return await dispatch('getRedirect', { entryType, slug })
			.catch((err: any) => {
				console.error(err);
				return '404';
			});
      },
      async getCollectionEntry(_stuff: any, collectionType: CollectionType) {
            return await this.$content(`${collectionType}-collection`).fetch()
                  .catch(console.error)
      },
      async getRedirect(_stuff: any, { entryType, slug }: { entryType: EntryType, slug: string }) {
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

            const foundRedirect: any = await this.$content('redirects').where({ old: {$in: [path, `${path}/`]} }).limit(1).fetch()
                  .then((res: any) => Array.isArray(res) ? res[0] : null);
            if (foundRedirect?.new) {
                  return foundRedirect.new
            }
            const entriesWithMatchingSlug: any[] = await this.$content({ deep: true }).where({ slug }).only(['slug', 'collectionType']).fetch()
            let foundMatch: any = null;
            for (let i = 0; i < collectionTypes.length && !foundMatch; i++) {
                  foundMatch = entriesWithMatchingSlug.filter(entry => entry.collectionType === collectionTypes[i])[0]
            }

            if (foundMatch) {
                  return `/${foundMatch.collectionType === 'pages' ? '' : `${foundMatch.collectionType}/`}${foundMatch.slug}`
            }

            return '404'

      },
      async getUpdates(_stuff:any, props: { path: string, slug?: string, params?: { [key: string]: any } }) {
            const { slug = null } = props;
            const { params = {} } = props;
            let { path } = props;
            if (!path) {
                  return
            }
            if (path?.indexOf('/') === 0) {
                  if (path === '/') {
                        path = 'homepage'
                  } else {
                        path = path.substring(1)
                  }
            }
            try {
                  if (slug) {
                        if (!params.filters) {
                              params.filters = {}
                        }
                        params.filters.slug = slug
                  }
                  const contentEntry = slug
                        ? await this.$content(path, slug)
                              .fetch()
                        : await this.$content(path)
                              .fetch();
                  const queryString = qs.stringify({
                        ...params,
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
			params.populate = populate;
                  if (shouldFetchUpdates) {
				const queryString = qs.stringify(params, { encodeValuesOnly: true });
                        const entry = await this.$axios.$get(`${process.env.apiUrl}/api/${path}?${queryString}`)
					.then((res: any) => res?.data ? parseResponse(Array.isArray(res.data) ? res.data[0] : res.data) : {})
				return entry;
                  }
                  return {}
            } catch (err) {
                  console.error(err);
                  return {}
            }
	},
	async getNextEntries({ commit, state }: any) {
		const { sort: initialSort = defaultSort, collectionType = '', entry = null }: { sort: string[] | string, collectionType: string, filters: any, entry: any } = state;
            let { filters: initialFilters = {} } = state;
            if (!!!initialFilters) {
                  initialFilters = {}
            }
            if (!['resources', 'solutions'].includes(collectionType)) {
                  state = INITIAL_STATE;
                  return;
            }
            const sort = Array.isArray(initialSort) ? initialSort[0] : initialSort;
            const sortField = sort?.split(':')[0] || 'publishedAt';
		const sortDirection = sort?.split(':')[1]?.toLowerCase() || 'desc';
		const limit = 6;
		const where = entry?.resourceType?.length ? { resourceType: entry.resourceType } : {};
		const nextEntries = await this.$content(collectionType)
			.sortBy(sortField, sortDirection)
			.where({
				...where,
				[sortField]: {
					[sortDirection === 'desc' ? '$lt' : '$gt']: entry[sortField]
				}
			})
			.limit(limit)
			.fetch();
		if (nextEntries.length < limit) {
			await this.$content(collectionType)
				.sortBy(sortField, sortDirection)
				.where(where)
				.limit(limit - nextEntries.length)
				.fetch()
				.then((res:EntryItem[]) => res?.forEach(entry => nextEntries.push(entry)));
		}
		commit('setNext', nextEntries);
	}
}