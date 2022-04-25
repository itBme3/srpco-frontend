<template>
  <footer class="footer">
    <div class="footer-preferred-converter-carousel">
      <h3 class="block-title text-red-400">
        Your Preferred Converter For The Industry's Leading Suppliers
      </h3>
      <Carousel
        v-if="preferredConverter.length"
        class="w-full"
      >
        <nuxt-link
          v-for="entry in preferredConverter"
          :key="entry.slug"
          :to="'/suppliers/' + entry.slug"
          class="slide group"
        >
          <Media
            :media="entry.media"
            :is-background="true"
            class="rounded-full"
          /> <small class="truncate text-ellipsis">{{ entry.title }}</small>
        </nuxt-link>
      </Carousel>
    </div>
    <div class="footer-blocks">
      <div
        v-for="block in siteMapBlocks"
        :key="block.title"
        class="footer-block sitemap"
        :class="{ [block.classes]: !!block.classes }"
      >
        <h4 class="block-title">{{ block.title }}</h4>
        <ul>
          <li
            v-for="entry in block.entries"
            :key="entry.slug"
          >
            <nuxt-link :to="'/' + block.collectionType + '/' + entry.slug">{{ entry.title }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      preferredConverter: [],
      siteMapBlocks: []
    }
  },
  fetch () {
    const promises = [
      this.$content('suppliers')
        .only(['slug', 'title', 'media', 'totalConverters'])
        .fetch().then(entries => {
          this.preferredConverter = entries
          return entries
        }),
      ...[{
        title: 'Converting 3M',
        collectionType: 'gaskets',
        sort: 'order:asc',
        filters: {
          'suppliers.slug': { $contains: '3m' }
        },
        order: 0,
      },
      {
        title: 'Converting Rogers',
        collectionType: 'gaskets',
        sort: 'order:asc',
        filters: {
          'suppliers.slug': { $contains: 'rogers-corporation' }
        },
        order: 1,
      },
      {
        title: 'Gaskets By Material',
        collectionType: 'materials',
        sort: 'order:asc',
        order: 4
      },
      {
        title: 'Gaskets By Application',
        collectionType: 'applications',
        sort: 'order:asc',
        order: 5
      },
      {
        title: 'Suppliers',
        collectionType: 'suppliers',
        sort: 'order:asc',
        order: 2
      },
      {
        title: 'Services',
        collectionType: 'services',
        sort: 'order:asc',
        order: 3
      },
      {
        title: 'Solutions',
        collectionType: 'solutions',
        sort: 'publishedAt:desc',
        order: 6,
        limit: 4
      },
      {
        title: 'Resources',
        collectionType: 'resources',
        sort: 'publishedAt:desc',
        order: 7,
        limit: 6
      },
      ].map(item => this.$content(item.collectionType)
        .limit(item?.limit || 7)
        .only(['slug', 'title'])
        .sortBy(item?.sort || 'createdAt:desc')
        .where(item?.filters || {})
        .fetch().then(entries => {
          this.siteMapBlocks.push({
            ...item,
            entries
          })
        }))
    ]
    return Promise.all(promises).catch(console.error)
  }
})
</script>

<style lang="scss">
.footer {
  @apply flex flex-wrap mt-16;
  .footer-preferred-converter-carousel {
    @apply w-full text-center py-12 px-4 mb-8 bg-[rgba(5,11,20,.71)];
    .block-title {
      @apply italic max-w-2xl leading-10 m-auto mb-8 font-black font-display tracking-widest block mx-auto;
    }
    .carousel-wrapper {
      padding: 0 1rem;
    }
    .slide {
      @apply p-0 h-auto py-12 w-28 flex flex-col text-center items-center content-start;

      .media {
        @apply w-20 bg-white border-[.5rem] border-gray-300 m-auto mb-2 transform scale-100 transition-all ease-in-out duration-150;
        @apply h-20 #{!important};
        @apply group-hover:border-white group-hover:scale-103;
        box-shadow: 0 0 40px rgba(255, 255, 255, 0.3),
          0 -1px 10px rgba(255, 255, 255, 0.1);
      }
      small {
        @apply group-hover:text-gray-200 text-gray-600 font-normal inline-block max-w-full whitespace-nowrap overflow-hidden truncate text-ellipsis;
        font-size: 0.7rem;
      }
    }
    .next-previous-button {
      @apply shadow-gray-900/60 bg-[rgba(5,11,20,.71)] right-4 text-gray-300 hover:text-gray-50;
      &.previous {
        @apply left-4;
      }
    }
  }
  .footer-blocks {
    @apply w-full grid grid-cols-12 p-6 gap-6 sm:p-10 sm:gap-10 md:p-14 md:gap-14 content-end;
    .footer-block {
      @apply col-span-12 xs:col-span-6 sm:col-span-4 md:col-span-3;
      &.sitemap {
        .block-title {
          @apply text-base border-2 border-gray-700 border-t-0 border-x-0 pb-3 font-semibold text-gray-200 hover:text-white;
        }
        ul {
          @apply list-none pl-0;
          li {
            a {
              @apply leading-snug text-gray-400 hover:text-white py-2 block font-normal tracking-wider;
              font-size: 0.75rem;
            }
          }
        }
      }
    }
  }
}
</style>
