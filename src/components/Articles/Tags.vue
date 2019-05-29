<template>
    <div style="height: 120px;background-color: #f8f8f9;padding: 10px">
      <div style="width: 50px;height: 100px;float: left;text-align: right">
        <table>
          <tr>
            <td><button :class="getClass(0,0)">全部</button></td>
          </tr>
          <tr>
            <td><button :class="getClass(1,0)">分类1</button></td>
          </tr>
          <tr>
            <td><button :class="getClass(2,0)">分类2</button></td>
          </tr>
          <tr>
            <td><button :class="getClass(3,0)">分类3</button></td>
          </tr>
        </table>
      </div>
      <Divider type="vertical" style="float: left;height: 100px"></Divider>
      <div style="height: 120px;float: left;text-align: left">
        <table>
          <tr>
            <td><button :class="getClass(0,1)">&nbsp</button></td>
          </tr>
          <tr>
            <td><button :class="getClass(1,1)">标签1</button><button :class="getClass(1,2)">标签2</button></td>
          </tr>
          <tr>
            <td><button :class="getClass(1,0)">标签1</button><button :class="getClass(1,0)">标签2</button></td>
          </tr>
          <tr>
            <td><button :class="getClass(1,0)">标签1</button><button :class="getClass(1,0)">标签2</button></td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Tags",
      data(){
          return{
            category:0,
            tag:0
          }
      },
      methods:{
          getClass(index){
            if(index==(this.category+'.'+this.tag)){
              return 'choose_button'
            }
            else{
              return 'default_button'
            }
          }
      }
    }
</script>

<style scoped>
.default_button{
  width: 50px;
  height: 20px;
  background: none;
  border: none;
  -webkit-text-fill-color: #515a6e;
  margin-bottom: 5px;
  font-size: 13px;
}

.default_button:hover{
  -webkit-text-fill-color: #e64919;
  cursor: pointer;
}

.default_button:focus{
  outline: 1px solid #e64919;
  -webkit-text-fill-color: #FFFFFF;
  background-color: rgba(230,73,25,0.5);
  font-weight: bold;
}

.choose_button{
  width: 50px;
  height: 20px;
  border: none;
  margin-bottom: 5px;
  font-size: 13px;
  outline: 1px solid #e64919;
  -webkit-text-fill-color: #FFFFFF;
  background-color: rgba(230,73,25,0.5);
  font-weight: bold;
}

  table{
    margin: 0 auto;
  }
</style>
