<template>
  <footer class="footer">

    <div class="footer-preferred-converter-carousel">
      <h3 class="block-title text-gray-600 leading-relaxed px-6">
        Converter For The Industry's Leading Suppliers
      </h3>
      <Carousel
        v-if="preferredConverter.length"
        class="w-full max-w-[52rem] mx-auto"
        :options="{
          autoPlay: true,
          initialIndex: preferredConverter.length / 2,
          groupCells: '60%',
          selectedAttraction: 0.02,
          friction: 0.20
        }"
      >
        <span
          v-for="entry in preferredConverter"
          :key="entry.slug"
          class="slide group"
        >
          <Media
            :media="entry.media"
            :is-background="true"
            class="rounded-full"
          /> <small class="truncate text-ellipsis">{{ entry.title }}</small>
        </span>
      </Carousel>
    </div>

    <SiteFooterForm class="mb-32" />

    <ul class="footer-links w-full">
      <li v-for="link in links" :key="link.to">
        <Link :to="link.to" :is-button="true">
          {{link.label}}
        </Link>
      </li>
    </ul>

    <div class="footer-blocks">

      <div class="left">
        <Logo class="h-[38px] top-0 w-auto mb-6 mr-auto" />
        <address>120 Seegers Avenue,<br>Elk Grove Village,<br>IL 60007</address>
      </div>

      <div class="right col-span-1">
         <ul class="social-links">
          <li v-for="socialLink in socialLinks" :key="socialLink.to">
            <Link 
              :to="socialLink.to"
              :open-new-tab="true"
              :is-button="true">
              <Icon :icon-name="socialLink.label" /> {{socialLink.label}}
            </Link>
          </li>
        </ul>
      </div>

      <div class="bottom col-span-full">
        <p class="copyright">
          Copyright © {{year}} Standard Rubber Products  Co.  All rights reserved.
        </p>
        <p class="text-center">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="mailto:info@srpco.com">info@srpco.com</Link>
          <a href="tel:+18475935630">(847) 593-5630</a>
        </p>
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
      siteMapBlocks: [],
      links: [
        {label: "Custom Gaskets", to: "/gaskets"},
        {label: "Our Capabilities", to: "/services"},
        {label: "Why SRP?", to: "/about-us"},
        {label: "Resources", to: "/resources"},
        {label: "Contact Us", to: "/contact"}
      ],
      socialLinks: [
        {label: "Facebook", to: "https://www.facebook.com/standardrubberproducts/"},
        {label: "Twitter", to: "https://twitter.com/SRP_CO"},
        {label: "YouTube", to: "https://www.youtube.com/channel/UCu_bAN6SQdiSWVR5TGJ1ELQ/videos"},
      ]
    }
  },
  fetch () {
    return this.$content('suppliers')
      .only(['slug', 'title', 'media', 'totalConverters'])
      .fetch().then(entries => {
        this.preferredConverter = entries
        return entries
      });
  },
  computed: {
    year () {
      return (new Date()).getFullYear();
    }
  }
})
</script>

<style lang="scss">
.footer {
  @apply flex flex-wrap mt-16;
  .footer-preferred-converter-carousel {
    @apply w-full text-center py-24 px-0 mb-8;
    .block-title {
      @apply italic max-w-2xl leading-10 m-auto mb-8 font-black font-display tracking-widest block mx-auto;
    }
    .carousel-wrapper {
      @apply px-0;
    }
    .slide {
      @apply p-0 h-auto py-12 w-28 flex flex-col text-center items-center content-start;

      .media {
        @apply w-16 bg-white border-[.3rem] border-gray-300 m-auto mb-2 transform scale-100 transition-all ease-in-out duration-150;
        @apply h-16 #{!important};
        @apply group-hover:border-white group-hover:scale-103;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.3),
          0 -1px 10px rgba(255, 255, 255, 0.1);
      }
      small {
        @apply group-hover:text-gray-200 text-gray-600 font-normal inline-block max-w-full whitespace-nowrap overflow-hidden truncate text-ellipsis;
        font-size: 0.7rem;
      }
    }
    .next-previous-button {
      @apply px-6;
      background: var(--site-bg);
      i {
        @apply rounded-full bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white p-2 shadow-lg;
        &:before {
          @apply top-0;
        }
      }
      &.previous {
        box-shadow: 20px 0 20px var(--site-bg);
      }
      &.next {
        box-shadow: -20px 0 20px var(--site-bg);
        &:before {
          @apply left-[.075rem];
        }
      }
    }
  }
  .footer-links {
    @apply flex flex-wrap content-center items-start list-none py-2 bg-gray-900 px-0 m-auto;
    li {
      @apply p-0 m-auto;
      &:not(:last-child) {
        @apply border border-gray-800 border-l-0 border-r-0 border-b-0 border-t-0;
      }
    }
    button {
      @apply text-gray-200 hover:bg-gray-800 w-full py-4 px-3 rounded shadow-sm hover:shadow;
    }
  }
  .footer-blocks {
    @apply bg-gray-800 w-full grid grid-cols-1 sm:grid-cols-2 p-6 gap-6 sm:p-10 sm:gap-10 md:p-14 md:gap-14;
    .top, .bottom {
      @apply col-span-full content-center items-center m-auto;
    }
    .left, .right {
      @apply col-span-1;
    }
    .right {
      @apply sm:ml-auto w-auto;
    }
    .social-links {
      @apply list-none;
      .icon {
        @apply mr-2;
      }
    }
  }
}
</style>
