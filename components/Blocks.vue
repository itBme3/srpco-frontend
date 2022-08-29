<template>
  <div v-if="show" class="blocks">
  <slot />
  
  <template
      v-for="(block, i) in pageBlocks"
    >
    
    <TabsWrapper 
      v-if="Array.isArray(block)"
      ref="collectionTabs"
      :key="block.id"
      class="col-span-12">
      <TabPanel 
        v-for="(collectionBlock) in block"
        :key="collectionBlock.id"
        :title="collectionBlock.title"
        :hash="collectionBlock.hash">
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
  <slot name="after" />
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    blocks: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    show () {
      return this.blocks?.length || this.$slots?.default?.length
    },
    pageBlocks () {
      return [...this.blocks].reduce((acc, block, i) => {
        if (block.__component === 'block.collection') {
            const _block = { ...block, title: block?.title?.length ? block.title : block.collectionType }
            if (Array.isArray(acc[i - 1])) {
              acc[i - 1].push(_block);
                  return acc
            }
            if (acc[i - 1]?.__component === 'block.collection' && acc[i - 1]?.title?.length) {
                  const previous = acc.pop();
                  return [...acc, [previous, _block]]
            }
        }
        return [...acc, block]
      }, []);
    }
  }
})
</script>