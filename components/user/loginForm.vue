<template>
  <div class="loginForm">
    <el-form ref="form" :model="loginForm" :rules="rulelogin">
      <el-form-item prop="username">
        <el-input placeholder="用户名/手机" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" v-model="loginForm.password"></el-input>
      </el-form-item>
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
        username: "13800138000",
        password: "123456"
      },
      rulelogin: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //   点击登录
    onlogin() {
      console.log(123)
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "post",
            data: this.loginForm
          }).then(res => {
            if (res.request.status === 200) {
              this.$store.commit("user/getUserInfo", res.data);
              this.$message.success("登陆成功");
              this.$router.push({ path: "/" });
            }
          });
        } else {
          this.$message.info("请正确填写表单");
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