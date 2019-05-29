<template>
    <div style="background-color: #FFFFFF;padding: 10px">
      <Menu ref="menu"></Menu>
      这里是发布论坛页面
    </div>
</template>

<script>
  import Menu from '../components/Menu/Menu'
    export default {
        name: "PublishPage",
      components:{Menu},
      mounted(){
        this.$refs.menu.active_index=3
      },
    }
</script>

<style scoped>

</style>
