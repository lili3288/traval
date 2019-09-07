<template>
  <div class="index">
    <airtop></airtop>

    <el-row type="flex" class="ensure">
        <div>
          <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF"></i>
          <span>100%航协认证</span>
        </div>
        <div>
          <i class="iconfont iconbaozheng" style="color:green"></i>
          <span>出行保证</span>
        </div>
        <div>
          <i class="iconfont icondianhua"></i>
          <span>7x24小时服务</span>
        </div>
    </el-row>

    <sale></sale>
  </div>
</template>

<script>
import airtop from "@/components/air/air-top";
import sale from "@/components/air/sale";
export default {
  components: {
    airtop,sale
  }
};
</script>
<style lang="less" scoped>
.index {
  width: 1000px;
  margin: 0 auto;
  .ensure{
    height: 60px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    margin: 15px 0;
    padding: 10px 0;
    background-color: #f5f5f5;
    div{
      width: 33.333%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-right: 1px solid #ddd;
      &:nth-child(3){
        border-right: 0;
        i{
          color: #409EFF;
        }
      }
      i{
        font-size: 30px;
      }
    }
  }
}
</style>