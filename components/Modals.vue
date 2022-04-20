<template>
  <gModal
    v-if="modalData !== null"
    v-model="showModal"
    :variant="modalData.youtube && modalData.youtube.length ? 'video' : 'pdf'"
    @closed="handleClose"
  >
    <Media
      v-if="modalData !== null"
      :media="modalData.file"
      :youtube="modalData.youtube"
      :title="modalData.title"
      :text="modalData.text"
      :ratio="[null, undefined, 'auto'].includes(modalData.ratio) ? '16:9' : modalData.ratio"
      :video-params="modalData.videoParams"
      class="h-full w-full rounded-md"
    />
  </gModal>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      showModal: false,
      modalData: null
    }
  },
  watch: {
    '$store.state.modal.modalData' (value) {
      this.showModal = value !== null;
      this.modalData = value
    }
  },
  methods: {
    handleClose () {
      this.showModal = false;
      this.$store.commit('modal/close')
    }
  }
})
</script>