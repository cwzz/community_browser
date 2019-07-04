<template>
  <div>
    <Login style="position: absolute;z-index: 2" v-if="login.showLogin" v-bind:close_frame="login.frame" v-on:closeFrame="askLoginOrRegister($event)"></Login>
    <Register style="position: absolute;z-index: 2" v-if="login.showRegister" v-bind:close_frame="login.frame" v-on:closeFrame="askLoginOrRegister($event)"></Register>
    <Forget style="position: absolute;z-index: 2" v-if="login.showForget" v-bind:close_frame="login.frame" v-on:closeFrame="askLoginOrRegister($event)"></Forget>

    <div style="background-color: #FFFFFF;padding: 10px" v-bind:style="{filter:'blur('+login.blur_num+'px)'}">
      <Menu ref="menu" v-bind:frame="login.frame" v-on:showFrame="askLoginOrRegister($event)"></Menu>
      <!--这里是导航栏下面的轮播图和热点……-->
      <div style="padding-top: 5px;padding-bottom: 30px">
        <Row :gutter="20">
          <Col span="10" style="padding-top: 8px;">
            <Carousel v-model="beginIndex"
                      :autoplay="settings.autoplay"
                      :autoplay-speed="settings.autoplaySpeed"
                      :dots="settings.dots"
                      :radius-dot="settings.radiusDot"
                      :trigger="settings.trigger"
                      :arrow="settings.arrow"
                      :loop="settings.loop">
              <CarouselItem v-for="(imgUrl,index) in imgs" :key="index">
                <img :src="imgUrl"/>
              </CarouselItem>
            </Carousel>
          </Col>
          <Col span="14" style="">
            <ButtonGroup style="margin-bottom: 10px;">
              <Button :class="getClass(1)" @click="changeActive(1)">最热主题</Button>
              <Button :class="getClass(2)" @click="changeActive(2)">最新发帖</Button>
              <Button :class="getClass(3)" @click="changeActive(3)">最后回复</Button>
            </ButtonGroup>
            <table show-header="false" id="rank" style="width: 100%">
              <tr v-for="article in getArticles()" @click="chooseArticle(article)" class="rank_item">
                <td :class="getIndexClass(article.index)" style="width: 4%"><span>{{article.index}}</span></td>
                <td class="title" style="width: 71%">{{article.title}}</td>
                <td class="author" style="width: 15%">{{article.author}}</td>
              </tr>
            </table>
          </Col>
        </Row>
      </div>
      <!--分界线-->
      <div style="width: 100%;height: 5px;background-color: #e64919;margin-bottom: 10px"></div>
      <div style="width: 100%;height: 5px;background-color: #e64919;margin-bottom: 20px"></div>
      <!--下面是分类和标签-->
      <div>
        <div class="card">
          <div style="padding: 20px;height: 200px">
            <div style="width: 15%;float: left">
              <Icon @click="chooseCategory('法律咨询')" custom="iconfont i-icon-law icon" color="rgba(230,73,25)" style="cursor: pointer;"></Icon>
            </div>
            <div style="width: 85%;float: left">
              <p @click="chooseCategory('法律咨询')">法律咨询</p>
              <div style="width: 100%;height: 2px;background-color: #dcdee2;margin-bottom: 10px"></div>
              <button v-for="(tag,index) in values[0].values" :key="index" @click="chooseArticle('法律咨询-'+tag)" class="tag-class">{{tag}}</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div style="padding: 20px;height: 200px">
            <div style="width: 15%;float: left">
              <Icon @click="chooseCategory('金融问题')" custom="iconfont i-icon-eco icon" color="rgba(230,73,25)" style="cursor: pointer;"></Icon>
            </div>
            <div style="width: 85%;float: left">
              <p @click="chooseCategory('金融问题')">金融问题</p>
              <div style="width: 100%;height: 2px;background-color: #dcdee2;margin-bottom: 10px"></div>
              <button v-for="(tag,index) in values[1].values" :key="index" @click="chooseArticle('金融问题-'+tag)" class="tag-class">{{tag}}</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div style="padding: 20px;height: 200px">
            <div style="width: 15%;float: left">
              <Icon @click="chooseCategory('专利方面')" custom="iconfont i-icon-patent icon" color="rgba(230,73,25)" style="cursor: pointer;"></Icon>
            </div>
            <div style="width: 85%;float: left">
              <p @click="chooseCategory('专利方面')">专利方面</p>
              <div style="width: 100%;height: 2px;background-color: #dcdee2;margin-bottom: 10px"></div>
              <button v-for="(tag,index) in values[2].values" :key="index" @click="chooseArticle('专利方面-'+tag)" class="tag-class">{{tag}}</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div style="padding: 20px;height: 200px">
            <div style="width: 15%;float: left">
              <Icon @click="chooseCategory('其他问题')" custom="iconfont i-icon-other icon" color="rgba(230,73,25)" style="cursor: pointer;"></Icon>
            </div>
            <div style="width: 85%;float: left">
              <p @click="chooseCategory('其他问题')">其他问题</p>
              <div style="width: 100%;height: 2px;background-color: #dcdee2;margin-bottom: 10px"></div>
              <button v-for="(tag,index) in values[3].values" :key="index" @click="chooseArticle('其他问题-'+tag)" class="tag-class">{{tag}}</button>
            </div>
          </div>
        </div>

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
    name: "HomePage",
    components:{Menu,Login,Register,Forget},
    mounted(){
      this.$refs.menu.active_index=1
    },
    data(){
      return{
        login:{
          showLogin:false,
          showRegister:false,
          showForget:false,
          blur_num:0,
          frame:''
        },
        settings:{
          autoplay: true,
          autoplaySpeed: 5000,
          dots: 'inside',
          radiusDot: true,
          trigger: 'click',
          arrow: 'hover',
          loop:true
        },
        beginIndex: 0,
        activeTabIndex:1,
        imgs:[
          require('../assets/homeImg/1.jpeg'),
          require('../assets/homeImg/2.jpg'),
          require('../assets/homeImg/3.jpg'),
          require('../assets/homeImg/4.jpg')
        ],
        hottest:[
          {
            index:1,
            title:'专利交易中最应该注意的问题是什么',
            author:'王旭'
          },
          {
            index:2,
            title:'那种专利在交易中更受欢迎，市场更大，利润更高',
            author:'钟洁'
          },
          {
            index:3,
            title:'专利转让和专利许可的最大不同是什么?',
            author:'曹振飞'
          },
          {
            index:4,
            title:'大学生校内申请专利时学校有什么奖励政策',
            author:'张萍'
          },
          {
            index:5,
            title:'专利权收到侵犯时首先应该怎么做？',
            author:'M'
          },
          {
            index:6,
            title:'有免费可靠的的法律咨询处吗？',
            author:'江小白'
          },
          {
            index:7,
            title:'帮我照顾好我七舅老爷和他三外甥女',
            author:'粽子么么哒'
          },
          {
            index:8,
            title:'专利权收到侵犯时首先应该怎么做？',
            author:'奥斯卡'
          }
        ],
        newest:[
          {
            index:1,
            title:'大学生申请专利的流程',
            author:'最新'
          },
          {
            index:2,
            title:'那种专利在交易中更受欢迎，市场更大，利润更高',
            author:'钟洁'
          },
          {
            index:3,
            title:'专利转让和专利许可的最大不同是什么?',
            author:'曹振飞'
          },
          {
            index:4,
            title:'大学生校内申请专利时学校有什么奖励政策',
            author:'张萍'
          },
          {
            index:5,
            title:'专利权收到侵犯时首先应该怎么做？',
            author:'陈陈'
          },
          {
            index:6,
            title:'有免费可靠的的法律咨询处吗？',
            author:'小暖心粽子'
          },
          {
            index:7,
            title:'帮我照顾好我七舅老爷和他三外甥女',
            author:'M'
          },
          {
            index:8,
            title:'专利权收到侵犯时首先应该怎么做？',
            author:'奥斯卡'
          }
        ],
        answer:[
          {
            index:1,
            title:'专利交易中最应该注意的问题是什么',
            author:'我是第一'
          },
          {
            index:2,
            title:'那种专利在交易中更受欢迎，市场更大，利润更高',
            author:'钟洁'
          },
          {
            index:3,
            title:'专利转让和专利许可的最大不同是什么?',
            author:'曹振飞'
          },
          {
            index:4,
            title:'大学生校内申请专利时学校有什么奖励政策',
            author:'张萍'
          },
          {
            index:5,
            title:'专利权收到侵犯时首先应该怎么做？',
            author:'王旭'
          },
          {
            index:6,
            title:'有免费可靠的的法律咨询处吗？',
            author:'大可爱'
          },
          {
            index:7,
            title:'帮我照顾好我七舅老爷和他三外甥女',
            author:'小白'
          },
          {
            index:8,
            title:'专利权收到侵犯时首先应该怎么做？',
            author:'大白'
          }
        ],
        values:[
        {
          name:'法律咨询',
          values:['信息咨询','求助/讨论','法考/思考','备考经验','政策解读','相关资料','会议讲座','知识产权诉讼','资格证','学习笔记','程序与手续问题','其他实务']
        },
        {
          name:'金融问题',
          values:['职场经验','行业探讨','行业动态','IP风险管理','IP管理体系','IP部门构建','IP运营','IP保护','商标版权','程序与手续问题','机构探讨','曝光台']
        },
        {
          name:'专利方面',
          values:['专利保护','专利撰写','专利知识普及','专利转让','专利实物','检索分析','答辩（OA）','复审与无效','程序与手续问题','审查专业问题','文章资料']
        },
        {
          name:'其他问题',
          values:['征文活动','求职招聘&兼职','求购转让','公告','问题反馈','交友','国外资料','其他IP实务','创意设计']
        }
      ],//这就是所有的标签分类数组
      }
    },
    methods:{
      getClass(index){
        if (index===this.activeTabIndex){
          return "btn_active";
        }else{
          return "btn_default";
        }
      },
      changeActive(index){
        this.activeTabIndex=index;
      },
      getArticles(){
        if (this.activeTabIndex===1) {
          return this.hottest;
        }else if (this.activeTabIndex===2) {
          return this.newest;
        }else{
          return this.answer;
        }
      },
      getIndexClass(index){
        if (index<=3){
          return "index_bright";
        }else{
          return "index_grey";
        }
      },
      chooseArticle(article){
        var text=article.split('-')
        sessionStorage.setItem("category",text[0])
        sessionStorage.setItem("label",text[1])
        this.$router.push('/articles')
      },
      chooseCategory(category){
        sessionStorage.setItem("category",category)
        sessionStorage.setItem("label",0)
        this.$router.push('/articles')
      },
      //判断该打开login窗口还是register窗口,或者关闭该窗口
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
      }
    }

  }
</script>

<style scoped>
  .tag-class{
    font-size: 15px;
    margin-right: 15px;
    margin-top: 10px;
    text-align: center;
    background-color: #f8f8f9;
    border-radius: 5px;
    border: none;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .tag-class:hover{
    background-color: #e64929;
    -webkit-text-fill-color: white;
    cursor: pointer;
  }
  .icon{
    margin-top: 15px;
    /*color: #e64929;*/
  }
  .card{
    margin-bottom: 20px;box-shadow: #dcdee2 0px 0px 5px 1px ;border-radius: 5px
  }

  .card p{
    -webkit-text-fill-color: #515a6e;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .class-title{
    font-size: 21px;
  }
  .class-title:hover{
    color: #e64919;
    cursor: pointer;
  }
  .i-icon-law:before{
    content: "\e606";
  }
  .i-icon-eco:before{
    content: '\e603';
  }
  .i-icon-patent:before{
    content: '\e60c';
  }
  .i-icon-other:before{
    content: '\e62f';
  }
  img{
    width: 100%;
    height: 300px;
  }
  #rank{
    font-size: 17px;
    border-collapse:separate;
    border-spacing:0 7px;
  }
  .index_bright{
    background: #e64929;
    text-align: center;
    color: #ffffff;
  }
  .index_grey{
    background: #c3c3c3;
    text-align: center;
    /*color: #ffffff;*/
  }
  .title{
    padding-left: 2%;
  }
  .title:hover{
    color: #e64929;
    cursor: pointer;
  }
  .author{
    /*text-align: right;*/
  }
  .rank_item{
    height: 25px;
  }
  .btn_active{
    padding-bottom: 3px;
    outline: none;border: none;
    border-radius: 0;
    font-size: 18px;
    font-weight: bold;
    -webkit-text-fill-color: #e64919;
    border-bottom: 3px solid #e64919;

  }
  .btn_active:focus{
    padding-bottom: 3px;
    box-shadow: none;
    outline: 0 none;border: none;
    border-radius: 0;
    font-size: 18px;
    font-weight: bold;
    -webkit-text-fill-color: #e64919;
    border-bottom: 3px solid #e64919;
  }
  .btn_default{
    padding-bottom: 3px;
    outline: none;border: none;
    font-size: 18px;
    font-weight: bold;
    -webkit-text-fill-color: #17233d;
    border-bottom: 3px solid #ffffff;
  }
  .btn_default:hover{
    padding-bottom: 3px;
    outline: none;border: none;
    -webkit-text-fill-color: #e64919;
    border-bottom: 3px solid #ffffff;
  }
  .btn_default:focus{
    padding-bottom: 3px;
    outline: 0;border: none;box-shadow: none;
    -webkit-text-fill-color: #e64919;
    border-bottom: 1px solid #ffffff;
  }
</style>
