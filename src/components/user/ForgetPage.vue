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
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100" style="width: 400px;margin-top: 40px">
        <FormItem prop="user" label="用户名">
          <Input type="text" v-model="formInline.user" placeholder="用户名/邮箱"></Input>
        </FormItem>
        <FormItem style="text-align: right" v-if="!showTip">
          <Button type="error" @click="handleSubmit('formInline')" style="margin-left: 15px">重置密码</Button>
        </FormItem>
        <FormItem style="text-align: right" v-if="showTip">
          <span style="-webkit-text-fill-color: #19be6b">{{recommend_text}}</span><Button type="success" @click="handleClose('close')" style="margin-left: 15px">确认</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ForgetPage",
    data () {
      return {
        formInline: {
          user: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ]
        },
        window_width:window.innerWidth,
        window_height:window.innerHeight,
        showTip:false,
        recommend_text:''
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post('/server/forgetPass',{email:this.formInline.user}).then(re=>{
              if(re.data=='Success'){
                this.showTip=true
                this.recommend_text='我们已经成功重置了您的密码，请在邮箱中确认。'
              }
              else{
                this.$Message.error('抱歉，系统中暂无该用户')
              }
            })

          }
        })
      },
      handleClose(para){
        this.$emit('closeFrame',para)
      },
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
