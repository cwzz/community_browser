<template>
  <div>
    <Login style="position: absolute;z-index: 2" v-if="login.showLogin" v-bind:close_frame="login.frame" v-on:closeFrame="askLoginOrRegister($event)"></Login>
    <Register style="position: absolute;z-index: 2" v-if="login.showRegister" v-bind:close_frame="login.frame" v-on:closeFrame="askLoginOrRegister($event)"></Register>
    <Forget style="position: absolute;z-index: 2" v-if="login.showForget" v-bind:close_frame="login.frame" v-on:closeFrame="askLoginOrRegister($event)"></Forget>
    <div style="background-color: #FFFFFF;padding: 10px;min-height: 800px" v-bind:style="{filter:'blur('+login.blur_num+'px)'}">
      <Menu ref="menu" v-bind:frame="login.frame" v-on:showFrame="askLoginOrRegister($event)"></Menu>
      <div>
        <p>{{category_name}}</p>
      </div>
      <div v-if="articles.length==0" style="background-color: #f8f8f9;height: 150px;font-size: 15px;text-align: center;padding: 60px">抱歉，暂无关于{{category_name}}的内容</div>
      <div v-else style="text-align: center;width: 100%;background-color: #f8f8f9;margin-bottom: 5px">
        <table style="width: 100%" id="article_title">
          <tr style="width: 100%">
            <th style="width: 60%">{{category_name}}&nbsp{{tag_name}}</th>
            <th style="width: 20%">作者</th>
            <th style="width: 20%">回复/浏览</th>
          </tr>
        </table>
        <table style="width: 100%" id="articles">
          <tr v-for="(article,index) in articles" @click="chooseArticle(article)" class="page" v-if="canShow(index)">
            <td style="width: 4%" v-if="article.set_top"><Icon type="md-arrow-round-up" /></td>
            <td style="width: 4%" v-else><Icon type="md-document" /></td>
            <td style="width: 56%;text-align: left">{{getTitle(article.title)}}</td>
            <td style="width: 20%">{{article.author}}</td>
            <td style="width: 20%">{{article.reply}}/{{article.view}}</td>
          </tr>
          <tr>
            <td colspan="4" style="background-color: #f8f8f9;padding: 7px">
              <Page @on-change="changePage" :current="current_page" :total="this.articles.length/(this.show_page_nums/10)" show-elevator />
            </td>
          </tr>
        </table>
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
        name: "SearchPage",
      components:{Menu,Login,Register,Forget},
      mounted(){
        this.$refs.menu.active_index=2
        this.category_name=sessionStorage.getItem("search_key")
        if(this.category_name==null){
          this.$router.push('/home')
        }
        //然后getArticles
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
            category:0,//类别index
            tag:0,//标签index
            category_name:'',//类别名称
            tag_name:'',//标签名称
            articles:[],//在当前标签下的文章
            article_begin:0,//当前页面的文章开始下标
            show_page_nums:20,//一个页面总共可以显示多少条信息
            current_page:1//当前是第几页
          }
      },
      methods:{
        getTitle(title){
          var result=title
          if(title.length>55){
            result=result.substring(0,55)+'...'
          }
          return result
        },
        //根据类别和标签来判断标签所属的class
        getClass(category,tag){
          if((this.category==category)&&(this.tag==tag)){
            return 'choose_button'
          }
          else{
            return 'default_button'
          }
        },
        //选择某个新标签
        change(category,tag){
          this.category=category
          this.tag=tag
          if(category==0 && tag==0){
            this.category_name='全部'
            this.tag_name=''
          }
          else if(tag==0){
            this.category_name=category
            this.tag_name=''
          }
          else{
            this.category_name=category
            this.tag_name=tag
          }
          if(this.category_name=='全部'){
            this.$axios.post('/server/post/getArticleList',{category:this.category_name,label:'全部'}).then(re=>{
              this.articles=re.data
              //改current_page
              this.current_page=1
              this.article_begin=0;
            })
          }
          else if(this.tag_name==''){
            this.$axios.post('/server/post/getArticleList',{category:this.category_name,label:'全部'}).then(re=>{
              this.articles=re.data
              //改current_page
              this.current_page=1
              this.article_begin=0;
            })
          }
          else{
            this.$axios.post('/server/post/getArticleList',{category:this.category_name,label:this.tag_name}).then(re=>{
              this.articles=re.data
              //改current_page
              this.current_page=1
              this.article_begin=0;
            })
          }
        },
        //选择某篇文章，需要页面跳转
        chooseArticle(article){
          sessionStorage.setItem("post_detail_id",article.postId)
          this.$router.push('/detail')
        },
        //判断在当前页哪些文章可以显示
        canShow(index){
          var bool=(index>=this.article_begin)&&(index<this.article_begin+this.show_page_nums);
          return bool
        },
        //在特定的标签下切换页面
        changePage(page){
          this.article_begin=(page-1)*this.show_page_nums
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
  p{
    font-size: 25px;
    font-weight: bold;
    -webkit-text-fill-color: #17233d;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .default_button{
    padding-left: 7px;
    padding-right: 7px;
    height: 20px;
    background: none;
    border: none;
    -webkit-text-fill-color: #515a6e;
    margin-bottom: 5px;
    font-size: 13px;
  }

  .default_button:hover{
    -webkit-text-fill-color: #e64919;
    cursor: pointer;
  }

  .default_button:focus{
    outline: none;
    -webkit-text-fill-color: #FFFFFF;
    background-color: rgba(230,73,25,0.5);
    font-weight: bold;
    border-radius: 15px;
  }

  .choose_button{
    padding-left: 7px;
    padding-right: 7px;
    /*width: 50px;*/
    height: 20px;
    border: none;
    margin-bottom: 5px;
    font-size: 13px;
    outline: none;
    -webkit-text-fill-color: #FFFFFF;
    background-color: rgba(230,73,25,0.5);
    font-weight: bold;
    border-radius: 15px;
  }

  table{
    margin: 0 auto;
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
</style>
