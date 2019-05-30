<template>
    <div style="background-color: #FFFFFF;padding: 10px">
      <Menu ref="menu"></Menu>
      <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="文章标题" prop="title" style="width: 50%">
          <i-input :value.sync="formValidate.title" placeholder="请输入文章标题"></i-input>
        </Form-item>
        <Form-item label="文章简介" prop="description" style="width: 50%;">
          <i-input :value.sync="formValidate.description" placeholder="请输入文章简介"></i-input>
        </Form-item>
        <Form-item label="文章标签" prop="tag">
          <Cascader :data="tags" :value.sync="formValidate.tag" trigger="hover" style="width: 25%"></Cascader>
        </Form-item>
        <div id="editor" style="margin-bottom: 15px">
          <mavon-editor style="height: 100%"></mavon-editor>
        </div>
        <Form-item>
          <i-button type="primary" style="position: relative;left: -64px;" @click="handleSubmit('formValidate')">发布帖子</i-button>
        </Form-item>
      </i-form>
    </div>
</template>

<script>
  import Menu from '../components/Menu/Menu'
  // import Editorbar from "../components/wangeditor/wangeditor";
  var mavonEditor = require('mavon-editor');
  import 'mavon-editor/dist/css/index.css'
    export default {
        name: "PublishPage",
      data(){
          return{
            formValidate: {
              title: '',
              description: '',
              tag:''
            },
            ruleValidate: {
              title: [
                { required: true, message: '文章标题不能为空', trigger: 'blur' }
              ],
              description: [
                { required: true, message: '文章简介不能为空', trigger: 'blur' }
              ],
              tag: [
                { required:true , message: '请选择文章标签', trigger:'blur'}
              ]
            },
            tags: [{
              value: 'beijing',
              label: '北京',
              children: [
                {
                  value: 'gugong',
                  label: '故宫'
                },
                {
                  value: 'tiantan',
                  label: '天坛'
                },
                {
                  value: 'wangfujing',
                  label: '王府井'
                }
              ]
            }, {
              value: 'jiangsu',
              label: '江苏',
              children: [
                {
                  value: 'nanjing',
                  label: '南京',
                  children: [
                    {
                      value: 'fuzimiao',
                      label: '夫子庙',
                    }
                  ]
                },
                {
                  value: 'suzhou',
                  label: '苏州',
                  children: [
                    {
                      value: 'zhuozhengyuan',
                      label: '拙政园',
                    },
                    {
                      value: 'shizilin',
                      label: '狮子林',
                    }
                  ]
                }
              ],
            }]
          }
      },
      created(){

      },
      components:{
        Menu,
        'mavon-editor': mavonEditor.mavonEditor
      },
      mounted(){
        this.$refs.menu.active_index=3
      },
      methods: {
        save(res) {
          console.log(res);
        },
        handleSubmit (name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$Message.success('文章发布成功!');
            } else {
              this.$Message.error('请将相关信息填写完整!');
            }
          })
        },
        handleReset (name) {
          this.$refs[name].resetFields();
        }
      }
    }
</script>

<style>
  #editor {
    margin: auto;
    width: 97%;
    height: 364px;
  }
  .ivu-select-dropdown{
    z-index: 9999;
  }
</style>
