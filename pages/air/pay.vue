<template>
  <div class="money">
    <div class="pay">
      <div class="top">
        支付总金额
        <span>&nbsp;&yen; {{payInfo.price}}</span>
      </div>
      <div class="main">
        <div class="title">微信支付</div>
        <el-row type="flex" justify="space-between " class="payforweixin">
          <div class="weixin">
            <canvas id="weixinPay"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="demon">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import qrCode from "qrcode";
export default {
  data() {
    return {
      payInfo: {},
      timer:''
    };
  },
  mounted() {
    setTimeout(() => {
      // 获取付款
      let id = this.$route.query.id;
      console.log(123)
      this.$axios({
        url: "/airorders/" + id,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);
        this.payInfo = res.data;
        let url = res.data.payInfo.code_url;
        let state = document.querySelector("#weixinPay");
        qrCode.toCanvas(state, url, {
          width: 200
        });
      });
    }, 1000);
    // 查询付款状态
   this.timer=setInterval(()=>{
      this.$axios({
        url:'/airorders/checkpay',
         headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        method:'POST',
        data:{
          id:this.payInfo.id,
          nonce_str:this.payInfo.price,
          out_trade_no:this.payInfo.orderNo
        }
      }).then(res=>{
        console.log(res)
        if(res.status===200){
          if(res.data.statusTxt==='支付完成'){
            clearInterval(this.timer)
          }
        }
      })
    },3000)
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
        color: #ff4500;
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
        .weixin {
          border: 1px solid #ddd;
          padding: 20px;
          height: fit-content;
          text-align: center;
          margin: auto 0;
        }
      }
    }
  }
}
</style>