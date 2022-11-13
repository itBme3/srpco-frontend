import { pathWhitelist } from '~/static/axiosDefaults';

export default async function ({ route, redirect, store: { dispatch }, error }: any) {
      if (pathWhitelist.includes(route.path)) {
            return;
      }
      const old = {
            resources: ['posts', 'news']
      };
      if (old.resources.includes(route?.params?.slug)) {
            redirect(301, { path: '/resources' })
            return
      }
      if (old.resources.includes(route?.params?.collection)) {
            redirect(301, { path: `/resources/${route.params.slug}` })
            return
      }
      if (['materials', 'applications'].includes(route?.params?.slug)) {
            redirect(301, { path: `/gaskets/#${route.params.slug}` })
            return
      }
      
      try {
            const redirectPath = await dispatch('page/getEntry', { only: ['slug', 'collectionType', 'type'], route });
            if (typeof redirectPath !== 'string') { return }
            if (redirectPath === '404') {
                  return error({ statusCode: 404, message: 'Page Not Found' })
            }
            return redirect(301, { path: `${redirectPath.indexOf('/') === 0 ? '' : '/'}${redirectPath}` });
      } catch (err) {
            return error({ statusCode: 404, message: 'Page Not Found' })
      }
}