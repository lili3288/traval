<template>
  <div class="money">
    <div class="pay">
      <div class="top">
        支付总金额
        <span>&yen;{{123}}</span>
      </div>
      <div class="main">
        <div class="title">微信支付</div>
        <el-row type="flex" justify="space-between " class="payforweixin">
          <div class="weixin">123</div>
          <div class="demon">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        payInfo:{}
    };
  },
  mounted() {
    setTimeout(() => {
      // 获取付款
      let id = this.$route.query.id;
      this.$axios({
        url: "/airorders/" + id,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);
        this.payInfo=res.data
      });
    }, 10);
  }
};
</script>
<style lang="less" scoped>
.money {
  background-color: #f5f5f5;
  .pay {
    width: 1000px;
    margin: 0 auto;
    padding: 30px 0;

    // 金额
    .top {
      width: 100%;
      text-align: right;
      font-size: 16px;
      margin-bottom: 10px;
      span {
        font-size: 28px;
        color: red;
      }
    }
    .main {
      border-top: 3px solid orange;
      padding: 30px;
      background-color: #fff;
      .title {
        font-size: 28px;
      }
      .payforweixin {
        padding: 0 80px;
      }
    }
  }
}
</style>