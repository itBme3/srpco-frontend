<template>
  <nuxt-link
    v-if="typeof link === 'string' && !!link.indexOf && link.indexOf('/') === 0 && openNewTab !== true"
    :to="link"
  >
    <slot />
  </nuxt-link>
  <a
    v-else-if="typeof link === 'string' && link.length > 0"
    :href="link"
    class="simple-link"
    :target="openNewTab === true ? '_blank' : '_self'"
  >
    <slot />
  </a>
  <button
    v-else-if="![undefined, null].includes(mData)"
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
    link: {
      type: String,
      default: null
    },
    modalData: {
      type: Object,
      default: () => null
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
