import { Plugin } from '@nuxt/types'
import { initializeGraphQl } from '~/utils/graphql/init'

const accessor: Plugin = ({ $graphql }) => {
  initializeGraphQl($graphql)
}

export default accessor
