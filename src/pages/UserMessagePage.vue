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
            <span style="font-size: 18px;font-weight: bold;position: absolute">消息通知</span>
            <Divider style="margin-top: 35px"/>
            <div v-if="articles.length==0" style="background-color: #f8f8f9;height: 150px;font-size: 15px;text-align: center;padding: 60px">暂无消息</div>
            <div v-else>
              <table style="width: 100%" id="article_title">
                <tr style="width: 100%">
                  <th style="width: 20%;text-align: center">时间</th>
                  <th style="width: 80%;text-align: center" colspan="2">全部</th>
                </tr>
              </table>
              <table  style="width: 100%" id="articles">
                <tr v-for="(article,index) in articles" class="page" v-if="canShow(index)">
                  <td style="width: 20%;text-align: center;font-weight: bold" v-if="!article.isRead">{{article.time}}</td>
                  <td style="width: 20%;text-align: center" v-else>{{article.time}}</td>
                  <td style="width: 4%" v-if="!article.isRead"><Icon type="ios-mail-outline" /></td>
                  <td style="width: 4%" v-if="article.isRead"><Icon type="ios-mail-open-outline" /></td>
                  <td style="width: 76%;word-wrap: break-word;font-weight: bold" v-if="!article.isRead">{{article.event}}</td>
                  <td style="width: 76%;word-wrap: break-word" v-else>{{article.event}}</td>
                </tr>
                <tr>
                  <td colspan="3" style="background-color: #f8f8f9;padding: 7px">
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
    name: "UserMessagePage",
    components:{Main,Menu},
    mounted(){
      this.$refs.head.active_index=4;
      this.$axios.post('/server/Message/showMessage',{email:sessionStorage.getItem("username")}).then(re=>{
        this.articles=re.data
      })
    },
    data(){
      return{
        category_name:'全部',//类别名称
        tag_name:'',//标签名称
        articles:[],
        article_begin:0,//当前页面的文章开始下标
        show_page_nums:20,//一个页面总共可以显示多少条信息
        current_page:1//当前是第几页
      }
    },
    methods:{
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
    /*border: 0px;*/
    border-bottom: 1px solid #dcdee2;
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

  .ivu-layout-sider{
    background-color: white;
  }
</style>
