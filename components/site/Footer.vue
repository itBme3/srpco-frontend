
<template>
  <div>
    <pre :v-if="footer !== null"><code>{{ JSON.stringify(footer) }}</code></pre>
  </div>
</template>

<script lang="js">
import { $graph } from '~/utils/graphql/init'
import { footerQuery } from '~/utils/graphql/queries/global'

export default {
  data () {
    return {
      footer: null
    }
  },
  async fetch () {
    this.footer = await $graph.request(footerQuery).then(res => res.footer)
  }
}

</script>
