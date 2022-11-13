<template>
  <div
    v-if="![null, undefined].includes(page)"
    class="single-entry service mb-10"
  >
    <Heading
      v-if="$route.path.split('/').length > 2"
      :title="page.title"
      heading-type="page"
      :class="{
        [pageClasses.heading]: !!pageClasses && !!pageClasses.heading && !!pageClasses.heading.length
      }"
    >
      <template #breadcrumbs>
        <Breadcrumbs 
          :links="[
            {href:'/services' , label: 'services'},
            {label: page.slug}
          ]" 
        />
      </template>
    </Heading>

    <MediaYoutube
      v-if="![null, undefined].includes(page) && typeof page.youtube === 'string' && page.youtube !== null"
      :src="page.youtube"
      :autoplay="true"
      :loop="true"
      :mute="true"
    />
		
    <div
      v-if="![null, undefined].includes(page) && typeof page.content === 'string' && page.content.length"
      class="page-content"
      v-html="$md.render(page.content)"
    />

    <h2 class="mt-8 sm:mt-12 md:mt-14">Services:</h2>
    <BlockCollection 
      collection-type="services"
      sort="publishedAt:DESC"
      card-style="mediaLeft"
      loading-more="infiniteScroll"
      :limit="6"
      :update-url="false"
      :description="false"
      :show-excerpt="true"
      class="w-full"
      :classes="{ card: 'col-span-full' }"
      :filters="{
        slug: {
          $ne: page.slug
        }
      }"
    />

  </div>
</template>

<script>
import Vue from 'vue'
import { getPageClasses } from '~/utils/get-classes'

export default Vue.extend({
    props: {
        pageData: {
            type: Object,
            default: () => null
        }
    },
  data () {
    return {
      page: null
    }
  },
    computed: {
        pageClasses() {
            return getPageClasses(this.page);
        }
  },
  watch: {
    pageData (val) {
      this.page = val
    }
  },
  mounted () {
    this.page = this.pageData
    this.$store
      .dispatch('page/getUpdates', {
        slug: this.pageData.slug,
        path: "services"
      })
      .then((res) => {
        this.page = {
          ...this.page,
          ...(res || {})
        }
      })   
  }
})
</script>

<style lang="scss">
.single-entry.service {
  @apply max-w-4xl mx-auto;
}
.collection {
  &.services {
    .single-entry {
      + .heading {
        max-width: 780px !important;
        margin-right: auto;
        margin-left: auto;
        + .blocks {
          max-width: 780px !important;
          margin-right: auto;
          margin-left: auto;
        }
      }
    }
  }
}
</style>