<template>
  <div class="page locations flex flex-col justify-start items-stretch py-20 sm:py-24 gap-12 sm:gap-20 text-center">
    <h1 class="w-full px-4">We'd love to hear from you!</h1>
    <div class="location-list grid grid-cols-2 sm:grid-cols-2">
      <div
        v-for="location in locations"
        :key="location.title"
        class="col-span-1 p-4 min-h-64 flex flex-col justify-around"
      >
        <h3 class="mt-auto">{{ location.title }}</h3>
        <a class="mb-auto" href="#" target="_blank">
          <address>{{ location.address }}</address>
        </a>
      </div>
    </div>
    <Link
        :is-button="true"
        to="/contact"
        class="bg-yellow-400 text-yellow-900 hover:bg-green-400 hover:text-green-900 w-auto mx-auto text-lg md:text-xl">
      Contact the Help Team
    </Link>
    <div class="maps grid gap-4 grid-cols-12 w-full h-auto">
      <div
        v-for="location in locations"
        :key="location.title"
        class="location col-span-12 md:col-span-6"
      >
        <iframe
          class="w-full h-[65vw] sm:h-[33vw]"
          :src="location.src"
          allowfullscreen
          frameborder="0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Link from '~/components/Link.vue'
const locations = [
  {
    title: 'STANDARD RUBBER PRODUCTS CO. (SRP)',
    address: '120 Seegers Avenue Elk Grove Village, IL 60007',
    phone: '(847) 593-5630',
    fax: '(847) 593-5634',
    email: 'info@srpco.com',
    lat: 42.0245861,
    lng: -87.9685225,
    src: `https://maps.googleapis.com/maps/embed/v1/place?key=${process.env.mapsApiKey}&center=42.0245861,-87.9685225&q=SRP&zoom=11`
  },
  {
    title: 'SRP ZHUHAI COMPANY LIMITED',
    address: 'Hanzhong Industrial Park, South Hubin Road Sanzao Town, Zhuhai, Guangdong, China, 519041',
    phone: '86-756-751-6898',
    fax: '86-756-751-6896',
    email: 'ivyy@srpco.com.cn',
    lat: 22.3643969,
    lng: 113.536515,
    src: `https://maps.googleapis.com/maps/embed/v1/place?key=${process.env.mapsApiKey}&center=22.3643969,113.536515&q=Zhuhai,+Guangdong+Province,+China&zoom=11`
  }
]
export default Vue.extend({
    components: { Link },
    scrollToTop: true,
    props: {
        mapConfig: {
            type: Object,
            default() { return {}; }
        }
    },
    data() {
        return {
            google: null,
            map: null,
            locationConfigs: locations.map(this.configFromLocation),
            locations,
            page: null
        };
    },
    methods: {
        initializeMap() {
            const mapContainer = this.$refs.googleMap;
            this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
            this.locations.push({
                title: "SRP ZHUHAI COMPANY LIMITED",
                address: "Hanzhong Industrial Park, South Hubin Road Sanzao Town, Zhuhai, Guangdong, China, 519041",
                phone: "86-756-751-6898",
                fax: "86-756-751-6896",
                email: "ivyy@srpco.com.cn",
                lat: 22.3643969,
                lng: 113.536515
            });
        },
        configFromLocation(location) {
            return {
                backgroundColor: "#ed1b24",
                center: { lat: location.lat, lng: location.lng }
            };
        }
    }
})
</script>

<style scoped>
  .location-list > div:nth-child(2n + 1) {
    @apply border-2 border-l-0 border-b-0 border-t-0 border-gray-400;
  }
</style>
