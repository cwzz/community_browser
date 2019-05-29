<template>
    <div style="background-color: #FFFFFF;padding: 10px">
      <Menu ref="menu"></Menu>
      这里是主页
    </div>
</template>

<script>
  import Menu from '../components/Menu/Menu'
    export default {
        name: "HomePage",
      components:{Menu},
      mounted(){
        this.$refs.menu.active_index=1
      },
    }
</script>

<style scoped>

</style>
