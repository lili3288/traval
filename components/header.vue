<template>
  <div>
    <!-- 头部 -->
    <div class="bar">
      <el-row type="flex" justify="space-between">
        <!-- logo部分 -->
        <div class="logo">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </div>
        <!-- 导航部分 -->
        <el-row class="navs" type="flex" flex="1">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </el-row>
        <!-- 登录注册部分 -->
        <div class="login">
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
        </div>
      </el-row>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bar {
  width: 1000px;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid skyblue;
  .logo {
    margin-top:8px;
    img {
      height: 42px;
    }
  }
  .navs {
    flex: 1;
    margin-left: 20px;
    a {
      display: block;
      height: 60px;
      padding: 0 20px;
      box-sizing: border-box;
      &:hover {
        color: #409eff;
        border-bottom: 5px solid #409eff;
      }
    }
    .nuxt-link-exact-active {
      color: #fff;
      background-color: #409eff;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>>


