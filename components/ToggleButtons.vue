<template>
  <div>
    <scrollbar
      ref="scroll"
      class="toggle-buttons flex flex-nowrap max-w-full pb-2"
      :options="{ suppressScrollY: true, suppressScrollX: false }"
      @ps-scroll-x="(e) => scrollHandler(e, 'scroll-x')"
      @ps-scroll-y="(e) => scrollHandler(e, 'scroll-y')"
      @ps-scroll-up="(e) => scrollHandler(e, 'scroll-up')"
      @ps-scroll-down="(e) => scrollHandler(e, 'scroll-down')"
    >
      <gButton
        v-for="item in buttons"
        :key="item.value"
        :class="item.class"
        classes="pl-3 pr-2 py-1 rounded w-auto"
        @click="toggleValue(item.value)"
      >
        {{ item.value }} 
        <Icon 
          :icon-name="Array.isArray(activeValues) && activeValues.includes(item.value) ? 'close' : 'add'"
          class="my-auto mr-0 ml-2 relative -top-px text-xs" 
          style="color: inherit"
        />
      </gButton>
    </scrollbar>

  </div>
</template>

<script>
import Vue from 'vue'
const defaultColor = 'cyan';
export default Vue.extend({
  props: {
    items: {
      type: Array,
      default: () => []
    },
    active: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: defaultColor
    }
  },
  data () {
    return {
      colors: ['gray', 'cyan', 'blue', 'orange', 'red', 'yellow', 'green', 'purple'],
      activeValues: Array.isArray(this.active) && this.active.length > 0
        ? this.active
          .map(item => ['string', 'number'].includes(typeof item) ? item : item.value ? item.value : null)
          .filter(item => !!item)
        : []
    }
  },
  computed: {
    defaultColor () {
      return this.colors.includes(this.color) ? this.color : defaultColor
    },
    buttons () {
      if (!Array.isArray(this.items)) {
        return [];
      }
      return this.items.map((item, indx) => {
        const { value = item, label = item } = item;
        const color = this.color === 'rainbow' ? this.getColor(indx) : typeof item.color === 'string' ? item.color : this.color;
        const defaultClasses = {
          active: `active bg-${color}-400 text-${color}-900 hover:bg-opacity-80`,
          inactive: `bg-gray-700 text-gray-200 bg-opacity-20 hover:text-${color}-900 hover:bg-${color}-400 hover:bg-opacity-100`,
          _default: `ml-2`
        };
        const itemClasses = ![undefined, null].includes(item.classes) ? item.classes : defaultClasses
        const {
          active = defaultClasses.active,
          inactive = defaultClasses.inactive,
          _default = defaultClasses._default
        } = itemClasses;
        ['active', 'inactive'].forEach(key => delete itemClasses[key]);
        return {
          value, color,
          label: typeof label !== 'string' ? value : label,
          class: {
            [_default]: typeof _default === 'string' && _default.length > 0,
            ...itemClasses,
            [`${active.split(' ').includes('active') ? active : `active ${active}`}`]: Array.isArray(this.activeValues) && this.activeValues.includes(item.value),
            [inactive]: Array.isArray(this.activeValues) && !this.activeValues.includes(item.value)
          }
        }
      });
    }
  },
  methods: {
    toggleValue (val) {
      if (this.activeValues.includes(val)) {
        this.activeValues = this.activeValues.filter(item => (!!item?.value && item.value === val) || (item !== val))
      } else {
        this.activeValues.push(val)
      }
      this.$emit('update', this.activeValues)
    },
    getColor (indx) {
      const colors = this.colors.filter(c => c !== 'gray');
      return colors[indx]
    },
    scrollHandler (e, eventName) {
      return { e, eventName }
    }
  }
})

</script>