<template>
  <div
    v-if="!!supplier"
    class="card supplier-card relative cursor-pointer block rounded-lg"
    :class="{
      ['card-style-' + cardStyle]: true,
      'expanded p-1': !!expanded,
      'no-media': [undefined, null].includes(media),
      ['bg-gray-200']: cardStyle !== 'standard' && expanded,
      ['bg-transparent']: cardStyle !== 'standard' && !expanded,
      ['transform scale-100 hover:scale-[.98]']: cardStyle === 'standard'
    }"
    @click="cardClicked($event)"
    @tap="cardClicked($event)"
  >
    <div
      class="card-inner flex items-center justify-start p-2"
      :class="{
        ['rounded-full']: cardStyle !== 'standard',
        ['bg-gray-300 bg-opacity-5 hover:bg-gray-900']: cardStyle === 'standard'
      }"
    >
      <Media
        v-if="!!media && !!media.url"
        :media="media"
        ratio="5:4"
        :overlay="false"
        :class="{
          [mediaClasses]: mediaClasses.length > 0,
          ['rounded-full']: cardStyle !== 'standard' && !mediaClasses.includes('rounded'),
          'rounded-lg': cardStyle === 'standard' && !mediaClasses.includes('rounded')
        }"
        :is-background="true"
        class="card-media"
      />
      <div
        v-if="(title && title.length > 0) || (description && description.length > 0)"
        class="card-content"
      >
        <gTag
          v-if="title && title.length > 0"
          :tag-name="cardStyle === 'standard' ? 'h2' : 'h5'"
          :class="{
            [titleClasses]: titleClasses.length > 0,
            'text-gray-200': cardStyle === 'standard'
          }"
          class="card-title"
        >{{ title }}</gTag>
        <p
          v-if="cardStyle === 'standard'"
          class="description text-gray-400 mt-3"
        >{{ description }}</p>
      </div>
    </div>
    <i
      v-if="cardStyle === 'small'"
      class="gicon-close absolute top-1 right-2 transition-sll ease-in-out duration-300 hover:opacity-100 opacity-50"
      :class="{
        'opacity-0 scale-0': !expanded,
        'opacity-50 scale-100': expanded,
      }"
    ></i>
    <div
      class="card-info transition-all ease-in duration-200"
      :class="{
        'expanded-info': cardStyle !== 'standard',
        'opacity-0 max-h-[0px]': !expanded,
        'opacity-100 max-h-full py-2 rounded-lg m-2': expanded
      }"
    >
      <a :href="'/suppliers/' + slug">
        <small
          v-if="!!supplier.totalConverters"
          class="relative -top-2 mr-0 ml-auto font-bold"
          style="line-height: 1 !important"
          :class="{
            ['text-' + colors.primary.split('-')[0] + '-600']: true
          }"
        >
          1 of only {{ supplier.totalConverters }} {{ title }} preferred converters
        </small>
        <p class="description">{{ description }}</p>
      </a>
      <div class="buttons flex items-center justify-start mt-3">
        <a :href="'/suppliers/' + slug">
          <button
            class="rounded transform mr-2 scale-100 hover:scale-105 shadow-sm hover:shadow-lg"
            :class="{ 
              ['bg-' + colors.primary]: true,
              ['text-' + colors.primary.split('-')[0] + '-900']: true,
            }"
          >Learn More</button>
        </a>
        <a :href="'/suppliers/' + slug + '#gaskets'">
          <button class="rounded transform scale-100 hover:scale-105 shadow-sm hover:shadow-lg bg-gray-100 hover:bg-white text-gray-700">
            Gaskets
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    supplier: {
      type: Object,
      default: () => {
        return {
          media: null,
          title: null,
          description: null,
          color: null
        }
      }
    },
    classes: {
      type: Object,
      default: () => {
        return {
          media: '',
          title: '',
          content: '',
        }
      }
    },
    cardStyle: {
      type: 'small' | 'standard',
      default: 'standard'
    }
  },
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    media () {
      return !!this?.supplier?.media ? this.supplier.media : null
    },
    title () {
      return !!this?.supplier?.title ? this.supplier.title : null
    },
    description () {
      return !!this?.supplier?.description ? this.supplier.description : null
    },
    slug () {
      return !!this?.supplier?.slug ? this.supplier.slug : null
    },
    colors () {
      const color = !!this?.supplier?.color ? this.supplier.color.replace('_', '-') : 'gray-100'
      const primary = !color.includes('-') ? `${color}-500` : color;
      if (!primary.includes('-')) primary = `${primary}-500`;
      const primaryShade = parseInt(primary.split('-')[1])
      const colorName = primary.split('-')[0]
      const secondary = `${colorName}-${primaryShade === 50 ? 100 : primaryShade < 800 ? primaryShade + 100 : primaryShade - 100}`
      return { primary, secondary }
    },
    titleClasses () {
      return !!this.classes?.title ? this.classes.title : 'text-gray-900 text-opacity-70'
    },
    mediaClasses () {
      return !!this.classes?.media ? this.classes.media : ''
    },
    contentClasses () {
      return !!this.classes?.content ? this.classes.content : ''
    },
  },
  methods: {
    cardClicked (e) {
      if (this.cardStyle === 'standard') {
        return this.$router.push({
          path: `/suppliers/${this.slug}`
        })
      }
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="scss">
.card.supplier-card {
  @apply mb-2 transform shadow-lg;
  .media {
    @apply h-auto w-28;
  }
  &.card-style-standard {
    @apply p-4 hover:bg-opacity-025;
    .card-inner {
      @apply bg-transparent #{!important};
    }
    .media {
      @apply mr-6;
    }
    .description {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  &.card-style-small {
    @apply max-w-[300px] ml-0 mr-auto shadow-sm;
    .card-inner {
      @apply bg-gray-200;
    }
    .media {
      @apply shadow-xl w-12 h-12 min-w-12 min-h-12 mr-3;
    }
  }
  &.expanded {
    @apply text-gray-900;
    @apply rounded-lg #{!important};
    .description {
      padding: 0 0.5rem 0.25em;
    }
  }
}
</style>