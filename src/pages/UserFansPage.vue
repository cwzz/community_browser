<template>
  <div style="background-color: #FFFFFF;padding: 10px;min-height: 800px">
    <Menu ref="head"></Menu>
    <Layout>
      <Layout>
        <Sider>
          <Main ref="test"></Main>
        </Sider>
        <Layout>
          <Content :style="{paddingLeft: '80px',paddingTop:'10px', minHeight: '280px', background: '#fff'}">
            <span style="font-size: 18px;font-weight: bold;position: absolute">我的粉丝</span>
            <Divider style="margin-top: 35px"/>
            <div v-if="articles.length==0" style="background-color: #f8f8f9;height: 150px;font-size: 15px;text-align: center;padding: 60px">您暂时还没有粉丝</div>
            <div v-else>
              <table  style="width: 100%" id="articles">
                <tr v-for="(article,index) in articles" class="page" v-if="canShow(index)">
                  <td @click="chooseArticle(article)">
                    <img :src=article.img  style="width: 50px;height: 50px;">
                  </td>
                  <td style="width: 76%" @click="chooseArticle(article)">{{article.name}}</td>
                  <td style="width: 20%" v-if="article.follow">
                    <Button @click.native="cancelFollow(article,index)">取消关注</Button>
                  </td>
                  <td style="width: 20%" v-else>
                    <Button @click.native="follow(article,index)">+关注</Button>
                  </td>

                </tr>
                <tr>
                  <td colspan="4" style="background-color: #f8f8f9;padding: 7px">
                    <Page @on-change="changePage" :current="current_page" :total="this.articles.length/(this.show_page_nums/10)" show-elevator />
                  </td>
                </tr>
              </table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import Menu from '../components/Menu/Menu'
  import Main from '../pages/UserPage'
    export default {
        name: "UserFansPage",
      components:{Main,Menu},
      mounted(){
        this.$refs.head.active_index=4;
        this.$axios.post('/server/C_User/getMyFans',{email:sessionStorage.getItem("username")}).then(re=>{
          this.articles=re.data
          console.log(re.data)
        })
      },
      data(){
        return{
          category_name:'全部',//类别名称
          tag_name:'',//标签名称
          articles:[],
          article_begin:0,//当前页面的文章开始下标
          show_page_nums:15,//一个页面总共可以显示多少条信息
          current_page:1//当前是第几页
        }
      },
      methods:{
        async follow(article,index){
          this.articles[index].follow=true
          await this.$axios.post('/server/C_User/starUser',{currentUser:sessionStorage.getItem("username"),param:article.email}).then(re=>{
          })
          this.$axios.post('/server/C_User/getMyFans',{email:sessionStorage.getItem("username")}).then(re=>{
            this.articles=re.data
          })
        },
        async cancelFollow(article,index){
          this.articles[index].follow=false
          await this.$axios.post('/server/C_User/cancelStarUser',{currentUser:sessionStorage.getItem("username"),param:article.email}).then(re=>{
          })
          this.$axios.post('/server/C_User/getMyFans',{email:sessionStorage.getItem("username")}).then(re=>{
            this.articles=re.data
          })
        },
        chooseArticle(article){
          sessionStorage.setItem("author_email",article.email)
          this.$router.push('/author')
        },
        //判断在当前页哪些文章可以显示
        canShow(index){
          var bool=(index>=this.article_begin)&&(index<this.article_begin+this.show_page_nums);
          return bool
        },
        changePage(page){
          this.article_begin=(page-1)*this.show_page_nums
        }
      }
    }
</script>

<style scoped>

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
    /*background-color: rgba(230,73,25,0.5);*/
    /*-webkit-text-fill-color: #ffffff;*/
    cursor: pointer;
  }

  #article_title th{
    background-color: #dcdee2;
    -webkit-text-fill-color: #17233d;
    font-size: 15px;
    font-weight: bold;
    padding: 10px;
  }

  .ivu-layout-sider{
    background-color: white;
  }

  button{
    width: 80px;
  }

  button:hover{
    width: 80px;
    color: rgba(230,73,25,0.5);
    border-color: rgba(230,73,25,0.5);
  }

</style>
