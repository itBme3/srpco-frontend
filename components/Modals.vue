<template>
  <gModal
    v-if="modalData !== null"
    v-model="showModal"
    variant="pdf"
    @closed="handleClose"
  >
    <Media
      v-if="modalData !== null"
      :media="modalData.file"
      :youtube="modalData.youtube"
      :title="modalData.title"
      :text="modalData.text"
      :embed="true"
      class="h-full w-full rounded-md"
    />
  </gModal>
</template>

<script>
export default {
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    modalData() {
      this.showModal = this.$store.state.modal.modalData !== null;
      return this.$store.state.modal.modalData;
    }
  },
  methods: {
    handleClose() {
      this.showModal = false;
      this.$store.commit('modal/close')
    }
  }
}
</script>