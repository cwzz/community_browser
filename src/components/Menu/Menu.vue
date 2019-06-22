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
        <Avatar v-if="login" :src=avatar_url style="margin-top: 65px;float: right;margin-right: 50px" />
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
        if(username==null){
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
      data(){
        return{
          username:'',
          active_index:1,
          avatar_url:'https://i.loli.net/2017/08/21/599a521472424.jpg',
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
          console.log(username+" in method")
          if(username==null){
            this.login=false
          }
          else{
            this.username=username
            this.login=true
            //同时设置头像
          }
        },
        askForFrame(para){
          this.$emit('showFrame',para)
        },
      },
      props:['frame']
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
