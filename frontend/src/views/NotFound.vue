<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>页面未找到</h2>
    <p>您访问的页面不存在或已被移除</p>
    <el-button type="primary" @click="goHome">返回首页</el-button>
  </div>
</template>

<script>
/**
 * 404页面组件
 */
export default {
  name: 'NotFound',
  methods: {
    /**
     * 返回首页
     */
    goHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.not-found h1 {
  font-size: 80px;
  margin-bottom: 0;
  color: #409EFF;
}

.not-found h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.not-found p {
  margin-bottom: 30px;
  color: #606266;
}
</style>
