<template>
  <div class="order">
    <!-- 机票订单确认页 -->
    <el-row :gutter="20">
      <el-col :span="16" class="left">
        <orderform />
      </el-col>
      <el-col :span="8" class="right">
        <orderticket :info="ticketInfo" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import orderform from "@/components/air/order-form";
import orderticket from "@/components/air/order-ticket";
export default {
  data() {
    return {
      // 机票详情
      ticketInfo: { seat_infos: [] }
    };
  },
  components: {
    orderform,
    orderticket
  },
  mounted() {}
  // filters: {
  //
  // }
};
</script>
<style lang="less" scoped>
.order {
  width: 1000px;
  margin: 0 auto;
}
</style>