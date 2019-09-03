<template>
  <div class="register">
    <el-form ref="form" :model="registerForm" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="用户名手机" v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input placeholder="验证码" v-model="registerForm.captcha">
          <el-button slot="append" @click="getCode">发送验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input placeholder="你的名字" v-model="registerForm.nickname"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input placeholder="确认密码" v-model="checkPassword"></el-input>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-top:10px;" @click="register">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
        console.log(rule,value)
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次密码输入不一样"));
      }
    };
    return {
      // 注册表单
      registerForm: {
        username: "",
        password: "",
        nickname: "",
        captcha: ""
      },
      //   二次密码
      checkPassword: "",
      //   表单验证

      rules: {
        username: [
          { required: true, message: "请输入用户名手机", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入你的名字", trigger: "blur" }
        ],
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    getCode() {},
    //   注册
    register() {
      console.log(this.checkPassword);
    }
  }
};
</script>
<style lang="less" scoped>
.register {
  width: 350px;
  background: #fff;
  padding: inherit;
  padding: 25px;
}
</style>