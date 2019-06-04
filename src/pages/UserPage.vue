<template>
  <div style="background-color: #FFFFFF;padding: 10px">

    <div id="info" style="width: 240px;height: 180px;padding: 20px; margin-bottom:10px;background-color: rgb(249,249,249)">
      <img src="../assets/telephone.png" style="width: 80px;height: 80px;">
      <span style="vertical-align: top;font-size: 18px;position: absolute;width: 100px;padding-top: 6px;margin-left: 17px" >钟洁爸爸</span>
      <br>
      <div style="margin-top: 10px">
        <span class="fans">关注</span>
        <span class="fans">收藏</span>
        <span class="fans">粉丝</span>
      </div>
      <div>
        <span class="num">20</span>
        <span class="num">20</span>
        <span class="num">20</span>
      </div>

    </div>
    <div style="width: 240px">
      <Menu :theme="theme3" >
        <MenuItem name="1" @click.native="getTest(1)">
          <Icon type="ios-paper-plane"/>
          我发布的
        </MenuItem>
        <MenuItem name="2" @click.native="getTest(2)">
          <Icon type="ios-heart" />
          我收藏的
        </MenuItem>
        <MenuItem name="3" @click.native="getTest(3)">
          <Icon type="md-star" />
          我关注的
        </MenuItem>
        <MenuItem name="4" @click.native="getTest(4)">
          <Icon type="md-contacts" />
          我的粉丝
        </MenuItem>
        <MenuItem name="5" @click.native="getTest(5)">
          <Icon type="md-person" />
          个人资料
        </MenuItem>
        <MenuItem name="6" @click.native="getTest(6)">
          <Icon type="logo-twitch" />
          消息通知
        </MenuItem>
      </Menu>
    </div>




  </div>
</template>

<script>

  export default {
    data () {
      return {
        theme3: 'light'
      }
    },
    name: "UserPage",
    // components:{Header},
    // mounted(){
    //   this.$refs.menu.active_index=4
    // },

    methods:{
      getTest(i){
        if(i===1){
          // alert("我发布的");
          this.$router.push('/user/publish')
        }
        else if(i===2){
          this.$router.push('/user/collect')
        }
        else if(i===3){
          this.$router.push('/user/follow')
        }
        else if(i===4){
          this.$router.push('/user/fans')
        }
        else if(i===5){
          this.$router.push('/user/info')
        }
        else if(i===6){
          this.$router.push('/user/message')
        }
      }
    }

  }

</script>

<style scoped>
  .fans{
    margin-right: 50px;
    font-size: 15px;
  }

  .num{
    margin-left: 2px;
    margin-right: 64px;
    font-size: 15px;
  }

  .num:hover{
    color: rgba(230,73,25,0.5);
    cursor: pointer;
  }

</style>
