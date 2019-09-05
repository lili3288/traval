<template>
  <div class="flights">
    <el-row type="flex">
      <el-col :span="20" class="left">
        <div class="title">
          <el-row type="flex">
            <div class="adress">
              <span>单程：广州-上海/2019-02-03</span>
            </div>
            <div class="select">
              <el-select v-model="air.airport" placeholder="起飞机场" size="mini">
                <el-option
                  v-for="(item,index) in selectAir.airport"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-select v-model="air.flightTimes" placeholder="起飞时间" size="mini">
                <el-option
                  v-for="(item,index) in selectAir.flightTimes"
                  :key="index"
                  :label="item.from+':00-'+item.to+':00'"
                  :value="index"
                ></el-option>
              </el-select>
              <el-select v-model="air.company" placeholder="航空公司" size="mini">
                <el-option
                  v-for="(item,index) in selectAir.company"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-select v-model="air.volume" placeholder="机型" size="mini">
                <el-option
                  v-for="(item,index) in ['大','中','小']"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </el-row>
          <div class="cancel">
            筛选：
            <span>撤销</span>
          </div>
        </div>
        <ticket :resdata='airTicket' v-if="airTicket.length>0"></ticket>
      </el-col>
      <el-col :span="4">1</el-col>
    </el-row>
  </div>
</template>

<script>
import ticket from "@/components/air/ticket";
export default {
  data() {
    return {
      value: "",
      // 航班选项
      selectAir: [],
      air: {
        airport: "",
        flightTimes: "",
        company: "",
        volume: ""
      },
      airTicket:[]
    };
  },
  mounted() {
    let query = this.$route.query;
    this.$axios({
      url: "/airs",
      params: query
    }).then(res => {
      if (res.request.status === 200) {

        this.airTicket=res.data.flights
        console.log(this.airTicket)
        this.selectAir = res.data.options;
      }
    });
  },
  components: {
    ticket
  }
};
</script>

<style lang="less" scoped>
.flights {
  width: 1000px;
  margin: 20px auto;
  .left {
    .title {
      .cancel {
        margin: 10px 0;
        span {
          width: 56px;
          height: 25px;
          display: inline-block;
          background-color: #ecf5ff;
          text-align: center;
          line-height: 25px;
          color: #409eff;
          font-size: 12px;
          border: 1px solid #409eff;
          border-radius: 20px;
          cursor: pointer;
          &:hover {
            background-color: #409eff;
            color: #fff;
          }
        }
      }

      .adress {
        vertical-align: middle;
        width: 250px;
        span {
          font-size: 14px;
          line-height: 28px;
        }
      }
      .select {
        flex: 1;
        width: 100%;
      }
    }
  }
}
/deep/ .el-select {
  width: 115px;
}
</style>