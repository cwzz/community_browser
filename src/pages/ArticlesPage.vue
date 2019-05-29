<template>
    <div style="background-color: #FFFFFF;padding: 10px">
      <Menu ref="menu"></Menu>
    </div>
</template>

<script>
  import Menu from '../components/Menu/Menu'
    export default {
        name: "ArticlesPage",
      components:{Menu},
      mounted(){
        this.$refs.menu.active_index=2
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
