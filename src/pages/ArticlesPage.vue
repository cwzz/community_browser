<template>
    <div style="background-color: #FFFFFF;padding: 10px">
      <Menu ref="menu"></Menu>
      <Tags></Tags>
      <div>

      </div>
    </div>
</template>

<script>
  import Menu from '../components/Menu/Menu'
  import Tags from '../components/Articles/Tags'
    export default {
        name: "ArticlesPage",
      components:{Menu,Tags},
      mounted(){
        this.$refs.menu.active_index=2
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
