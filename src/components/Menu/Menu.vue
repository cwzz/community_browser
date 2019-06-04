<template>
    <div>
      <div style="height: 110px;width: 100%;">
        <div style="width: 10%;float: left;text-align: left">
          <img src="../../assets/logo.png" style="width: 100px">
        </div>
        <div style="float: left;padding-top: 60px;text-align: left">
          <ButtonGroup>
            <Button style="display: none"></Button>
            <Button :class="getClass(1)" icon="md-home" @click="getPage(1)">论坛主页</Button>
            <Button :class="getClass(2)" icon="md-copy" @click="getPage(2)">论坛帖子</Button>
            <Button :class="getClass(3)" icon="md-brush" @click="getPage(3)">发布帖子</Button>
            <Button :class="getClass(4)" icon="md-person" @click="getPage(4)">个人中心</Button>
            <Button style="display: none"></Button>
          </ButtonGroup>
        </div>
      </div>
      <div style="width: 100%;height: 5px;background-color: #e64919;margin-bottom: 10px"></div>
    </div>
</template>

<script>

    export default {
        name: "Menu",
      data(){
        return{
          active_index:1
        }
      },
      methods:{
        getClass(i){
          if(this.active_index==i){
            return "menu_active"
          }
          else {
            return "menu_default"
          }
        },
        getPage(i){
          if(i==1){
            this.$router.push('/home')
          }
          else if(i==2){
            this.$router.push('/articles')
          }
          else if(i==3){
            this.$router.push('/publish')
          }
          else if(i==4){
            this.$router.push('/user')
          }
        }
      }
    }
</script>

<style scoped>
  .menu_default{
    font-size: 18px;
    font-weight: bold;
    -webkit-text-fill-color: #17233d;
    border: #FFFFFF solid 3px;
  }
  .menu_default:hover{
    -webkit-text-fill-color: #e64919;
    border: rgba(230,73,25,0.5) solid 3px;
  }
  .menu_default:focus{
    -webkit-text-fill-color: #e64919;
    border: rgba(230,73,25,0.5) solid 3px;
  }

  .menu_active{
    font-size: 18px;
    font-weight: bold;
    -webkit-text-fill-color: #e64919;
    border: #FFFFFF solid 3px;
  }
  .menu_active:hover{
    -webkit-text-fill-color: #e64919;
    border: rgba(230,73,25,0.5) solid 3px;
  }
  .menu_active:focus{
    -webkit-text-fill-color: #e64919;
    border: rgba(230,73,25,0.5) solid 3px;
  }
</style>
