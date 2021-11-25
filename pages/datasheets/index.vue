<template>
  <div class="page datasheets">
    <Heading
      v-if="page !== null && page !== undefined"
      heading-type="collection"
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
