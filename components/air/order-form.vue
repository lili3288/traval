<template>
  <div class="left">
    <el-form :model="order" ref="ruleForm" class="demo-ruleForm">
      <!-- 乘机人信息 -->
      <div class="plane">乘机人</div>
      <div class="customer" v-for="(item,index) in users" :key="index">
        <div class="delete" @click="delCustomer(index)">
          <i class="el-icon-remove"></i>
        </div>

        <el-form-item label="乘车人类型" prop="name">
          <el-input placeholder="姓名" v-model="item.username" class="input-with-select">
            <el-select v-model="order.select" slot="prepend" placeholder="请选择" style="width:100px;">
              <el-option label="成人" value="1"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="name">
          <el-input placeholder="证件号码" v-model="item.id" class="input-with-select">
            <el-select v-model="order.select" slot="prepend" placeholder="请选择" style="width:100px;">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </div>
      <!-- 添加乘机人 -->
      <div class="add" @click="addCustomer">
        <span>添加乘机人</span>
      </div>
      <!-- 保险 -->
      <div class="safe">
        <p>保险</p>
        <el-form-item v-for="(item,index) in ticketInfo.insurances" :key="index">
          <el-checkbox
            border
            @change="hadleinsurances(item.id)"
          >{{item.type}}：￥{{item.price}}/份×1 最高赔付{{item.compensation|yen}}</el-checkbox>
        </el-form-item>
      </div>
      <!-- 联系人 -->
      <div class="contact">
        <p>联系人</p>
        <el-form-item prop="username" label="姓名" label-width="80px">
          <el-input placeholder="请输入姓名" v-model="contactName" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item prop="captcha" label="手机" label-width="80px">
          <el-input placeholder="请输入手机号码" v-model="contactPhone" style="width:300px">
            <el-button slot="append" @click="getCode">发送验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" label-width="80px">
          <el-input v-model="captcha" style="width:300px" placeholder="请输入验证码"></el-input>
        </el-form-item>

        <el-button type="warning" @click="comfirmOrder">提交订单</el-button>
      </div>
    </el-form>
    <!-- 引用激活计算总价格 -->
    <div>{{allprice}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: { name: "" },

      // 机票详情
      ticketInfo: [],

      //   乘客
      users: [{ username: "", id: "" }],
      //   保险
      insurances: [],
      // 联系人
      contactName: "",
      // 联系人电话
      contactPhone: "",
      // 验证码
      captcha: "",
      // 是否需要发票
      invoice: false,
      seat_xid: "",
      air: "",
      alllprice: 0
    };
  },
  computed: {
    allprice() {
      console.log(123);
      if (!this.ticketInfo.seat_infos) {
        return 0;
      }
      let price = 0;
      // 燃油加机票
      price =
        this.ticketInfo.airport_tax_audlet +
        this.ticketInfo.seat_infos.org_settle_price +
        this.insurances.length * 30;
      // // 计算几个乘客
      price *= this.users.length;
      this.$store.commit("air/getTotalPrice", price);
      return price;
    }
  },
  mounted() {
    // 获取机票信息
    // console.log(123)
    let query = this.$route.query;
    this.$axios({
      url: `/airs/${query.id}`,
      params: { seat_xid: query.seat_xid }
    }).then(res => {
      // console.log('详情', res.data);
      if (res.request.status === 200) {
        this.ticketInfo = res.data;
        this.$store.commit("air/getOrderInfo", res.data);
        console.log(this.ticketInfo);
      }
    });
  },
  filters: {
    yen(val) {
      if (val.indexOf("万") === -1) {
        return val + "元";
      } else {
        return val;
      }
    }
  },
  methods: {
    // 添加乘机人输入
    addCustomer() {
      this.users.push({ name: "", code: "" });
    },
    // 移除乘机人输入
    delCustomer(index) {
      this.users.splice(index, 1);
    },
    // 选择保险
    hadleinsurances(id) {
      if (this.insurances.indexOf(id) > -1) {
        this.insurances.splice(this.insurances.indexOf(id), 1);
      } else {
        this.insurances.push(id);
      }
    },
    // 获取手机验证码
    getCode() {
      if (this.contactPhone === "") {
        this.$message.warning("联系人电话不能为空");
        return;
      }
      console.log(this.contactPhone);
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.contactPhone }
      }).then(res => {
        console.log(res);
        if (res.request.status === 200) {
          this.$message.success("手机验证码:" + res.data.code);
        }
      });
    },
    comfirmOrder() {
      let fn = 0;
      this.users.forEach(e => {
        if (e.username === "") {
          this.$message.warning("乘机人姓名不能为空");
          fn = 1;
          return;
        } else if (e.id === "") {
          this.$message.warning("证件号不能为空");
          fn = 1;
          return;
        }
      });
      if (fn === 1) {
        return;
      }

      if (this.contactName === "") {
        this.$message.warning("联系人姓名不能为空");
        return;
      }
      if (this.contactPhone === "") {
        this.$message.warning("联系人电话不能为空");
        return;
      }
      if (this.captcha === "") {
        this.$message.warning("验证码不能为空");
        return;
      }
      // 获取座位id和飞机id
      let query = this.$route.query;
      let seat_xid = query.seat_xid;
      let air = query.id;
      let token = this.$store.state.user.userInfo.token;
      this.$axios({
        url: "/airorders",
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        data: {
          users: this.users,
          insurances: this.insurances,
          contactName: this.contactName,
          contactPhone: this.contactPhone,
          invoice: false,
          seat_xid,
          air,
          captcha: this.captcha
        }
      }).then(res => {
        if (res.request.status === 200) {
          this.$message.success(res.data.message);
          console.log(res.data.id);
          this.$router.push({
            path: "/air/pay",
            query: { id: res.data.id }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.left {
  .plane {
    margin: 20px 0;
    font-size: 24px;
  }

  .safe,
  .contact {
    > p {
      margin: 20px 0;
      font-size: 24px;
    }
  }

  .customer {
    position: relative;
    border-bottom: 1px dashed #eee;
    padding-right: 20px;
    .delete {
      display: block;
      width: 16px;
      height: 16px;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -8px;
    }
    &:first-child {
      .delete {
        display: none;
        font-size: 60px;
      }
    }
  }

  .add {
    border-bottom: 1px dashed #eee;
    padding: 20px 0;
    > span {
      width: 110px;
      height: 40px;
      display: block;
      background-color: #409eff;
      color: #fff;
      font-size: 14px;
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
    }
  }
  .contact {
    border-top: 1px dashed #eee;
    border-bottom: 1px dashed #eee;
    margin-bottom: 40px;
    > button {
      display: block;
      width: 200px;
      height: 50px;
      font-size: 16px;
      margin: 20px auto 50px;
    }
  }
}
</style>