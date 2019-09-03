<template>
  <div class="main">
    <div class="total">
      <el-row class="title" type="flex">
        <span
          v-for="(item,index) in ['登录','注册']"
          :key="index"
          @click="current=index"
          :class="{active:index===current}"
        >{{item}}</span>
      </el-row>
      <!-- 登录表单 -->
      <Login v-show="current===0"></Login>
      <Register v-show="current===1"></Register>
    </div>
  </div>
</template>

<script>
import Login from "@/components/user/loginForm";
import Register from "@/components/user/register";
export default {
  data() {
    return {
      // 当前所在位置
      current: 0
    };
  },
  components: {
    Login,
    Register
  },
  mounted() {
    console.log(this.$store.state);
  }
};
</script>

<style lang="less" scoped>
.main {
  height: 700px;
  width: 100%;
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) no-repeat;
  .total {
    position: absolute;
    top: 200px;
    left: 50%;
    margin-left: -200px;
    .title {
      span {
        width: 200px;
        height: 50px;
        background-color: #eeeeee;
        text-align: center;
        line-height: 50px;
      }
      .active {
        background-color: #fff;
        box-sizing: border-box;
        border-top: 2px solid orange;
      }
    }
  }
}
</style>