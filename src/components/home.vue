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
      
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <!--  -->
        <div class="tog-button" @click="toggleCollapse">|||
         </div>
        
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse='iscollapse'
          :collapse-transition='false'
          router
          :default-active="activePath"
        >
          <el-submenu :index="item.id + ''" 
          v-for ="item in menulist" 
          :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconlist[item.id]" class="iconfont"></i>
              <!-- 文本 -->
              <span >{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item 
            :index=" '/'+subitem.path" 
            v-for="subitem in item.children" 
            :key='subitem.id'
            @click="pathstate('/'+subitem.path)"
            >
              <i class="el-icon-menu"></i>
              <span>{{subitem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data(){
    return{
      menulist:[],
      iconlist:{
        '125':'el-icon-user-solid',
        '103':'el-icon-takeaway-box',
        '101':'el-icon-paperclip',
        '102':'el-icon-attract',
        '145':'el-icon-school'
      },
      // 左侧菜单是否折叠
      iscollapse:false,
      // 被激活的链接地址
      activePath:''
    }
  },
  created(){
    this.getMenuList()
    this.activePath =window.sessionStorage.getItem("activePath")
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有的菜单
    async getMenuList(){
      const {data : res}=await this.$http.get('menus')
      if(res.meta.status !==200 ) return this.$message.error(res.meta.msg)
      this.menulist=res.data
      // console.log(res.data)
    },
    //点击按钮菜单栏展开与折叠
    toggleCollapse(){
      this.iscollapse = !this.iscollapse
    },
    // 保存链接的激活状态
    pathstate(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
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

.el-aside{
  background-color: #333744;
}
.el-main {
  background-image:linear-gradient(to right, #fdfbfb, #ebedee);;
}
.header-span {
  display: flex;
  align-items: center;
}

.iconfont{
  margin-right: 20px;
}
.el-menu{
  border-right: none;
}

.tog-button{
  background-color: #4a5064;
  font-size:10px;
  line-height: 24px;
  color:white;
  text-align: center;
  letter-spacing: 0.2rem;
  cursor: pointer;
  }

</style>
