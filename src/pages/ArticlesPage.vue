<template>
    <div style="background-color: #FFFFFF;padding: 10px">
      <Menu ref="menu"></Menu>
      <div>
        <p>{{category_name}}&nbsp&nbsp{{tag_name}}</p>
        <div style="height: 130px;background-color: rgb(249,249,249);padding: 10px">
          <div style="height: 120px;float: left;text-align: left">
            <table>
              <tr>
                <td style="border-right: 2px solid #dcdee2"><button @click="change(0,0)" :class="getClass(0,0)">全部</button></td>
              </tr>
              <tr v-for="category in values">
                <td style="border-right: 2px solid #dcdee2"><button @click="change(category.name,0)" :class="getClass(category.name,0)">{{category.name}}</button></td>
                <td>
                  <button v-for="tag in category.values" @click="change(category.name,tag)" :class="getClass(category.name,tag)">
                    {{tag}}
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div style="text-align: center;width: 100%;margin-top: 20px;min-height: 500px;background-color: #f8f8f9;margin-bottom: 5px">
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
            <td style="width: 56%">{{article.title}}</td>
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
</template>

<script>
  import Menu from '../components/Menu/Menu'
    export default {
        name: "ArticlesPage",
      components:{Menu},
      mounted(){
        this.$refs.menu.active_index=2
      },
      data(){
          return{
            category:0,//类别index
            tag:0,//标签index
            values:[
              {
                name:'分类1',
                values:['标签1','标签2','标签3','标签4','标签5','标签6','标签7','标签8','标签9','标签10','标签11','标签12','标签13','标签14','标签15','标签16','标签17','标签18',]
              },
              {
                name:'分类2',
                values:['标签1','标签2','标签3','标签4','标签5','标签6','标签7','标签11','标签12','标签13','标签14','标签15','标签16','标签17','标签18',]
              },
              {
                name:'分类3',
                values:['标签1','标签13','标签14','标签15','标签16','标签17','标签18',]
              }
            ],//这就是所有的标签分类数组
            category_name:'全部',//类别名称
            tag_name:'',//标签名称
            articles:[
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'aksjdflajsdoivannsgvarsuhgvasdearhfvsuaeghv<br>asdfaksljdflkjas'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:false,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:false,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:false,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'aksjdflajsdoivannsgvarsuhgvasdearhfvsuaeghv<br>asdfaksljdflkjas'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:false,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:false,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:false,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'aksjdflajsdoivannsgvarsuhgvasdearhfvsuaeghv<br>asdfaksljdflkjas'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                set_top:true,
                tag:'通知公告',
                title:'2019年《专利代理师资格考试办法》公布，详细报考条件说明！',
                author:'王旭爸爸',
                reply:150,
                view:1200,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
            ],//在当前标签下的文章
            article_begin:0,//当前页面的文章开始下标
            show_page_nums:20,//一个页面总共可以显示多少条信息
            current_page:1//当前是第几页
          }
      },
      methods:{
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
          else{
            this.category_name=category
            this.tag_name=tag
          }
          //改articles
          //改current_page
          this.current_page=1
          this.article_begin=0;
        },
        //选择某篇文章，需要页面跳转
        chooseArticle(article){
          this.$Message.success(article.author)
        },
        //判断在当前页哪些文章可以显示
        canShow(index){
          var bool=(index>=this.article_begin)&&(index<this.article_begin+this.show_page_nums);
          return bool
        },
        //在特定的标签下切换页面
        changePage(page){
          this.article_begin=(page-1)*this.show_page_nums
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
    width: 50px;
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
    width: 50px;
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
