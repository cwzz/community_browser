<template>
  <div v-bind:style="{width:100+'%',height:window_height+'px'}" style="background:none">
    <div id="back" v-bind:style="{width: 500+'px', height:350+'px', marginTop:(window_height-350)/2+'px',marginLeft:((window_width-500)/2-window_width*0.12)+'px'}">
      <div id="close" style="float: right;text-align: center" @click="handleClose('close')">
        ×
      </div>
      <div style="width: 100%;height: 80px;margin: 10px">
        <div style="float: left;width: 25%;text-align: right">
          <img src="../../assets/logo.png" style="width: 80px">
        </div>
        <div style="float: left">
          <p style="padding-top: 50px;font-weight: bold;font-size: 18px;font-family: 楷体;padding-left: 10px">欢迎来到 <span style="font-family: 华文行楷">IPnet</span></p>
        </div>
      </div>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100" style="width: 400px">
        <FormItem prop="user" label="用户名">
          <Input type="text" v-model="formInline.user" placeholder="用户名/邮箱"></Input>
        </FormItem>
        <FormItem prop="password" label="密码">
          <Input type="password" v-model="formInline.password" placeholder="请输入您的密码"></Input>
        </FormItem>
        <FormItem style="text-align: right">
          <a class="link" @click="forget">忘记密码</a>
          <Divider type="vertical"></Divider>
          <a class="link" @click="handleClose('register')">注册用户</a>
          <Button type="error" @click="handleSubmit('formInline')" style="margin-left: 15px">登 录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "LoginPage",
      data () {
        return {
          formInline: {
            user: '',
            password: ''
          },
          ruleInline: {
            user: [
              { required: true, message: '请填写用户名', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请填写密码', trigger: 'blur' },
            ]
          },
          window_width:window.innerWidth,
          window_height:window.innerHeight
        }
      },
      methods: {
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$Message.success('Success!');
              //登录
              sessionStorage.setItem("username","asdf")
              this.handleClose()
            } else {
              this.$Message.error('用户名与密码不匹配，请重新输入');
            }
          })
        },
        handleClose(para){
          this.$emit('closeFrame',para)
        },
        forget(){
          this.$router.push('/forget')
        }
      },
      props:['close_frame']
    }
</script>

<style scoped>
#back{
  background-color: rgba(255,255,255,0.8);
  padding: 20px;
}

  #close{
    font-size: 30px;
  }
  #close:hover{
    -webkit-text-fill-color: rgb(230,73,25);
    cursor: pointer;
  }
  .link{
    -webkit-text-fill-color: #515a6e;
  }
  .link:hover{
    -webkit-text-fill-color: rgb(230,73,25);
    cursor: pointer;
  }
</style>
