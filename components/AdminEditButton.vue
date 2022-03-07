<template>
  <div
    v-if="isAdmin && typeof adminLink === 'string' && adminLink.length > 0"
    class="edit-admin-button"
  >
    <a
      :href="link"
      target="_blank"
    >
      <gButton class="rounded-full">edit
        <Icon icon-name="edit" />
      </gButton>
    </a>
  </div>
</template>

<script>
// import { collectionTypes } from '~/models/entry.model';
// function getLinkFromPath(path) {
//   const collectionOrSlug = route.path.split('/')[1];
//   const collectionType = collectionTypes.includes(collectionOrSlug) 
//     ? collectionOrSlug : 'pages';
//   if ()
// }
export default {

  data () {
    return {
      adminLink: this?.$store?.state?.adminEdit?.link || null
    }
  },
  // watch: {
  //   'store.state.sessionStorage' () {
  //     this.isAdmin = this?.$store?.state?.sessionStorage?.isAdmin
  //   },
  //   'store.state.adminEdit' () {
  //     this.adminLink = this?.$store?.state?.adminEdit?.link || null
  //   }
  // }
  computed: {
    link () {
      return this.$store?.state?.adminEdit?.link || null
    },
    isAdmin () {
      return !!this?.$store?.state?.sessionStorage?.isAdmin
    }
  }
}
</script>

<style lang="scss">
.edit-admin-button {
  @apply fixed top-[100vh] left-0 transform translate-y-[-150%] z-999999 scale-80;
  button {
    @apply uppercase rounded-full py-2 px-4 bg-gray-800 text-blue-500 hover:text-blue-900 hover:bg-blue-500;
    .icon {
      @apply ml-2 relative -top-px;
    }
  }
}
</style>