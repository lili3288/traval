<template>
  <div>
    <!-- 头部 -->
    <div class="all">
      <div class="bar">
        <el-row type="flex" justify="space-between">
          <!-- logo部分 -->
          <div class="logo">
            <router-link to="/">
              <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
            </router-link>
          </div>
          <!-- 导航部分 -->
          <el-row class="navs" type="flex" flex="1">
            <nuxt-link to="/">首页</nuxt-link>
            <nuxt-link to="/post">旅游攻略</nuxt-link>
            <nuxt-link to="/hotel">酒店</nuxt-link>
            <nuxt-link to="/air">国内机票</nuxt-link>
          </el-row>
          <div class="new" style="margin-right:20px;">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-bell el-icon--right"></i>
                消息
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/#">消息</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- 登录注册部分 -->
          <div class="login" v-if="!$store.state.user.userInfo.token">
            <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
          </div>
          <div class="user" v-else>
            <el-dropdown>
              <span class="el-dropdown-link">
                <img
                  :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar"
                  alt
                />
                <span>{{$store.state.user.userInfo.user.nickname}}</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="width:150px;">
                <el-dropdown-item>
                  <router-link to="/user/personal">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click.native="clearToken">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    clearToken() {
      this.$confirm("是否要退出当前账号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("user/clearUserInfo");
          this.$message.success("退出账号成功");
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  mounted(){
    console.log(this.$store.state.user)
  }
};
</script>
<style lang="less" scoped>
.all {
  box-shadow: 0px 3px 0px #f5f5f5;
  border-bottom: 1px solid #ddd;
  .bar {
    width: 1000px;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
    .logo {
      margin-top: 8px;
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
    .user {
      img {
        width: 36px;
        height: 36px;
        vertical-align: middle;
      }
    }
  }
}
</style>>


