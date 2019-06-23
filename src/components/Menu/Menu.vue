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
        <div v-if="login" style="float: right;padding-top: 60px;">
          <Avatar :src=avatar_url size="large" />
          <p id="out_frame" style="display: inline" @click="logout"><Icon type="md-exit" size="25" id="out"/><span>登出</span></p>
        </div>
        <div v-else style="float: right;padding-top: 70px;">
          <button class="login" @click="askForFrame('login')">登录</button>
          <button class="login" @click="askForFrame('register')">注册</button>
        </div>
      </div>
      <div style="width: 100%;height: 5px;background-color: #e64919;margin-bottom: 10px"></div>
    </div>
</template>

<script>

    export default {
        name: "Menu",
      mounted(){
        var username=sessionStorage.getItem("username")
        if(username==null || username==''){
          this.login=false
        }
        else{
          this.username=username
          this.login=true
          //同时设置头像
          if(sessionStorage.getItem("avatar_url")==null || sessionStorage.getItem("avatar_url")==''){
            this.$axios.post('/server/getImageUrl',{email:sessionStorage.getItem("username")}).then(re=>{
              this.avatar_url=re.data
              sessionStorage.setItem("avatar_url",re.data)
            })
          }
          else{
            this.avatar_url=sessionStorage.getItem("avatar_url")
          }
        }
      },
      data(){
        return{
          username:'',
          active_index:1,
          avatar_url:'',
          login:''
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
            if(this.login){
              this.$router.push('/publish')
            }
            else{
              this.askForFrame('login')
            }
          }
          else if(i==4){
            if(this.login){
              this.$router.push('/user/publish')
            }
            else{
              this.askForFrame('login')
            }
          }
        },
        getUser(){
          var username=sessionStorage.getItem("username")
          if(username==null || username==''){
            this.login=false
          }
          else{
            this.username=username
            this.login=true
            //同时设置头像
            this.$axios.post('/server/getImageUrl',{email:username}).then(re=>{
              this.avatar_url=re.data
            })
          }
        },
        askForFrame(para){
          this.$emit('showFrame',para)
        },
        logout(){
          sessionStorage.setItem("username",'')
          sessionStorage.setItem("user",'')
          sessionStorage.setItem("avatar_url",'')
          this.getUser()
          var path=this.$route.path
          if(path.indexOf('articles')<0&&path.indexOf('detail')<0&&path.indexOf('home')<0){
            this.$router.push('/home')
          }
        }
      },
      props:['frame']
    }
</script>

<style scoped>
  #out:hover{
    color: #e64919;
  }

  #out_frame:hover{
    cursor: pointer;
    -webkit-text-fill-color: #e64919;
  }
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

  .login{
    background: none;
    border: 1px solid rgba(230,73,25,0.5);
    -webkit-text-fill-color: rgba(230,73,25,0.5);
    font-size: 15px;
    padding: 2px;
    border-radius: 15px;
    width: 50px;
    outline: none;
  }

  .login:hover{
    /*border: 2px solid rgba(230,73,25,0.5);*/
    /*-webkit-text-fill-color: rgba(230,73,25,0.5);*/
    background-color: rgba(230,73,25,0.5);
    -webkit-text-fill-color: #ffffff;
    font-weight: bold;
  }
</style>
