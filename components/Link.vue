<template>
    
  <nuxt-link
    v-if="linkType === 'nuxt'"
    :to="to"
  >
    <slot />
  </nuxt-link>
  <gButton
    v-else-if="linkType === 'button'"
    @click="$router.push(to)">
    <slot />
  </gButton>
  <a
    v-else-if="linkType === 'link'"
    :href="to"
    class="simple-link"
    :target="openNewTab === true ? '_blank' : '_self'"
  >
    <slot />
  </a>
  <button
    v-else-if="linkType === 'modal'"
    :tag-name="mData === null ? 'div' : 'gButton'"
    @click="handleModal()"
  >
    <slot />
  </button>
  <span v-else>
    <slot />
  </span>
</template>

<script>

import Vue from 'vue'
export default Vue.extend({
  props: {
    openNewTab: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: null
    },
    modalData: {
      type: Object,
      default: () => null
    },
    isButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const { title = null, text = null, description = null, media: file = null, youtube = null, videoParams = {} } = !!this.modalData ? this.modalData : {}
    const mData = this.modalData?.media?.mime?.includes('pdf') || this.modalData?.youtube?.length
      ? {
        title, youtube, file,
        text: typeof description === 'string' && description.length > 0 ? description : text
      }
      : null;
    if (this.modalData?.youtube?.length) {
      const defaultParams = { mute: false, autoplay: false, controls: true, loop: false, autohide: false, showInfo: true, modestbranding: true, }
      mData.videoParams = Object.keys(videoParams).length ? { ...defaultParams, ...videoParams } : defaultParams
    }
    return { showModal: false, mData }
  },
  computed: {
    linkType() {
      if(typeof this.to === 'string' && !!this.to.indexOf && (this.to.indexOf('/') === 0 || this.to.indexOf('#') === 0) && !this.openNewTab && !this.isButton) {
        return "nuxt"
      }
      if (typeof this.to === 'string' && !!this.to.indexOf && (this.to.indexOf('/') === 0 || this.to.indexOf('#') === 0) && !this.openNewTab && this.isButton) {
        return "button"
      }
      if(![undefined, null].includes(this.mData)) {
        return "modal"
      }
      if(typeof this.to === 'string' && this.to.length > 0) {
        return "link"
      }
      return "span";
    }
  },
  methods: {
    toggleModal () {
      this.showModal = true
    },
    handleModal () {
      this.$emit('open-modal', this.mData)
    }
  }
})
</script>
