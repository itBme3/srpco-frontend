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
    @click="handleModal"
  >
    <slot />
  </button>
  <span v-else>
    <slot />
  </span>
</template>

<script>
import { objectValue } from '~/utils/funcs'

export default {
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
    const mime = objectValue('media.mime', this.modalData)
    const youtube = objectValue('youtube', this.modalData)
    const res = { showModal: false }
    if (
      (typeof mime !== 'string' || !mime.includes('pdf')) && typeof youtube !== 'string') {
      res.mData = null
    } else if (this.$route.fullPath.split('/').length === 2 || ['services', 'solutions', 'applications'].includes(this.$route.fullPath.split('/')[1])) {
      res.mData = null
    } else {
      const { title = null, text = null, description = null, media: file = null } = this.modalData
      res.mData = {
        title,
        youtube,
        file,
        text: typeof description === 'string' && description.length > 0 ? description : text
      }
    }
    return res
  },
  methods: {
    toggleModal () {
      this.showModal = true
    },
    handleModal () {
      this.$emit('open-modal', this.mData)
    }
  }
}
</script>
