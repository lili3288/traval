<template>
  <div class="loginForm">
    <el-form ref="form" :model="loginForm" label-width="80px">
      <el-input placeholder="用户名/手机" v-model="loginForm.username"></el-input>

      <el-input placeholder="密码" v-model="loginForm.password" style="margin:20px 0"></el-input>
    </el-form>
    <span>忘记密码</span>
    <el-button type="primary" style="width:100%" @click="onlogin">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    //   点击登录
    onlogin() {
      this.$axios({
        url: "/accounts/login",
        method: "post",
        data: this.loginForm
      }).then(res => {
        if (res.request.status === 200) {
          this.$message.success("登陆成功");
          this.$router.push({ path: "/" });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.loginForm {
  width: 350px;
  height: 180px;
  background: #fff;
  padding: inherit;
  padding: 25px;
  span {
    font-size: 12px;
    float: right;
    color: #409eff;
    margin-bottom: 5px;
  }
}
</style>