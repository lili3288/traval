<template>
  <div class="register">
    <el-form ref="form" :model="registerForm" :rules="rulerest">
      <el-form-item prop="username">
        <el-input placeholder="用户名手机" v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input placeholder="验证码" v-model="registerForm.captcha">
          <el-button slot="append" @click.native="getCode">发送验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input placeholder="你的名字" v-model="registerForm.nickname"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input placeholder="确认密码" v-model="registerForm.checkPassword"></el-input>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-top:10px;" @click="register">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      // 注册表单
      registerForm: {
        username: "",
        password: "",
        nickname: "",
        captcha: "",
        checkPassword: ""
      },

      //   表单验证

      rulerest: {
        username: [
          { required: true, message: "请输入用户名手机", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入你的名字", trigger: "blur" }
        ],
        checkPassword: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    getCode() {
      if(!this.registerForm.username){
        this.$message.info('请输入手机号')
        return
      }
      this.$axios({
        url:'/captchas',
        method:'post',
        data:{
          tel:this.registerForm.username
        }
      }).then(res=>{
        console.log(res)
        this.$message.success('模拟获取验证码'+res.data.code)
      })
    },
    //   注册
    register() {
       this.$refs.form.validate((valid) =>{
         if(valid){
           const {checkPassword , ...rest} =this.registerForm
           this.$axios({
             url:'/accounts/register',
             method:'post',
             data:rest
           }).then(res=>{
             console.log(res)
             if(res.request.status===200){
               this.$message.success('注册成功')
               this.$store.commit('user/getUserInfo',res.data)
               this.$router.push('/')
             }
           })
         }
       })
      console.log(this.registerForm);
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