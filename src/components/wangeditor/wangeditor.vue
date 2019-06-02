<template>
  <div class="editor">
    <div ref="toolbar" class="toolbar" style="display: none"></div>
    <div ref="editor" class="text"></div>
  </div>
</template>

<script>
  import E from 'wangeditor'

  export default {
    name: 'Editorbar',
    data () {
      return {
        editor:null,
        info_:null,
        editorContent: ''
      }
    },
    model:{
      prop:'value',
      event:'change'
    },
    methods: {
      getContent: function () {
        alert(this.editorContent)
      }
    },
    mounted() {
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
    }
  }
</script>

<style scoped>
  /*.editor{*/
    /*width: 80%;*/
    /*margin: 0 auto;*/
  /*}*/
  /*.toolbar{*/
    /*border: 1px solid #ccc;*/
  /*}*/
  /*.text{*/
    /*border:1px solid #ccc;*/
    /*height: 150px;*/
  /*}*/
</style>
