import { CollectionType, collectionTypes } from "~/models/entry.model"

export const state = () => ({
      link: `${process.env.apiUrl}/admin/content-manager`
})


export const mutations = {
      setAdminLink(state: any, params: { id: number | string | any, slug: string | CollectionType, entryType?: string | null, collectionType?: CollectionType | null }) {
            const { id = -1, slug, collectionType = null, entryType = null } = params;
            const entryId = ['string'].includes(typeof id) ? parseInt(id)
                  : !!id ? id
                        : -1;
            const strapiType: string = (collectionTypes.map(t => `${t}`).includes(slug)) && (!!!collectionType?.length || slug === collectionType)
                  ? `singleType/api::${slug}-collection.${slug}-collection`
                  : `collectionType/${entryType === null ? '' : `api::${entryType}.${entryType}`}`;
            state.link = `${process.env.apiUrl}/admin/content-manager/${strapiType}${!!entryId ? `/${entryId}` : ''}`
      }
}