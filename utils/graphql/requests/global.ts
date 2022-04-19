import { footerQuery, navigationQuery, siteSearchQuery } from '../queries/global'
import { $graph } from '~/utils/graphql/init'
import { parseResponse } from '../responses'

export const getNavigation = async () => {
  return await $graph.request(navigationQuery).then(res => {
    console.log(res)
    return parseResponse(res.navigation)
  })
}

export const getFooter = async () => {
  return await $graph.request(footerQuery).then(res => parseResponse(res.footer))
}

export const getSiteSearch = async () => {
  return await $graph.request(siteSearchQuery).then(res => parseResponse(res.siteSearch))
}

