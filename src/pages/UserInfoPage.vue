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
            <div style="width: 100%;float: left;text-align: left;padding-top: 20px;">
              <div v-if="isEdit" style="width:80%;margin-left:7%;padding-left: 30px;padding-right:50px;padding-bottom:10px;box-shadow: none">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                  <FormItem label="E-mail" prop="email">
                    <Input v-model="formValidate.email" placeholder="请输入您的电子邮箱" disabled></Input>
                  </FormItem>
                  <FormItem label="昵称" prop="nickname">
                    <Input v-model="formValidate.nickname" placeholder="请输入您的昵称"></Input>
                  </FormItem>
                  <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                      <Radio label="男">男</Radio>
                      <Radio label="女">女</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem label="出生日期" prop="birth">
                    <DatePicker type="date" placeholder="请选择您的出生日期" v-model="formValidate.birth"></DatePicker>
                  </FormItem>
                  <FormItem label="兴趣标签" prop="interest">
                    <CheckboxGroup v-model="formValidate.interest">
                      <Checkbox label="法律咨询"></Checkbox>
                      <Checkbox label="金融问题"></Checkbox>
                      <Checkbox label="专利方面"></Checkbox>
                      <Checkbox label="其他问题"></Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                  <FormItem label="个人简介" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="您可以在这里补充您的个人简介..."></Input>
                  </FormItem>
                  <FormItem style="text-align: right">
                    <Button type="error" @click="handleSubmit('formValidate')">修改完成</Button>
                  </FormItem>
                </Form>
              </div>
              <div v-if="!isEdit">
                <div class="back" style="height: 120px">
                  <div style="width: 70%;float: left;padding-left: 3%;padding-right: 3%;">
                    <table id="info1">
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
                  </div>
                  <div style="width: 120px;float: left" @click="changeAvatar">
                    <div style="width: 120px;height: 120px">
                      <img id="image" src="../assets/homeImg/3.jpg" style="margin-top:10px; margin-left:10px;height: 100px;width: 100px;border-radius: 50%;position:absolute; z-index: 2">
                      <div id="change_avatar" style="width: 120px;height: 120px;background-color: rgba(255,255,255,0.5);position: absolute;font-size: 20px;text-align: center;padding-top: 40px;-webkit-text-fill-color: #515a6e">
                        <Icon type="md-add" size="45"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="width: 80%;height: 2px;background-color: #f8f8f9;margin-left: 7%;margin-bottom: 20px"></div>
                <div class="back">
                  <div style="padding-left: 3%;padding-right: 3%;">
                    <table class="info2">
                      <tr>
                        <div>出生日期：</div>
                        <td>{{formValidate.birth}}</td>
                      </tr>
                      <tr>
                        <div>兴趣标签：</div>
                        <td>{{formValidate.interest.toString()}}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div style="width: 80%;height: 2px;background-color: #f8f8f9;margin-left: 7%;margin-bottom: 20px"></div>
                <div class="back" style="min-height: 120px">
                  <div style="padding-left: 3%;padding-right: 3%;">
                    <table class="info2">
                      <tr>
                        <div>个人简介：</div>
                        <td style="vertical-align: top">{{formValidate.desc}}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <Button type="error" style="float: right;margin-right: 13%" @click="changeEdit()">编辑资料</Button>
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
        height:'',
        isEdit:false,
        formValidate: {
          nickname:'王旭爸爸',
          email: 'wx8339459@163.com',
          interest: ['法律咨询'],
          gender: '男',
          birth:'1998-02-01',
          desc: '王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸王旭爸爸'
        },
        ruleValidate: {
          nickname: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
            { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
          ],
          city: [
            { required: true, message: 'Please select the city', trigger: 'change' }
          ],
        }
      }
    },
    mounted(){
      this.$refs.head.active_index=4;
      this.height=window.innerHeight
    },
    methods:{
      changeAvatar(){

      },
      modifyPic(){

      },
      modifyInfo(){

      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            this.isEdit=false
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      changeEdit(){
        this.isEdit=true
      }
    }
  }
</script>

<style scoped>
  #change_avatar:hover{
    z-index: 3;
    cursor: pointer;
  }


  .text{
    margin-bottom: 15px;
    font-size: 15px;
  }

  #app{
    height: 100%;
    position: absolute;
  }

  #info1{
    font-size: 15px;
    -webkit-text-fill-color: #515a6e;
  }

  #info1 tr div{
    width: 80px;
    text-align: right;
    padding-top: 8px;
    padding-bottom: 8px;
    -webkit-text-fill-color: #515a6e;
    font-weight: bold;
  }

  #info1 td{
    max-width: 300px;
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
    margin-left: 7%;
    margin-right: 13%;
  }
</style>
