import { homepageQuery } from '../queries/pages'
import { $graph } from '~/utils/graphql/init'
import { parseResponse } from '../responses'

export const getHomepage = () => {
      return $graph.request(homepageQuery).then(res => {
            const _res = parseResponse(res.homepage);
            console.log(_res);
            console.log(_res.blocks);
            return _res;
      }).catch(err => console.error(err))
}