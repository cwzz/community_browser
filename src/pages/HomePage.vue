<template>
    <div style="background-color: #FFFFFF;padding: 10px">
      <Menu ref="menu"></Menu>
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
      <div style="">
        <Card class="card">
          <p slot="title" class="class-title">
            法律咨询
          </p>
          <Row>
            <Col span="6">
              <Icon custom="iconfont i-icon-law icon"></Icon>
            </Col>
            <Col span="18" style="padding-top: 40px;">
              <Tag class="tag-class" type="border" v-for="tag in tags" @click="chooseArticle(tag)">{{tag}}<br></Tag>
            </Col>
          </Row>
        </Card>

        <Card class="card">
          <p slot="title" class="class-title">
            金融问题
          </p>
          <Row>
            <Col span="6">
              <Icon custom="iconfont i-icon-eco icon"></Icon>
            </Col>
            <Col span="18" style="padding-top: 40px;">
              <Tag class="tag-class" type="border" v-for="tag in tags" @click="chooseArticle(tag)">{{tag}}</Tag>
            </Col>
          </Row>
        </Card>

        <Card class="card">
          <p slot="title" class="class-title">
            专利方面
          </p>
          <Row>
            <Col span="6">
              <Icon custom="iconfont i-icon-patent icon"></Icon>
            </Col>
            <Col span="18" style="padding-top: 40px;">
              <Tag class="tag-class" type="border" v-for="tag in tags" @click="chooseArticle(tag)">{{tag}}</Tag>
            </Col>
          </Row>
        </Card>

        <Card class="card">
          <p slot="title" class="class-title">
            其他问题
          </p>
          <Row>
            <Col span="6">
              <Icon custom="iconfont i-icon-other icon"></Icon>
            </Col>
            <Col span="18" style="padding-top: 40px;">
              <Tag class="tag-class" type="border" v-for="tag in tags" @click="chooseArticle(tag)">{{tag}}</Tag>
            </Col>
          </Row>
        </Card>

      </div>
    </div>

</template>

<script>
  import Menu from '../components/Menu/Menu'
  export default {
    name: "HomePage",
    components:{Menu},
    mounted(){
      this.$refs.menu.active_index=1
    },
    data(){
      return{
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
            author:'最热'
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
            author:'啦啦啦'
          },
          {
            index:6,
            title:'有免费可靠的的法律咨询处吗？',
            author:'燕小六'
          },
          {
            index:7,
            title:'帮我照顾好我七舅老爷和他三外甥女',
            author:'佟湘玉'
          },
          {
            index:8,
            title:'专利权收到侵犯时首先应该怎么做？',
            author:'白展堂'
          }
        ],
        newest:[
          {
            index:1,
            title:'专利交易中最应该注意的问题是什么',
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
            author:'啦啦啦'
          },
          {
            index:6,
            title:'有免费可靠的的法律咨询处吗？',
            author:'燕小六'
          },
          {
            index:7,
            title:'帮我照顾好我七舅老爷和他三外甥女',
            author:'佟湘玉'
          },
          {
            index:8,
            title:'专利权收到侵犯时首先应该怎么做？',
            author:'白展堂'
          }
        ],
        answer:[
          {
            index:1,
            title:'专利交易中最应该注意的问题是什么',
            author:'回复'
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
            author:'啦啦啦'
          },
          {
            index:6,
            title:'有免费可靠的的法律咨询处吗？',
            author:'燕小六'
          },
          {
            index:7,
            title:'帮我照顾好我七舅老爷和他三外甥女',
            author:'佟湘玉'
          },
          {
            index:8,
            title:'专利权收到侵犯时首先应该怎么做？',
            author:'白展堂'
          }
        ],
        tags:[
          '标签1','标签13','标签14','标签15','标签16','标签17','标签18'
        ]
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

      }
    }

  }
</script>

<style scoped>
  .tag-class{
    font-size: 15px;
    width: 70px;
    margin-right: 15px;
    text-align: center;
    /*color: red;*/
  }
  .tag-class:hover{
    border-color: #e64929;
    color: #e64929;
  }
  .icon{
    margin-top: 15px;
    /*color: #e64929;*/
  }
  .card{
    margin-bottom: 20px;
    height: 235px;
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
