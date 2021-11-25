<template>
  <div class="page datasheets">
    <PageHeading
      v-if="page !== null && page !== undefined"
      title="Datasheets"
    />
    <Media
      v-if="entry !== mull && !!entry.url"
      class="w-full h-auto"
      :src="entry.url"
    />
  </div>
</template>
<script>
export default {
  scrollToTop: true,
  props: {
    entry: {
      type: Object,
      default: null
    }
  }
}
</script>
