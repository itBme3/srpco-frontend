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
      :video-params="videoParams"
      :is-background="false"
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
  computed: {
    videoParams () {
      const paramsFromProps = this.modalData?.videoParams || {};
      const { mute = true } = paramsFromProps;
      return {...paramsFromProps, autoplay: true, mute }
    }
  },
  watch: {
    '$store.state.modal.modalData' (value) {
      this.showModal = value !== null;
      this.modalData = { ...value, videoParams: {...(value?.videoParams || {}), ...this.videoParams}  }
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