<template>
  <div class="page locations flex flex-col justify-start items-stretch py-12 sm:py-16 gap-12 text-center px-4 w-[calc(100%-1rem)]">
    <h1 class="w-full px-4">We'd love to hear from you!</h1>
    <div class="location-list grid grid-cols-2 sm:grid-cols-2 gap-2">
      <div
        v-for="location in locations"
        :key="location.title"
        class="col-span-1 p-6 bg-gray-900 min-h-64 flex flex-col gap-2 justify-around rounded-md"
      >
        <h3 class="mt-auto">{{ location.title }}</h3>
        <div class="flex flex-col gap-4 py-6">
          <h5 class="opacity-60">{{ location.description }}</h5>
          <a class="text-blue border border-t-0 border-l-0 border-r-0 w-auto mx-auto border-gray-800 pb-px" :href="`tel:+${location.phone}`">{{location.phone}}</a>
          <a class="text-blue border border-t-0 border-l-0 border-r-0 w-auto mx-auto border-gray-800 pb-px" :href="`mailto:+${location.email}`">{{location.email}}</a>
        </div>
        <address>{{ location.address }}</address>
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
    title: 'Standard Rubber Products Co. (SRP)',
    description: "U.S. Headquarters",
    address: '120 Seegers Avenue, Elk Grove Village, IL 60007',
    phone: '(847) 593-5630',
    fax: '(847) 593-5634',
    email: 'info@srpco.com',
    lat: 42.0245861,
    lng: -87.9685225,
    src: `https://maps.googleapis.com/maps/embed/v1/place?key=${process.env.mapsApiKey}&center=42.0245861,-87.9685225&q=SRP&zoom=11`
  },
  {
    title: 'SRP ZHUHAI COMPANY LIMITED',
    description: "China Headquarters",
    address: 'No. 252 Yuanquan Road, Sanzao Town, Jinwan District, Zhuhai, Guangdong, China 519041',
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

