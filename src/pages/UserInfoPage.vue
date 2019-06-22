<template>
  <div style="background-color: #FFFFFF;padding: 10px" v-bind:style="{minHeight:this.height+'px'}">
    <Menu ref="head"></Menu>
    <Layout>
      <Layout>
        <Sider>
          <Main ref="test"></Main>
        </Sider>
        <Layout>
          <Content :style="{paddingLeft: '80px',paddingTop:'10px', minHeight: '280px', background: '#fff'}">
            <span style="font-size: 18px;font-weight: bold;position: absolute">个人信息</span>
            <Divider style="margin-top: 35px"/>
            <div style="position: absolute">
              <img src="../assets/elephant.png" style="height: 100px;width: 100px">
              <div style="margin-left: 13px;">
                <Button @click.native="modifyPic()">修改头像</Button>
              </div>
            </div>

            <div style="width: 75%">
              <div style="margin-left: 120px;">
                <div class="text">
                  昵称：钟洁爸爸
                </div>
                <div class="text">
                  性别：女
                </div>
                <div class="text">
                  生日：1998年12月21日
                </div>
                <div class="text">
                  邮箱：779761563@qq.com
                </div>
                <div class="text">
                  简介：大家好，我是王旭、曹振飞、张萍的爸爸！
                </div>
              </div>
              <div style="margin-left: 120px">
                <Button @click.native="modifyInfo()">修改资料</Button>
              </div>
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
    name: "UserInfoPage",
    components:{Menu,Main},
    data(){
      return{
        height:''
      }
    },
    mounted(){
      this.$refs.head.active_index=4;
      this.height=window.innerHeight
    },
    methods:{
      modifyPic(){

      },
      modifyInfo(){

      },
    }
  }
</script>

<style scoped>
  button:hover{
    color: rgba(230,73,25,0.5);
    border-color: rgba(230,73,25,0.5);
  }

  .text{
    margin-bottom: 15px;
    font-size: 15px;
  }

  #app{
    height: 100%;
    position: absolute;
  }

</style>
