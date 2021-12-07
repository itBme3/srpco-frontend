<template>
  <div>
    <div
      v-if="Array.isArray(entries) && entries.length > 0"
      class="entries"
      :class="{ [collectionType]: true }"
    >
      <Card
        v-for="(entry, index) in entries"
        :key="entry.id"
        :title="entry.title"
        :media="entry.file"
        card-style="mediaLeft"
        :link="entry.type === 'datasheet' ? null : + collectionType + '/' + entry.slug"
        media-ratio="8.5:11"
        media-classes="shadow-2xl rounded my-2 ml-2 mr-4"
        class="col-span-12"
        :class="{ [entry.type]: true }"
        @open-modal="handleModal"
      />
    </div>
    <client-only>
      <gModal
        v-if="![undefined, null].includes(modalData)"
        v-model="showModal"
        variant="pdf"
        @closed="handleClose"
      >
        <Media
          v-if="![undefined, null].includes(modalData)"
          :media="modalData.file"
          :youtube="modalData.youtube"
          :title="modalData.title"
          :text="modalData.text"
          :embed="true"
          class="h-full w-full rounded-md"
        />
      </gModal>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      collectionType: 'datasheets',
      modalData: null,
      showModal: false
    }
  },
  computed: {
    entries () {
      return this.block !== undefined && this.block !== null && Array.isArray(this.block[this.collectionType]) ? this.block[this.collectionType] : null
    },
    cardClasses () {
      try {
        return block.cardSettings.cardClasses
      } catch (err) {
        return null
      }
    },
    mediaClasses () {
      try {
        return block.cardSettings.cardClasses
      } catch (err) {
        return null
      }
    },
    titleClasses () {
      try {
        return block.cardSettings.cardClasses
      } catch (err) {
        return null
      }
    }
  },

  methods: {
    handleClose (e) {
      this.modalData = null
      this.showModal = false
    },
    handleModal (mData) {
      if (![undefined, null].includes(mData)) {
        if ((!!mData.youtube && mData.youtube.length > 0) || (!!mData.file && !!mData.file.mime && mData.file.mime.includes('pdf'))) {
          this.showModal = true
          setTimeout(() => {
            this.modalData = mData
          }, 500)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.entries {
  @apply grid grid-cols-12 gap-3;
}
</style>
