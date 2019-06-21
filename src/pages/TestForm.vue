<template>
  <div>
    <T></T>
  </div>
</template>

<script>
  import T from '../components/user/RegisterPage'
    export default {
        name: "TestForm",
      components:{T},
      data(){
          return{
            close_frame:false
          }
      },
      methods:{
          test(res){
            this.$Message.success(res)
          }
      }
    }
</script>

<style scoped>

</style>
