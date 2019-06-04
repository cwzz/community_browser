<template>
  <div style="background-color: #FFFFFF;padding: 10px">
    <Menu ref="head"></Menu>
    <Layout>
      <Layout>
        <Sider>
          <Main ref="test"></Main>
        </Sider>
        <Layout>
          <Content :style="{padding: '80px', minHeight: '280px', background: '#fff'}">
            我的粉丝
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
        name: "UserFansPage",
      components:{Main,Menu},
      mounted(){
        this.$refs.head.active_index=4;
      },
    }
</script>

<style scoped>

</style>
