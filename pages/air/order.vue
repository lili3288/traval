<template>
  <div class="order">
    <!-- 机票订单确认页 -->
    <el-row :gutter="20">
      <el-col :span="14" class="left">
        <el-form :model="order" ref="ruleForm" class="demo-ruleForm">
          <!-- 乘机人信息 -->
          <div class="customer">
            <p>乘机人</p>
            <el-form-item label="乘车人类型" prop="name">
              <el-input placeholder="姓名" v-model="order.name" class="input-with-select">
                <el-select
                  v-model="order.select"
                  slot="prepend"
                  placeholder="请选择"
                  style="width:100px;"
                >
                  <el-option label="成人" value="1"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="证件类型" prop="name">
              <el-input placeholder="证件号码" v-model="order.name" class="input-with-select">
                <el-select
                  v-model="order.select"
                  slot="prepend"
                  placeholder="请选择"
                  style="width:100px;"
                >
                  <el-option label="身份证" value="1"></el-option>
                  <el-option label="护照" value="2"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </div>
          <!-- 添加乘机人 -->
          <div class="add">
            <span>添加乘机人</span>
          </div>
          <!-- 保险 -->
          <div class="safe">
            <p>保险</p>
            <el-form-item>
              <el-checkbox v-model="order.safe" label="航空意外险：￥30/份×1  最高赔付260万" border></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="order.safe" label="航空意外险：￥30/份×1  最高赔付260万" border></el-checkbox>
            </el-form-item>
          </div>
          <!-- 联系人 -->
          <div class="contact">
            <p>联系人</p>
            <el-form-item prop="username" label="姓名" label-width="80px">
              <el-input placeholder="请输入姓名" v-model="order.safe" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item prop="captcha" label="手机" label-width="80px">
              <el-input placeholder="请输入手机号码" v-model="order.safe" style="width:300px">
                <el-button slot="append">发送验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码" label-width="80px">
              <el-input v-model="order.name" style="width:300px" placeholder="请输入验证码"></el-input>
            </el-form-item>

            <el-button type="warning">提交订单</el-button>
          </div>
        </el-form>
      </el-col>
      <el-col :span="10" class="right">
        <div class="ticket">
          <el-row type="flex" class="title" justify="space-around ">
            <el-col class="left">
              <p>2019-22-22</p>
              <span>07:55</span>
              <i>首都机场</i>
            </el-col>
            <el-col class="middle">
              <span>---2时15分---</span>
              <span>东航ddd</span>
            </el-col>
            <el-col class="right">
              <p>2019-22-22</p>
              <span>07:55</span>
              <i>首都机场</i>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: []
    };
  }
};
</script>
<style lang="less" scoped>
.order {
  width: 1000px;
  margin: 0 auto;
  .left {
    .customer,
    .safe,
    .contact {
      > p {
        margin: 20px 0;
        font-size: 24px;
      }
    }
    .add {
      border-top: 1px dashed #999;
      border-bottom: 1px dashed #999;
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
      border-top: 1px dashed #999;
      border-bottom: 1px dashed #999;
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
  .right {
    .ticket {   
      margin-top: 20px;
      border: 1px solid #999;
      text-align: center;
      .title {
        padding: 15px;
        .left,.right{
          p{
            font-size: 16px;
          }
          span{
            font-size: 22px;
            display: block;
          }
          i{
            font-size: 12px;
            color: #999;
          }
        }
        .middle{
          span{
            display: block;
            color: #999;
          }
        }
      }
    }
  }
}
</style>