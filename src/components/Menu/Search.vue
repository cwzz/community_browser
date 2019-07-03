<template>
    <div style="height: 30px">
      <input v-model="content" @keypress="press"></input>
      <button @click="search"><Icon type="ios-search" /> </button>
    </div>
</template>

<script>
    export default {
        name: "Search",
      mounted(){
          var key=sessionStorage.getItem("search_key")
        if(key!=null){
          this.content=key
        }
      },
      data(){
        return{
          content:''
        }
      },
      methods:{
          search(){
            if(this.content==''){
              this.$Message.error('搜索的内容不能为空')
            }
            else {
              sessionStorage.setItem('search_key',this.content)
              this.$router.push('/search')
              this.$router.go(0)
            }
          },
        press(event){
            sessionStorage.setItem("search_key",this.content)
          if(event.key=='Enter'){
            this.search()
          }
        }
      }
    }
</script>

<style scoped>
input{
  background-color: #ffffff;
  border: 1px solid #dcdee6;
  height: 30px;
  width: 85%;
  float: left;
  padding-left: 5px;
  outline: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

input:focus{
  border: 1px solid #ed4919;
}

  button{
    float: left;
    width: 15%;
    height: 30px;
    background-color: #ed4919;
    border: none;
    -webkit-text-fill-color: white;
    font-size: 15px;
    outline: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  button:hover{
    cursor: pointer;
    background-color: rgba(230,73,25,0.8);
  }
</style>
