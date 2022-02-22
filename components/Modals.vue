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
      :embed="true"
      :ratio="[null, undefined, 'auto'].includes(modalData.ratio) ? '16:9' : modalData.ratio"
      :video-params="modalData.videoParams"
      class="h-full w-full rounded-md"
    />
  </gModal>
</template>

<script>
export default {
  data () {
    return {
      showModal: false
    }
  },
  created () {

  },
  computed: {
    modalData () {
      this.showModal = this.$store.state.modal.modalData !== null;
      return this.$store.state.modal.modalData;
    }
  },
  methods: {
    handleClose () {
      this.showModal = false;
      this.$store.commit('modal/close')
    }
  }
}
</script>