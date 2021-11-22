<template>
  <div id="app">
    <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'App',
  data () {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        toolbar: []
      }
    }
  }
}
</script>
