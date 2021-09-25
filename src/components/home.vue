<template>
  <el-container class="home-container">
    <el-header>
      <div class="header-span">
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 一级菜单 -->
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>导航一</span>
            </template>

            <el-menu-item index="1-4-1">
              <i class="el-icon-location"></i>

              <span>导航一</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data(){
    menulist:[]
  },
  created(){
    this.getMenuList()
  },

  methods: {
    logout() { 
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有的菜单
    async getMenuList(){
      const {data : res}=await this.$http.get('menus')
      console.log(res)
      // const {baseURL :ul } =await this.$http.get('menus')
     
      // console.log(ul)
    }
  },
};
</script>

<style  scoped>
.el-header {
  width: 100%;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 20px;
}
.home-container {
  height: 100%;
}
.el-main {
  background-color: antiquewhite;
}
.header-span {
  display: flex;
  align-items: center;
}
</style>
