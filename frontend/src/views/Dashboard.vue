<template>
  <el-container class="dashboard-container">
    <el-aside width="200px">
      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
      >
        <el-menu-item index="/dashboard">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/interns">
          <i class="el-icon-user"></i>
          <span>实习生管理</span>
        </el-menu-item>
        <el-menu-item index="/assessments">
          <i class="el-icon-s-order"></i>
          <span>评估管理</span>
        </el-menu-item>
        <el-menu-item index="/reports">
          <i class="el-icon-s-data"></i>
          <span>报表统计</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header>
        <div class="header-left">
          <h2>实习生评估系统</h2>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ currentUser ? currentUser.fullName : '用户' }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

/**
 * 仪表盘/主布局组件
 */
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser'
    }),
    activeMenu() {
      return this.$route.path;
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    
    /**
     * 处理下拉菜单命令
     * @param {string} command - 下拉菜单命令
     */
    handleCommand(command) {
      if (command === 'logout') {
        this.logout();
      } else if (command === 'profile') {
        this.$router.push('/profile');
      }
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  height: 100%;
}

.sidebar-menu {
  height: 100%;
  border-right: none;
}

.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
}

.header-left h2 {
  margin: 0;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-aside {
  background-color: #304156;
  color: #bfcbd9;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>
