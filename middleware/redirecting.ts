
export default async function ({ route, redirect, app: { store: { dispatch }, nuxt } }: any) {
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
      // const shouldRedirect = await dispatch('checkShouldRedirect', { route });
      // console.log({ shouldRedirect })
      // if (!shouldRedirect) { return }
      // if (shouldRedirect === '404') { return nuxt.error({ statusCode: 404, message: 'Page Not Found' }) }
      // return redirect(301, `${shouldRedirect.indexOf('/') === 0 ? '' : '/'}${shouldRedirect}`);
}