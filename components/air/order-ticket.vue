<template>
  <div class="ticket">
    <el-row type="flex" class="title" justify="space-around ">
      <el-col class="left">
        <p>{{ticketInfo.dep_date}}</p>
        <span>{{ticketInfo.dep_time}}</span>
        <i>{{ticketInfo.org_airport_name}}</i>
      </el-col>
      <el-col class="middle">
        <span>---{{ticketInfo|time}}---</span>
        <span>{{ticketInfo.airline_name+' '+ticketInfo.flight_no}}</span>
      </el-col>
      <el-col class="right">
        <p>{{ticketInfo.arr_date}}</p>
        <span>{{ticketInfo.arr_time}}</span>
        <i>{{ticketInfo.dst_airport_name}}</i>
      </el-col>
    </el-row>
    <div class="ticInfo">
      <el-row type="flex" justify="space-between ">
        <span>订单总价</span>
        <span>金额</span>
        <span>数量</span>
      </el-row>
      <el-row type="flex" justify="space-between ">
        <span>成人机票</span>
        <span>&yen;{{ticketInfo.seat_infos.settle_price}}</span>
        <span>x1</span>
      </el-row>
      <el-row type="flex" justify="space-between ">
        <span>机建+燃油</span>
        <span>&yen;{{ticketInfo.airport_tax_audlet}}/人/单程</span>
        <span>x1</span>
      </el-row>
      <el-row type="flex" justify="space-between " class="pay">
        <span>应付总额</span>
        <span>&yen;{{$store.state.air.totalPrice}}</span>
      </el-row>
    </div>
    
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.ticketInfo = this.$store.state.air.orderInfo;
    }, 10);
  },
  data() {
    return {
      // 机票详情
      ticketInfo: { seat_infos: [] }
    };
  },
  filters: {
    time(data) {
      let time1 = new Date(data.arr_datetime).getTime();
      let time2 = new Date(data.dep_datetime).getTime();
      let time = (time1 - time2) / 1000 / 60;
      let minute = time % 60;
      let hour = Math.floor(time / 60);
      return hour + "时" + minute + "分";
    }
  }
};
</script>

<style lang="less" scoped>
.ticket {
  margin-top: 20px;
  border: 1px solid #999;
  text-align: center;
  .title {
    padding: 15px;
    .left,
    .right {
      p {
        font-size: 16px;
      }
      span {
        font-size: 22px;
        display: block;
      }
      i {
        font-size: 12px;
        color: #999;
      }
    }
    .middle {
      span {
        display: block;
        color: #999;
      }
    }
  }
  // /deep/ .el-table th {
  //   text-align: center;
  // }
}
// 订单金额
.ticInfo {
  text-align: left;
  .el-row {
    padding: 10px 15px;
    border-top: 1px dashed #666;
  }
  .pay {
    height: 60px;
    line-height: 40px;
    span {
      &:nth-child(2) {
        color: orange;
        font-size: 28px;
      }
    }
  }
}
</style>