<template>
  <div
    v-if="Array.isArray(blocks) && blocks.length > 0"
    class="blocks"
  >
  <div
    v-if="typeof content === 'string' && content.length"
        class="page-content entry-block col-span-12"
        :class="{
          'hidden': content && content.trim().length === 0
        }">
    <BlockContent :block="{ content: content }" />
  </div>
  <template
      v-for="(block, i) in pageBlocks"
    >
    
    <TabsWrapper 
      v-if="Array.isArray(block)"
      :key="block.id"
      class="col-span-12">
      <TabPanel 
        v-for="(collectionBlock) in block"
        :key="collectionBlock.id"
        :title="collectionBlock.title">
        <LazyBlock 
          v-if="![null, undefined].includes(collectionBlock)"
          :key="collectionBlock.id"
          :block="collectionBlock" />
      </TabPanel>
    </TabsWrapper>

    <Block
      v-else
      :key="block.__component + '-' + block.id"
      :block="block"
      :lazy="i >= 3"
    />
  </template>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    blocks: {
      type: Array,
      default: () => []
    },
    content: {
      type: String,
      default: null
    }
  },
  computed: {
    pageBlocks () {
      return this.blocks.reduce((acc, block, i) => {
        if (block.__component === 'block.collection'
              && block.title
              && block.title.length) {
              if (Array.isArray(acc[i - 1])) {
                acc[i - 1].push(block);
                    return acc
              }
              if (acc[i - 1]?.__component === 'block.collection' && acc[i - 1]?.title?.length) {
                    const previous = acc.pop();
                    return [...acc, [previous, block]]
              }
        }
        return [...acc, block]
      }, []);
    }
  }
})
</script>