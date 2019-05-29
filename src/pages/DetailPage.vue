<template>
    <div style="background-color: #FFFFFF;padding: 10px">
      <Menu ref="menu"></Menu>
      这里是某篇论坛具体内容和回复页面
    </div>
</template>

<script>
  import Menu from '../components/Menu/Menu'
    export default {
        name: "DetailPage",
      components:{Menu},
      mounted(){
        this.$refs.menu.active_index=2
      },
    }
</script>

<style scoped>

</style>
