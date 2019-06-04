<template>
    <div style="background-color: #FFFFFF;padding: 10px">
      <Menu ref="menu"></Menu>
      <div id="article area" style="width: 82%;margin-left: auto;margin-right: auto;">
      <Breadcrumb separator=">" style="margin-bottom: 15px">
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem to="/大标签/小标签">大标签</BreadcrumbItem>
        <BreadcrumbItem>小标签</BreadcrumbItem>
      </Breadcrumb>
      <p style="font-weight: bold;font-size: 32px;color: #464c5b;margin-bottom: 15px">
        <Icon type="md-cloud-upload" style="margin-right: 30px"/>文章标题
      </p>
      <div class="markdown-body" id="content" style="font-size: 16px;background-color: rgb(245,246,247);padding: 20px 20px 20px 20px;margin-bottom: 15px">
        <p><strong>我没有什么好怕的，说实话。阿瓦达hi奥的厚爱哇ID我回答道哈迪我的号ID我哦啊的厚爱的午后到活动我爱好爱好都爱我的味道伟大无，我没有什么好怕的，说实话。阿瓦达hi奥的厚爱哇ID我回答道哈迪我的号ID我哦啊的厚爱的午后到活动我爱好爱好都爱我的味道伟大无。</strong><br /> <em>我这么强，我太刁了。</em></p> <ol> <li>我的hi是试试</li> <li>我的对待将诶</li> <li>味道伟大无多无多</li> <li>当地的</li> </ol> <ul> <li>阿瓦达无</li> <li>味道伟大无</li> <li>我的人头</li> <li>儿童人员要</li> <li>儿童热帖</li> </ul> <table> <thead> <tr> <th>column1</th> <th>column2</th> <th>column3</th> </tr> </thead> <tbody> <tr> <td>content1</td> <td>content2</td> <td>content3</td> </tr> </tbody> </table>
      </div>
        <Card style="margin-bottom: 15px">
          <Row>
            <Col span="3">
            <Row style="text-align: center">
            <img style="width:40px" src="https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100">
            </Row>
            <Row style="text-align: center">
              <span>本文作者</span>
            </Row>
            </Col>
            <Col span="3">
            <Row style="margin-top:5px">
              <span> &nbsp;用户名</span>
            </Row>
            <Row>
              <Time :time="1559291454432" />
            </Row>
            </Col>
            <Col span="3">
            <Row style="margin-top:5px">
              <span> <Icon type="md-star" />2</span>
            </Row>
            <Row>
              <span>关注</span>
            </Row>
            </Col>
            <Col span="3">
            <Row style="margin-top:5px">
              <span><Icon type="md-clipboard" />4</span>
            </Row>
            <Row>
              <span>回帖</span>
            </Row>
            </Col>
            <Col span="3">
            <Row style="margin-top:5px">
              <span> <Icon type="md-people" />67</span>
            </Row>
            <Row>
              <span>访问人数</span>
            </Row>
            </Col>
            <Col span="3">
            <Row style="margin-top:5px">
              <span> <Icon type="md-document" />55</span>
            </Row>
            <Row>
              <span>浏览帖子数</span>
            </Row>
            </Col>
            <Col span="3">
            <Row style="margin-top:5px">
              <span> <Icon type="md-cloud-upload" />77</span>
            </Row>
            <Row>
              <span>发帖数</span>
            </Row>
            </Col>
            <Col span="3">
            <Row style="margin-top:5px">
              <span> <Icon type="md-heart" />55</span>
            </Row>
            <Row>
              <span>收藏</span>
            </Row>
            </Col>
          </Row>
        </Card>
        <p style="margin-bottom: 15px;color: #4285f4;padding-left: 10px;font-size: 16px">添加回帖内容...</p>
        <div style="margin-bottom: 15px">
          <Row>
            <Col span="2"><img style="width:50px;padding-left: 10px" src="https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100"></Col>
            <Col span="22">
            <div id="editor">
            <editorbar v-model="editor.info" :isClear="isClear"></editorbar>
            </div>
            </Col>
          </Row>
        </div>
        <div style="margin-bottom: 30px">
          <Button type="primary" @click="addComment()" style="position: relative;left: 92%;">提交评论</Button>
        </div>
        <table id="comments" style="width: 100%">
          <tr style="margin-bottom: 15px">
            <span style="font-size: 16px;font-weight: bold">{{total_comments.length+"回帖"}}</span>
          </tr>
          <Divider style="margin-bottom: 15px"/>
          <tr v-for="(comment,index) in show_comments" class="page">
            <Card style="margin-bottom:15px">
              <Row>
                <Col span="2">
                <img style="width:40px" v-bind:src="comment.user_photo">
                </Col>
                <Col span="20">
                <Row>
                  <p>
                    <span>{{comment.user_name}}</span>&nbsp;
                    <Time v-bind:time="comment.time" />
                  </p>
                </Row>
                <Row>
                  <div v-html="comment.content"></div>
                </Row>
                </Col>
                <Col span="2">
                <Row><Icon type="md-thumbs-up" />&nbsp;点赞</Row>
                <Row><Icon type="md-heart" />&nbsp;收藏</Row>
                </Col>
              </Row>
            </Card>
          </tr>
          <tr>
            <td colspan="4" style="background-color: #f8f8f9;padding: 7px">
              <Page @on-change="changePage" :current="current_page" v-bind:total="total_comments.length" :page-size="page_size" show-elevator />
            </td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
  import Menu from '../components/Menu/Menu'
  import Editorbar from "../components/wangeditor/wangeditor";
  import 'mavon-editor/dist/markdown/github-markdown.min.css'
    export default {
        name: "DetailPage",
      components:{
        Editorbar,
        Menu
      },
      mounted(){
        // this.$refs.menu.active_index=2;
        // this.comment_count=this.total_comments.length;
        // if(this.comment_count<this.page_size){
        //   this.show_comments=this.total_comments;
        // }else{
        //   this.show_comments=this.total_comments.slice(0,this.page_size);
        // }
      },
      data(){
          return {
            editor: {
              info:'想对作者说些什么...'
            },
            isClear:false,
            page_size:15,
            current_page:1,
            show_comments:[],
            total_comments:[
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },{
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              },
              {
                user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
                user_name:"曹振飞2",
                time:1559291454432,
                content:'askdhfasdfkasdhga;skdhgasdnjvbak;sdbkkvgbsdkjfvkaeugbfvjaskdnkjfvaskjdbgkjasdjgkvbagkjsdbvkjjabsdgv'
              }
            ]
          }
      },
      methods:{
        //在特定的标签下切换页面
        changePage(page){
          var start=(page-1)*this.page_size;
          var end=page*this.page_size;
          this.show_comments=this.total_comments.slice(start,end);
        },
        getData(){
          if(this.total_comments.length<this.page_size){
            this.show_comments=this.total_comments;
          }else{
            this.show_comments=this.total_comments.slice(0,this.page_size);
          }
        },
        addComment(){
          var comment=$(".w-e-text").html();
          $(".w-e-text").html("");
          var time=(new Date()).getTime();
          var data={
              user_photo:"https://img.hacpai.com/avatar/1533003378805_1558945542044.jpeg?imageView2/1/w/20/h/20/interlace/0/q/100",
              user_name:"当前用户",
              time:time,
              content:comment
            };
          this.total_comments.unshift(data);
          this.changePage(1);
        }
      },
      created(){
          this.getData();
      }
    }
</script>

<style scoped>
  .w-e-text-container{
    height: 700px !important;
  }
  Row{ text-align: center}
</style>
