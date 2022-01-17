
<template>
  <footer class="footer">
    <template v-if="footer !== null && Array.isArray(footer.blocks)">
      <div
        v-for="block in footer.blocks"
        :key="'block-' + block.id"
        class="entry-block"
        :class="{ ['' + block !== null && block.blockSettings !== null ? block.blockSettings.blockClasses : '' + '']: block.blockSettings !== null && typeof block.blockSettings.blockClasses === 'string' && block.blockSettings.blockClasses.length > 0 }"
      >
        <Link
          v-if="typeof block.title === 'string' && block.title.length > 0"
          :link="block.titleLink"
        >
        <h3>{{ block.title }}</h3>
        </Link>
        <div class="block-content">
          <template v-if="Array.isArray(block.images) && block.images.length > 0">
            <div class="block-images">
              <Link
                v-for="media in block.images"
                :key="'media-' + media.id"
                :link="media.link"
                :open-new-tab="!!media.openNewTab"
              >
              <Media
                :media="media.image"
                :class="{ ['' + media.imageClasses +'']: ![null, undefined].includes(media.imageClasses) && media.imageClasses.length > 0 }"
              />
              </Link>
            </div>
          </template>
          <template v-if="typeof block.content === 'string' && block.content.length > 0">
            <Wysiwyg :content="block.content" />
          </template>
          <template v-if="Array.isArray(block.links) && block.links.length > 0">
            <div class="block-links flex flex-col content-start items-start space-y-2">
              <Link
                v-for="link in block.links"
                :key="'link-' + link.id"
                :link="link.link"
                :open-new-tab="!!link.openNewTab"
              >
              <gButton
                v-if="typeof link.link === 'string' && link.link.length > 0"
                variant="link"
                class="w-full block mx-0"
              >
                {{ link.text }}
              </gButton>
              <span v-else>{{ link.text }}</span>
              </Link>
            </div>
          </template>
        </div>
      </div>
    </template>
  </footer>
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

<style lang="scss">
footer {
  @apply grid grid-cols-12 mt-32 gap-6 bg-gray-800 p-4 relative z-[100];
  .entry-block {
    @apply col-span-full xs:col-span-6 sm:col-span-4 md:col-span-3;
  }
  .block-images {
    @apply grid grid-cols-12 gap-3;
    > * {
      @apply col-span-4 my-auto flex items-center;
    }
  }
  .block-links {
    @apply text-sm;
    .button {
      @apply border-b-gray-700;
    }
  }
}
</style>
