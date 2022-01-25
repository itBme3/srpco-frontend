import { footerQuery, navigationQuery, globalQuery } from '../queries/global'
import { $graph } from '~/utils/graphql/init'
import { parseResponse } from '../responses'

export const getNavigation = async () => {
  return await $graph.request(navigationQuery).then(res => parseResponse(res.navigation))
}

export const getFooter = async () => {
  return await $graph.request(footerQuery).then(res => parseResponse(res.footer))
}

export const getGlobalInfo = async () => {
  return await $graph.request(globalQuery).then(res => parseResponse(res.global))
}
