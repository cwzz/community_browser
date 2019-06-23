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
            <div style="width: 120px;float: left" @click="changeAvatar">
              <div style="width: 120px;height: 120px">
                <img id="image" src="../assets/homeImg/2.jpg" style="margin-top:10px; margin-left:10px;height: 100px;width: 100px;border-radius: 50%;position:absolute; z-index: 2">
                <div id="change_avatar" style="width: 120px;height: 120px;background-color: rgba(255,255,255,0.5);position: absolute;font-size: 20px;text-align: center;padding-top: 40px;-webkit-text-fill-color: #515a6e">
                  <Icon type="md-add" size="45"/>
                </div>
              </div>
            </div>

            <div style="width: 75%;float: left;text-align: left;padding-top: 20px">
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
        formValidate: {
          nickname:'',
          email: '',
          interest: [],
          gender: '',
          birth:'',
          desc: ''
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
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
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

</style>
