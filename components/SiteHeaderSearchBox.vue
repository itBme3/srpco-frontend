<template>
  <div
    class="flex flex-wrap space-y-2 sm:space-x-2 gap-2"
    :class="{
        'expanded opacity-100 translate-y-0 top-12 mt-[2px] animate-fade-in-down': isExpanded,
        'opacity-0 -translate-y-full -top-40': !isExpanded
      }"
  >

    <div class="grid grid-cols-12">

      <div class="col-span-12 sm:col-span-7 sm:pr-6 rounded-md">
        <div class="custom-gaskets section col-span-6 border-gray-900 rounded-md border-2 border-opacity-25 p-6 flex flex-wrap mt-4">
          <h3 class="section-title w-full mb-4">Custom Gaskets</h3>
          <gButton
            class="bg-opacity-50 w-[calc(33.33%-.25rem)] mr-1"
            @click="$router.push('/applications')"
          >
            By Application
          </gButton>
          <gButton
            class="bg-opacity-50 w-[calc(33.33%-.25rem)] mr-1"
            @click="$router.push('/materials')"
          >
            By Material
          </gButton>
          <gButton
            class="bg-opacity-50 w-[calc(33.33%-.25rem)]"
            @click="$router.push('/gaskets')"
          >
            All Gaskets
          </gButton>
        </div>
        <div class="resources section col-span-6 flex flex-wrap px-0 mt-4">
          <template v-for="(link, i) in ['Solutions', 'Services', 'Datasheets', 'Resources']">
            <gButton
              :key="link"
              :class="{
                'border border-gray-700 hover:bg-gray-700 w-[calc(50%-.25rem)] mb-2': true,
                'mr-2': [0, 2].includes(i),
              }"
              @click="$router.push('/' + link.toLowerCase())"
            >
              {{ link }}
            </gButton>
          </template>
        </div>

      </div>

      <div class="col-span-12 sm:col-span-5">

        <div class="contact section col-span-8 flex space-x-6 border-l-0 border-r-0 border-gray-700 py-6">
          <nuxt-link
            to="/locations"
            class="flex items-center justify-start whitespace-nowrap text-xl"
          >
            <Icon
              icon-name="location"
              class="mr-2 bg-transparent text-green-500"
            /> <span>Locations</span>
          </nuxt-link>
          <a
            href="tel:+18003336322"
            class="flex items-center justify-start whitespace-nowrap text-xl"
          >
            <Icon
              icon-name="call"
              class="mr-2 text-red-400"
            /> <span>Call Us</span>
          </a>
        </div>

        <div class="p-6 bg-gray-700 bg-opacity-50 rounded-md flex flex-wrap gap-2">
          <h3 class="text-gray-400 w-full mb-5">SRP is a Preferred Converter</h3>
          <gButton
            class="bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-full text-sm shadow-lg w-auto"
            @click="$router.push('/suppliers/3m')"
          >
            3M Preferred Converter
          </gButton>
          <gButton
            class="bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-full text-sm shadow-lg w-auto mr-auto"
            @click="$router.push('/suppliers/rogers-corporation')"
          >
            Rogers Preferred Converter
          </gButton>
        </div>
      </div>

      <div class="col-span-12 flex items-center content-start py-8 sm:py-12 mt-6 sm:pr-16 px-4 border border-gray-900 border-l-0 border-r-0 border-b-0">
        <div class="w-3/4 text-center">
          <h1 class="text-center">Free Consultation</h1>
          <h5 class="text-blue-500 text-center">TYPICAL RESPONSE WITHIN 48 BUSINESS HOURS</h5>
        </div>
        <gButton
          class="bg-blue-500 text-blue-900 mt-5 shadow-lg mr-auto w-1/4 text-xl uppercase font-bold"
          @click="$router.push('/contact')"
        >
          Schedule<br> Consultation
        </gButton>
      </div>

    </div>

    <!-- CLOSE -->
    <gButton
      classes="rounded-md px-3 py-2 bg-transparent hover:bg-gray-200 hover:bg-opacity-5 absolute right-1 -top-1 w-12"
      @click="isExpanded = false; $emit('close')"
    >
      <Icon icon-name="close" class="fill-red-400" />
    </gButton>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    expanded: {
      type: Boolean,
      default: false
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
              link: c === 'All' ? '/gaskets' : '/' + c.toLowerCase() + 's',
              text: c === 'All' ? c : `By ${c}`,
              classes: 'bg-gray-400 bg-opacity-10 hover:bg-opacity-5 mr-2 mt-2'
            }
          })
        }
      ]
    }
  },
  watch: {
    expanded (expanded) {
      this.isExpanded = expanded
    }
  }
})
</script>
<style lang="scss" scoped>
.section {
  @apply p-2;
}
.section-title {
  @apply text-gray-600;
}

button {
  @apply bg-gray-700 text-gray-300 mb-1;
}

.nuxt-link-exact-active {
  @apply cursor-default;
  button {
    @apply cursor-default bg-opacity-2 bg-white hover:scale-100 hover:bg-opacity-2 #{!important};
  }
}
</style>