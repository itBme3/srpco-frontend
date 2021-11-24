<template>
  <div class="page locations">
    <PageHeading
      title="Our Locations"
    />
    <div class="maps grid gap-4 grid-cols-12 w-full h-auto">
      <div
        class="col-span-12 md:col-span-6"
        v-for="location in locations"
        :key="location.title"
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

<script lang="js">
const apiKey = 'AIzaSyAKlNQvaXSHG-CQietQjo0RRtvVNJie30U'
const locations = [
  {
    title: 'STANDARD RUBBER PRODUCTS CO. (SRP)',
    address: '120 Seegers Avenue Elk Grove Village, IL 60007',
    phone: '(847) 593-5630',
    fax: '(847) 593-5634',
    email: 'info@srpco.com',
    lat: 42.0245861,
    lng: -87.9685225,
    src: `https://www.google.com/maps/embed/v1/place?key=${apiKey}&center=42.0245861,-87.9685225&q=SRP&zoom=11`
  },
  {
    title: 'SRP ZHUHAI COMPANY LIMITED',
    address: 'Hanzhong Industrial Park, South Hubin Road Sanzao Town, Zhuhai, Guangdong, China, 519041',
    phone: '86-756-751-6898',
    fax: '86-756-751-6896',
    email: 'ivyy@srpco.com.cn',
    lat: 22.3643969,
    lng: 113.536515,
    src: `https://www.google.com/maps/embed/v1/place?key=${apiKey}&center=22.3643969,113.536515&q=Zhuhai,+Guangdong+Province,+China&zoom=11`
  }
]
export default {
  props: {
    mapConfig: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      apiKey,
      google: null,
      map: null,
      locationConfigs: locations.map(this.configFromLocation),
      locations
    }
  },

  methods: {
    initializeMap () {
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(
        mapContainer, this.mapConfig
      )
      this.locations.push({
        title: 'SRP ZHUHAI COMPANY LIMITED',
        address: 'Hanzhong Industrial Park, South Hubin Road Sanzao Town, Zhuhai, Guangdong, China, 519041',
        phone: '86-756-751-6898',
        fax: '86-756-751-6896',
        email: 'ivyy@srpco.com.cn',
        lat: 22.3643969,
        lng: 113.536515
      })
    },
    configFromLocation (location) {
      return {
        backgroundColor: '#ed1b24',
        center: { lat: location.lat, lng: location.lng }
      }
    }
  }
}
</script>
