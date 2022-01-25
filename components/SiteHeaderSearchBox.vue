<template>
  <div
    class="flex flex-wrap space-y-2 sm:space-x-2"
    :class="{
        'expanded opacity-100 translate-y-0 top-12 mt-[2px] animate-fade-in-down': isExpanded,
        'opacity-0 -translate-y-full -top-40': !isExpanded
      }"
  >
    <!-- SECTIONS -->
    <div
      class="site-search-section"
      v-for="(section, i) in sections"
      :key="'site-search-section-' + i"
      :class="{ ['' + ![undefined, null].includes(section.classes) ? section.classes.section : null + '']: ![undefined, null].includes(section.classes) && typeof section.classes.section === 'string' && section.classes.section.length > 0 }"
    >

      <h2
        class="section-title"
        :class="{ ['' + ![undefined, null].includes(section.classes) ? section.classes.title : null + '']: ![undefined, null].includes(section.classes) && typeof section.classes.title === 'string' && section.classes.title.length > 0 }"
      >{{section.title}}</h2>

      <div
        class="section-buttons flex items-center"
        :class="{ ['' + ![undefined, null].includes(section.classes) ? section.classes.buttons : null + '']: ![undefined, null].includes(section.classes) && typeof section.classes.buttons === 'string' && section.classes.buttons.length > 0 }"
        v-if="Array.isArray(section.buttons) && section.buttons.length > 0"
      >
        <Link
          v-for="(btn, ii) in section.buttons"
          :key="'site-search-section-' + i + '-button-' + ii"
          :link="btn.link"
        >
        <gButton
          class="whitespace-nowrap"
          :class="{ ['' + btn.classes + '']: typeof btn.classes === 'string' && btn.classes.length > 0 }"
        >
          {{ btn.text }}
        </gButton>
        </Link>
      </div>

    </div>

    <!-- CLOSE -->
    <gButton
      classes="rounded-md px-3 py-2 hover:bg-gray-200 hover:bg-opacity-5 absolute right-1 -top-1"
      @click="isExpanded = false; $emit('close')"
    >
      <i class="gicon-close text-red-400" />
    </gButton>
  </div>
</template>

<script>
export default {
  props: {
    expanded: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    expanded (expanded) {
      this.isExpanded = expanded
    }
  },
  data () {
    return {
      isExpanded: !!this.expanded,
      sections: [
        {
          title: 'Custom Gaskets',
          classes: {
            section: 'w-full sm:w-2/3'
          },
          buttons: ['Material', 'Application', 'All'].map(c => {
            return {
              link: c === 'All' ? '/gaskets' : `/${c.toLowerCase()}s`,
              text: c === 'All' ? c : `By ${c}`,
              classes: 'bg-gray-400 bg-opacity-10 hover:bg-opacity-5 mr-2 mt-2'
            }
          })
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.nuxt-link-exact-active {
  @apply cursor-default;
  button {
    @apply cursor-default bg-opacity-2 bg-white hover:scale-100 hover:bg-opacity-2 #{!important};
  }
}
</style>