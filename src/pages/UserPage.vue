<template>
  <div style="background-color: #FFFFFF;padding: 10px">

    <div id="info" style="width: 240px;height: 200px;padding: 20px; margin-bottom:10px;background-color: rgb(249,249,249)">
      <img :src="avatar_url" style="width: 100px;height: 100px;border-radius: 50%">
      <span style="vertical-align: top;font-size: 18px;font-weight:bold;position: absolute;width: 100px;padding-top: 20px;margin-left: 17px" >{{user.nickname}}</span>
      <br>
      <div style="margin-top: 10px">
        <table id="fans_table" style="margin: 0 auto">
          <tr>
            <th @click="getTest(2)">关注</th>
            <th @click="getTest(3)">收藏</th>
            <th @click="getTest(4)">粉丝</th>
          </tr>
          <tr>
            <td @click="getTest(2)">{{user.interestUserNums}}</td>
            <td @click="getTest(3)">{{user.collectPostNums}}</td>
            <td @click="getTest(4)">{{user.fansNums}}</td>
          </tr>
        </table>
      </div>

    </div>
    <div style="width: 240px">
      <table id="menu_table">
        <tr>
          <td @click="getTest(1)"><Icon class="menu_icon" type="ios-paper-plane"/>我发布的</td>
        </tr>
        <tr>
          <td @click="getTest(2)"><Icon class="menu_icon" type="ios-heart" />我收藏的</td>
        </tr>
        <tr>
          <td @click="getTest(3)"><Icon class="menu_icon" type="md-star" />我关注的</td>
        </tr>
        <tr>
          <td @click="getTest(4)"><Icon class="menu_icon" type="md-contacts" />我的粉丝</td>
        </tr>
        <tr>
          <td @click="getTest(5)"><Icon class="menu_icon" type="md-person" />个人资料</td>
        </tr>
        <tr>
          <td @click="getTest(6)"><Icon class="menu_icon" type="logo-twitch" />消息通知</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

  export default {
    name: "UserPage",
    data () {
      return {
        user:'',
        avatar_url:''
      }
    },
    mounted(){
      if(sessionStorage.getItem("user")==null || sessionStorage.getItem("user")==''){
        this.$axios.post('/server/getUserInfo',{email:sessionStorage.getItem("username")}).then(re=>{
          this.user=re.data
          sessionStorage.setItem("user",JSON.stringify(re.data))
        })
      }
      else {
        this.user=JSON.parse(sessionStorage.getItem("user"))
      }

      if(sessionStorage.getItem("avatar_url")==null || sessionStorage.getItem("avatar_url")==''){
        this.$axios.post('/server/getImageUrl',{email:sessionStorage.getItem("username")}).then(re=>{
          this.avatar_url=re.data
          sessionStorage.setItem("avatar_url",re.data)
        })
      }
      else{
        this.avatar_url=sessionStorage.getItem("avatar_url")
      }

    },
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
      },
      getUser(){
        this.$axios.post('/server/getUserInfo',{email:sessionStorage.getItem("username")}).then(re=>{
          this.user=re.data
        })
        this.$axios.post('/server/getImageUrl',{email:sessionStorage.getItem("username")}).then(re=>{
          this.avatar_url=re.data
        })
      }
    }
  }

</script>

<style scoped>

  #fans_table th{
    font-size: 15px;
    text-align: center;
    width: 60px;
    cursor: pointer;
  }

  #fans_table th:hover,td:hover{
    -webkit-text-fill-color: #e64919;
  }

  #fans_table td{
    font-size: 15px;
    text-align: center;
    cursor: pointer;
  }

  #menu_table{
    margin: 0 auto;
    border: none;
    border-collapse: collapse;
    cursor: pointer;
    font-size: 17px;
    -webkit-text-fill-color: #515a6e;
  }

  #menu_table td{
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    width: 240px;
  }

  #menu_table td:hover{
    background-color: rgba(230,73,25,0.5);
    -webkit-text-fill-color: white;
  }

  .menu_icon{
    margin-right: 5px;
  }


</style>
