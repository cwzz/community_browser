<template>
    <div style="background-color: #FFFFFF;padding: 10px">
      <Menu ref="menu"></Menu>
      这里是个人中心页面
    </div>
</template>

<script>
  import Menu from '../components/Menu/Menu'
    export default {
        name: "UserPage",
      components:{Menu},
      mounted(){
        this.$refs.menu.active_index=4
      },
    }
</script>

<style scoped>

</style>
