<template>
    <div style="background-color: #FFFFFF;padding: 10px">
      <Menu ref="menu"></Menu>
      <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="文章标题" prop="title" style="width: 50%">
          <i-input id="title" v-model="formValidate.title" placeholder="请输入文章标题"></i-input>
        </Form-item>
        <Form-item label="文章简介" prop="description" style="width: 50%;">
          <i-input id="description" v-model="formValidate.description" placeholder="请输入文章简介"></i-input>
        </Form-item>
        <Form-item label="文章标签" prop="tag">
          <Cascader :data="tags" v-model="formValidate.tag" trigger="hover" style="width: 25%"></Cascader>
        </Form-item>
        <div id="editor" style="margin-bottom: 15px">
          <mavon-editor style="height: 100%"></mavon-editor>
        </div>
        <Form-item>
          <i-button type="primary" icon="ios-cloud-upload" style="position: relative;left: -64px;" @click="handleSubmit('formValidate')">发布帖子</i-button>
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
              tag:[]
            },
            ruleValidate: {
              title: [
                { required: true, message: '文章标题不能为空', trigger: 'blur' }
              ],
              description: [
                { required: true, message: '文章简介不能为空', trigger: 'blur' }
              ],
              tag: [
                { required:true ,type:'array',min:2, message: '请选择文章标签', trigger:'change'}
              ]
            },
            tags: [{
              value: '法律咨询',
              label: '法律咨询',
              children: [
                {
                  value: '求助/讨论',
                  label: '求助/讨论'
                },
                {
                  value: '法考/思考',
                  label: '法考/思考'
                },
                {
                  value: '备考经验',
                  label: '备考经验'
                },
                {
                  value: '政策解读',
                  label: '政策解读'
                },
                {
                  value: '相关资料',
                  label: '相关资料'
                },
                {
                  value: '会议讲座',
                  label: '会议讲座'
                },
                {
                  value: '知识产权诉讼',
                  label: '知识产权诉讼'
                },
                {
                  value: '资格证',
                  label: '资格证'
                },
                {
                  value: '学习笔记',
                  label: '学习笔记'
                },
                {
                  value: '程序与手续问题',
                  label: '程序与手续问题'
                },
                {
                  value: '其他实务',
                  label: '其他实务'
                },
              ]
            }, {
              value: '金融问题',
              label: '金融问题',
              children: [
                {
                  value: '职场经验',
                  label: '职场经验'
                },
                {
                  value: '行业探讨',
                  label: '行业探讨'
                },
                {
                  value: '行业动态',
                  label: '行业动态'
                },
                {
                  value: 'IP风险管理',
                  label: 'IP风险管理'
                },
                {
                  value: 'IP管理体系',
                  label: 'IP管理体系'
                },
                {
                  value: 'IP部门构建',
                  label: 'IP部门构建'
                },
                {
                  value: 'IP运营',
                  label: 'IP运营'
                },
                {
                  value: 'IP保护',
                  label: 'IP保护'
                },
                {
                  value: '商标版权',
                  label: '商标版权'
                },
                {
                  value: '程序与手续问题',
                  label: '程序与手续问题'
                },
                {
                  value: '机构探讨',
                  label: '机构探讨'
                },
                {
                  value: '曝光台',
                  label: '曝光台'
                },
              ],
            },{
              value: '专利方面',
              label: '专利方面',
              children: [
                {
                  value: '专利保护',
                  label: '专利保护'
                },
                {
                  value: '专利知识普及',
                  label: '专利知识普及'
                },
                {
                  value: '专利转让',
                  label: '专利转让'
                },
                {
                  value: '专利实物',
                  label: '检索分析'
                },
                {
                  value: '答辩(OA)',
                  label: '答辩(OA)'
                },
                {
                  value: '复查与无效',
                  label: '复查与无效'
                },
                {
                  value: '程序与手续问题',
                  label: '程序与手续问题'
                },
                {
                  value: '审查专业问题',
                  label: '审查专业问题'
                },
                {
                  value: '文章资料',
                  label: '文章资料'
                }
              ],
            },{
              value: '其他问题',
              label: '其他问题',
              children: [
                {
                  value: '征文活动',
                  label: '征文活动'
                },
                {
                  value: '求职招聘&兼职',
                  label: '求职招聘&兼职'
                },
                {
                  value: '求购转让',
                  label: '求购转让'
                },
                {
                  value: '公告',
                  label: '公告'
                },
                {
                  value: '问题反馈',
                  label: '问题反馈'
                },
                {
                  value: '交友',
                  label: '交友'
                },
                {
                  value: '国外资料',
                  label: '国外资料'
                },
                {
                  value: '其他IP实务',
                  label: '其他IP实务'
                },
                {
                  value: '创意设计',
                  label: '创意设计'
                }
              ],
            }],
            temp_article_id:''
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
              const msg = this.$Message.loading({
                content: '正在上传文章',
                duration: 0
              });
              let user_id=sessionStorage.getItem("username");
              this.uploadArticle(msg,user_id);
            } else {
              this.$Message.error('请将相关信息填写完整!');
            }
          })
        },
        handleReset (name) {
          this.$refs[name].resetFields();
        },
        async uploadArticle(msg,user_id){
          await this.$axios.post('/server/post/createPostID',{author:user_id}).then(re=>{
            this.temp_article_id=re.data
          });
          let imgs=$(".v-show-content").find("img");
          for(let i=0;i<imgs.length;i++){
            let fileName=this.temp_article_id+i;
            let res=await this.$axios.post('/server/post/changeBaseToUrl',{base64:imgs[i].getAttribute("src"),filename:fileName,projectID:this.temp_article_id}).catch((err) =>{
              console.log("上传图片失败");
            });
            imgs[i].setAttribute("src","http://"+res.data);
          }
          let title=this.formValidate.title;
          let description=this.formValidate.description;
          let tag=this.formValidate.tag;
          let content=$(".v-show-content").html();
          await this.$axios.post('/server/post/publishArticle',{postId:this.temp_article_id,author:user_id,postTitle:title,category:tag[0],postTag:tag[1],briefIntro:description,content:content}).catch((err) =>{
            console.log("上传文章失败");
          });
          setTimeout(msg,0);
          this.$Message.success({
            content: '上传成功',
            duration: 3,
            onClose:function(){
              this.$Message.info({
                content:'即将跳回论坛帖子',
                duration:2,
                onClose:function(){
                  window.location.href="/articles";
                }
              })
            }
          });
        },
        // async createArticleID(user_id){
        //   await this.$axios.post('/server/post/createPostID',{author:user_id}).then(re=>{
        //     this.temp_article_id=re.data
        //   });
        //   return;
        // },
        // async uploadImg(article_id){
        //   let imgs=$(".v-show-content").find("img");
        //   for(let i=0;i<imgs.length;i++){
        //     let fileName=article_id+i;
        //     let res=await this.$axios.post('/server/post/changeBaseToUrl',{base64:imgs[i].getAttribute("src"),filename:fileName,projectID:article_id}).catch((err) =>{
        //       console.log("上传图片失败");
        //     });
        //     imgs[i].setAttribute("src",res.data);
        //   }
        // },
        // async uploadArticle(article_id,user_id){
        //   let title=this.formValidate.title;
        //   let description=this.formValidate.description;
        //   let tag=this.formValidate.tag;
        //   let content=$(".v-show-content").html();
        //   await this.$axios.post('/server/post/publishArticle',{post_id:article_id,author:user_id,post_name:title,post_tag:tag,brief_intro:description,content:content}).catch((err) =>{
        //     console.log("上传文章失败");
        //   });
        //   return;
        // }
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
