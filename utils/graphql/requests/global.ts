import { footerQuery, navigationQuery, globalQuery } from '../queries/global'
import { $graph } from '~/utils/graphql/init'

export const getNavigation = async () => {
  return await $graph.request(navigationQuery)
}

export const getFooter = async () => {
  return await $graph.request(footerQuery)
}

export const getGlobalInfo = async () => {
  return await $graph.request(globalQuery)
}
