<template>
  <div v-bind:style="{width:100+'%',height:window_height+'px'}" style="background:none">
    <div id="back" v-bind:style="{width: 500+'px', height:350+'px', marginTop:(window_height-350)/2+'px',marginLeft:((window_width-500)/2-window_width*0.12)+'px'}">
      <div v-if="firstPage">
        <div class="close" style="float: right;text-align: center" @click="handleClose">
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
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" style="width: 400px">
          <FormItem prop="user" label="用户名">
            <Input type="text" v-model="formCustom.user" placeholder="用户名/邮箱"></Input>
          </FormItem>
          <FormItem label="密码" prop="passwd">
            <Input type="password" v-model="formCustom.passwd" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck" placeholder="请再次输入密码"></Input>
          </FormItem>
          <FormItem label="验证码">
            <Input style="width: 50%" placeholder="请输入验证码" :disabled="firstPage"></Input>
            <Button type="error" @click="getCheckCode('formCustom')" style="margin-left: 15px">获得验证码</Button>
          </FormItem>
        </Form>
      </div>
      <div v-else>
        <div class="close" style="float: right;text-align: center" @click="handleClose">
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
        <Form ref="formCustom2" :model="formCustom2" :rules="ruleCustom2" :label-width="100" style="width: 400px">
          <FormItem prop="email" label="用户名">
            <Input type="text" v-model="formCustom2.email" placeholder="用户名/邮箱" disabled ></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formCustom2.password" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem label="确认密码">
            <Input type="password" v-model="formCustom2.password" placeholder="请再次输入密码"></Input>
          </FormItem>
          <FormItem label="验证码" prop="code">
            <Input style="width: 50%" v-model="formCustom2.code" placeholder="请输入验证码" :disabled="firstPage"></Input>
            <Button type="error" @click="getCheckCode('formCustom2')" style="margin-left: 15px">获得验证码</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RegisterPage",
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('两次输入的密码不一致！'));
        } else {
          callback();
        }
      };
      return {
        formCustom: {
          passwd: '',
          passwdCheck: '',
          user:''
        },
        ruleCustom: {
          user: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { required: true, message: '请填写确认密码', trigger: 'blur' },
            { validator: validatePassCheck, trigger: 'blur' }
          ],
        },
        formCustom2: {
          password: '',
          email:'',
          code:''
        },
        ruleCustom2: {
          email: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请填写验证码', trigger: 'blur' },
          ]
        },
        window_width:window.innerWidth,
        window_height:window.innerHeight,
        firstPage:true
      }
    },
    methods: {
      getCheckCode(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post('/server/sendCode',{email:this.formCustom.user}).then(re=>{
              if(re.data=='EXIST'){
                this.$Message.error('您的邮箱已注册')
              }
              else{
                this.firstPage=false
                this.formCustom2.email=this.formCustom.user
                this.formCustom2.password=this.formCustom.passwd
                this.$Message.success('验证码已发送至您的邮箱')
              }
            })
          } else {
            this.$Message.error('您填写的信息不完整');
          }
        })
      },
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post('/server/registerBack',this.formCustom2).then(re=>{
              if(re.data='Success'){
                //登录
                sessionStorage.setItem("username",this.formCustom2.email)
                this.handleClose()
              }
              else if(re.data=='CodeError'){
                this.$Message.error('验证码错误')
                this.formCustom2.code=''
              }
              else{
                this.$Message.error('网络出现错误，请稍后重试')
              }
            })
          } else {
            this.$Message.error('您填写的信息不完整');
          }
        })
      },
      handleClose(){
        this.$emit('closeFrame','close')
      }
    },
    props:['close_frame']
  }
</script>

<style scoped>
  #back{
    background-color: rgba(255,255,255,0.8);
    padding: 20px;
    box-shadow: #dcdee2 0px 0px 5px 1px
  }

  .close{
    font-size: 30px;
  }
  .close:hover{
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
