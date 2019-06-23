<template>
  <div style="background-color: #FFFFFF;padding: 10px">
    <Menu ref="head"></Menu>
    <Layout>
      <Layout>
        <Sider>
          <Main ref="test"></Main>
        </Sider>
        <Layout>
          <Content :style="{paddingLeft: '80px',paddingTop:'10px', minHeight: '280px', background: '#fff'}">
            <span style="font-size: 18px;font-weight: bold;position: absolute">我关注的</span>
            <Divider style="margin-top: 35px"/>
            <div v-if="articles.length==0" style="background-color: #f8f8f9;height: 150px;font-size: 15px;text-align: center;padding: 60px">暂无关注的博主</div>
            <div v-else>
              <table  style="width: 100%" id="articles">
                <tr v-for="(article,index) in articles" @click="chooseArticle(article)" class="page" v-if="canShow(index)">
                  <td>
                    <img :src=article.img  style="width: 50px;height: 50px;">
                  </td>
                  <td style="width: 76%">{{article.name}}</td>
                  <td style="width: 20%">
                    <Button @click.native="cancelFollow()">取消关注</Button>
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
        name: "UserFollowPage",
      components:{Menu,Main},
      mounted(){
        this.$refs.head.active_index=4;
        this.$axios.post('/server/C_User/getMyStarUser',{email:sessionStorage.getItem("username")}).then(re=>{
          this.articles=re.data
        })
      },
      data(){
        return{
          category_name:'全部',//类别名称
          tag_name:'',//标签名称
          articles:[
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'Jane',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'粽仔是最帅的',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'吊炸炫酷天的粽仔',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'Apolo',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'Halo',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'好好学习',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'天天向上',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'你有事吗',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'我没事',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'yeah！',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'逗你玩',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'姚琛要出道呀',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'小琛哥最帅',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'易烊千玺最帅',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'王俊凯最帅',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },
            {
              tag:'通知公告',
              img:'/static/img/elephant.d0491c9.png',
              name:'王源最帅',
              content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
            },

          ],
          article_begin:0,//当前页面的文章开始下标
          show_page_nums:15,//一个页面总共可以显示多少条信息
          current_page:1//当前是第几页
        }
      },
      methods:{
        cancelFollow(){

        },
        chooseArticle(article){
          this.$Message.success(article.title)
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

  button:hover{
    color: rgba(230,73,25,0.5);
    border-color: rgba(230,73,25,0.5);
  }
</style>
