<template>
  <div>
    <Login style="position: absolute;z-index: 2" v-if="login.showLogin" v-bind:close_frame="login.frame" v-on:closeFrame="askLoginOrRegister($event)"></Login>
    <Register style="position: absolute;z-index: 2" v-if="login.showRegister" v-bind:close_frame="login.frame" v-on:closeFrame="askLoginOrRegister($event)"></Register>
    <Forget style="position: absolute;z-index: 2" v-if="login.showForget" v-bind:close_frame="login.frame" v-on:closeFrame="askLoginOrRegister($event)"></Forget>
    <div style="background-color: #FFFFFF;padding: 10px;min-height: 800px" v-bind:style="{filter:'blur('+login.blur_num+'px)'}">
      <Menu ref="menu" v-bind:frame="login.frame" v-on:showFrame="askLoginOrRegister($event)"></Menu>
      <p class="title">个人信息<span style="margin-left: 20px"><button id="star" @click="follow()">{{follow_text}}</button></span></p>
      <div style="width: 80%;margin-left: 10%;margin-right: 10%;background-color: #dcdee2;height: 1px;margin-top: 5px;margin-bottom: 10px"></div>
      <div class="back" style="min-height: 300px">
        <div style="width: 30%;background-color: #f8f8f9;float: left;text-align: center;padding-top: 10px;height: 200px">
          <img id="image" :src="avatar_url" style="height: 100px;width: 100px;border-radius: 50%">
          <div style="margin-top: 10px">
            <table id="fans_table" style="margin: 0 auto">
              <tr>
                <th @click="getTest(2)">关注</th>
                <th @click="getTest(3)">收藏</th>
                <th @click="getTest(4)">粉丝</th>
              </tr>
              <tr>
                <td @click="getTest(2)">{{formValidate.interestUserNums}}</td>
                <td @click="getTest(3)">{{formValidate.collectPostNums}}</td>
                <td @click="getTest(4)">{{formValidate.fansNums}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div style="width: 68%;background-color: #f8f8f9;float: left;margin-left: 2%;height: 200px">
          <table class="info1">
            <tr>
              <div>E-mail：</div>
              <td>{{formValidate.email}}</td>
              <td></td>
            </tr>
            <tr>
              <div>昵称：</div>
              <td>{{formValidate.nickname}}</td>
            </tr>
            <tr>
              <div>性别：</div>
              <td>{{formValidate.gender}}</td>
            </tr>
          </table>
          <table class="info1">
            <tr>
              <div>出生日期：</div>
              <td>{{formValidate.birth}}</td>
            </tr>
            <tr>
              <div>兴趣标签：</div>
              <td>{{formValidate.interest.toString().substr(1)}}</td>
            </tr>
          </table>
        </div>
        <div style="width: 100%;background-color: #f8f8f9;margin-top: 10px;float: left;min-height: 100px;margin-bottom: 10px">
          <table class="info2">
            <tr>
              <div>个人简介：</div>
              <td style="vertical-align: top">{{formValidate.desc}}</td>
            </tr>
          </table>
        </div>
      </div>
      <p class="title">发布的文章</p>
      <div style="width: 80%;margin-left: 10%;margin-right: 10%;background-color: #dcdee2;height: 1px;margin-top: 5px;margin-bottom: 10px"></div>
      <div v-if="articles.length>0" style="margin-left: 10%;margin-right: 10%">
        <table style="width: 100%" id="article_title">
          <tr style="width: 100%">
            <th style="width: 80%">全部</th>
            <th style="width: 20%">回复/浏览</th>
          </tr>
        </table>
        <table  style="width: 100%" id="articles">
          <tr v-for="(article,index) in articles" @click="chooseArticle(article)" class="page" v-if="canShow(index)">
            <td style="width: 4%" v-if="article.set_top"><Icon type="md-arrow-round-up" /></td>
            <td style="width: 4%" v-else><Icon type="md-document" /></td>
            <td style="width: 76%">{{article.title}}</td>
            <td style="width: 20%">{{article.reply}}/{{article.view}}</td>
          </tr>
          <tr>
            <td colspan="4" style="background-color: #f8f8f9;padding: 7px">
              <Page @on-change="changePage" :current="current_page" :total="this.articles.length/(this.show_page_nums/10)" show-elevator />
            </td>
          </tr>
        </table>
      </div>
      <div v-else style="margin-left: 10%;margin-right: 10%;background-color: #f8f8f9;height: 150px;text-align: center;padding: 50px;font-size: 15px">
        暂无发布的文章
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from '../components/Menu/Menu'
  import Login from '../components/user/LoginPage'
  import Register from '../components/user/RegisterPage'
  import Forget from '../components/user/ForgetPage'
    export default {
        name: "AuthorInfoPage",
      components:{Menu,Login,Register,Forget},
      mounted(){
        var author=sessionStorage.getItem("author_email")
        console.log('ppppppp'+author)
        if(author==null || author==''){
          this.$router.push('/home')
          this.$Message.error('不能直接跳转该页面')
        }
        else{
          this.$axios.post('/server/getUserInfo',{email:sessionStorage.getItem("author_email")}).then(re=>{
            this.formValidate=re.data
          })
          this.$axios.post('/server/getImageUrl',{email:sessionStorage.getItem("author_email")}).then(re=>{
            this.avatar_url=re.data
          })
          this.$axios.post('/server/C_User/getMyRelease',{email:author}).then(re=>{
            this.articles=re.data
          })
          var current=sessionStorage.getItem("username")
          if(current==null || current==''){
            this.isOn=false
          }
          else {
            this.$axios.post('/server/C_User/judgeStar',{currentUser:sessionStorage.getItem("username"),param:author}).then(re=>{
              if(re.data){
                this.follow_text='取消关注'
              }
              else{
                this.follow_text='立即关注'
              }
            })
          }
        }
      },
      data(){
          return{
            formValidate: {
              nickname:'王旭爸爸',
              email: 'wx8339459@163.com',
              interest: [',法律咨询','法律咨询','法律咨询','法律咨询'],
              gender: '男',
              birth:'1998-02-01',
              desc: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa安身的地方是顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdddddddsssssdddddddddddddddddddddddddddddddddddddddddd啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
              interestUserNums:5,
              collectPostNums:10,
              fansNums:25
            },
            avatar_url:'',
            login:{
              showLogin:false,
              showRegister:false,
              showForget:false,
              blur_num:0,
              frame:''
            },
            articles:[],
            article_begin:0,//当前页面的文章开始下标
            show_page_nums:20,//一个页面总共可以显示多少条信息
            current_page:1,//当前是第几页
            follow_text:'立即关注',
            isOn:true
          }
      },
      methods:{
        follow(){
          if(!this.isOn){
            this.askLoginOrRegister('login')
            return
          }
          if(this.follow_text=='立即关注'){
            this.$axios.post('/server/C_User/starUser',{currentUser:sessionStorage.getItem("username"),param:this.formValidate.email}).then(re=>{
            })
            this.follow_text='取消关注'
            this.formValidate.fansNums=this.formValidate.fansNums+1
          }
          else{
            this.$axios.post('/server/C_User/cancelStarUser',{currentUser:sessionStorage.getItem("username"),param:this.formValidate.email}).then(re=>{
            })
            this.follow_text='立即关注'
            this.formValidate.fansNums=this.formValidate.fansNums-1
          }
        },
        canShow(index){
          var bool=(index>=this.article_begin)&&(index<this.article_begin+this.show_page_nums);
          return bool
        },
        changePage(page){
          this.article_begin=(page-1)*this.show_page_nums
        },
        chooseArticle(article){
          sessionStorage.setItem('post_detail_id',article.postId)
          this.$router.push('/detail')
        },
        askLoginOrRegister(frame){
          if(frame=='login'){
            this.login.showLogin=true
            this.login.showRegister=false
            this.login.showForget=false
            this.login.blur_num=10
          }
          else if(frame=='register'){
            this.login.showLogin=false
            this.login.showRegister=true
            this.login.showForget=false
            this.login.blur_num=10
          }
          else if(frame=='forget'){
            this.login.showLogin=false
            this.login.showRegister=false
            this.login.showForget=true
            this.login.blur_num=10
          }
          else if(frame=='close'){
            this.login.showLogin=false
            this.login.showRegister=false
            this.login.showForget=false
            this.login.blur_num=0
          }
          this.$refs.menu.getUser()
          var current=sessionStorage.getItem("username")
          if(current==null || current==''){
            this.isOn=false
          }
        }
      }
    }
</script>

<style scoped>
  #star{
    font-size: 13px;
    background: rgba(230,73,25,0.5);
    width: 100px;
    border-radius: 5px;
    border: 1px solid #FFFFFF;
    outline: none;
    padding: 5px;
    -webkit-text-fill-color: white;
  }

  #star:hover{
    box-shadow: #e64919 0px 0px 5px 1px;
    cursor: pointer;
    font-weight: bold;
  }

  #articles{
    font-size: 15px;
    border-collapse: collapse;
  }
  #articles td{
    padding: 7px;
    background: none;
    border: 0px;
  }
  #articles tr{
    background-color: #f8f8f9;
  }
  #articles .page:hover{
    background-color: rgba(230,73,25,0.5);
    -webkit-text-fill-color: #ffffff;
    cursor: pointer;
  }

  #article_title th{
    background-color: #dcdee2;
    -webkit-text-fill-color: #17233d;
    font-size: 15px;
    font-weight: bold;
    padding: 10px;
  }

  .title{
    font-size: 18px;font-weight: bold;
    margin-left: 10%;
    margin-right: 10%;
  }

  #fans_table th{
    font-size: 15px;
    text-align: center;
    width: 60px;
  }


  #fans_table td{
    font-size: 15px;
    text-align: center;
    cursor: pointer;
  }


  .info1{
    float: left;
    font-size: 15px;
    -webkit-text-fill-color: #515a6e;
    width: 290px;
    margin-top: 40px;
  }

  .info1 tr div{
    width: 80px;
    text-align: right;
    padding-top: 8px;
    padding-bottom: 8px;
    -webkit-text-fill-color: #515a6e;
    font-weight: bold;
  }

  .info1 td{
    max-width: 200px;
    word-wrap: break-word;
    padding-left:3px;
    padding-right: 3px;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .info2{
    font-size: 15px;
    -webkit-text-fill-color: #515a6e;
  }
  .info2 tr div{
    width: 80px;
    text-align: right;
    padding-top: 8px;
    padding-bottom: 8px;
    font-weight: bold;
  }

  .info2 td{
    max-width: 500px;
    word-wrap: break-word;
    padding-left:3px;
    padding-right: 3px;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .back{
    /*background-color: #f8f8f9;*/
    margin-bottom: 20px;
    margin-left: 10%;
    margin-right: 10%;
  }
</style>
