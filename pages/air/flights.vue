<template>
  <div class="flights">
    <el-row type="flex" :gutter="20">
      <el-col :span="18" class="left">
        <div class="title">
          <el-row type="flex">
            <div class="adress">
              <span>单程：{{query.departCity+' - '+query.destCity+'/'+query.departDate}}</span>
            </div>
            <div class="select">
              <el-select
                v-model="air.airport"
                placeholder="起飞机场"
                size="mini"
                @change="selectCompany"
              >
                <el-option
                  v-for="(item,index) in selectAir.airport"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-select
                v-model="air.flightTimes"
                placeholder="起飞时间"
                size="mini"
                @change="selectCompany"
              >
                <el-option
                  v-for="(item,index) in selectAir.flightTimes"
                  :key="index"
                  :label="item.from+':00-'+item.to+':00'"
                  :value="item.from+','+item.to"
                ></el-option>
              </el-select>
              <el-select
                v-model="air.company"
                placeholder="航空公司"
                size="mini"
                @change="selectCompany"
              >
                <el-option
                  v-for="(item,index) in selectAir.company"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-select v-model="air.volume" placeholder="机型" size="mini" @change="selectCompany">
                <el-option
                  v-for="(item,index) in [{value:'大',
                  size:'L'},{value:'中', size:'M'},{value:'小', size:'S'}]"
                  :key="index"
                  :label="item.value"
                  :value="item.size"
                ></el-option>
              </el-select>
            </div>
          </el-row>
          <div class="cancel">
            筛选：
            <span @click="clearSelect">撤销</span>
          </div>
        </div>
        <ticket :resdata="sonlist" v-if="sonlist.length>0"></ticket>
      </el-col>
      <el-col :span="6">
        <!-- 保障和历史记录 -->
        <div class="promise">
          <el-row type="flex" justify="space-around" class="demon">
            <div class="iconThres">
              <i class="iconfont iconweibiaoti-_huabanfuben"></i>
              <span>航协认证</span>
            </div>
            <div class="iconThres">
              <i class="iconfont iconbaozheng"></i>
              <span>出行保证</span>
            </div>
            <div class="iconThres">
              <i class="iconfont icondianhua"></i>
              <span>7x24</span>
            </div>
          </el-row>
          <span>免费客服电话：4006345678转2</span>
        </div>
        <div class="history">
          <div class="title">
            <span>历史查询</span>
          </div>
          <div class="content">
            <el-row
              type="flex"
              class="content-list"
              v-for="(item,index) in $store.state.air.cityInfo"
              :key="index"
            >
              <el-col :span="18" class="adress">
                <p>{{item.departCity+' - '+item.destCity}}</p>
                <span>{{item.departDate}}</span>
              </el-col>
              <el-col :span="6" class="select">
                <nuxt-link
                  :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
                >
                  <span>选择</span>
                </nuxt-link>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
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
      // 机票列表
      airTicket: [],
      // 传递给列表组件的数据
      sonlist: [],
      query: [],
      // 历史记录
      cityInfo: []
    };
  },
  mounted() {
    this.cityInfo = [...this.$store.state.air.cityInfo];
    this.init();
  },
  watch: {
    $route() {
      this.init();
    }
  },
  components: {
    ticket
  },
  methods: {
    init() {
      this.query = this.$route.query;
      this.$axios({
        url: "/airs",
        params: this.query
      }).then(res => {
        if (res.request.status === 200) {
          this.airTicket = res.data.flights;
          this.selectAir = res.data.options;
          this.sonlist = res.data.flights;
        }
      });
    },
    // 筛选机场

    // 筛选航空公司
    selectCompany() {
      const { airport, flightTimes, company, volume } = this.air;
      const [from, to] = flightTimes.split(",");
      let arr = [];
      this.airTicket.forEach(e => {
        if (e.airline_name === company || company === "") {
          if (e.org_airport_name === airport || airport === "") {
            if (e.plane_size === volume || volume === "") {
              const current = e.dep_time.split(":")[0];
              if ((+from <= current && current < +to) || flightTimes === "") {
                arr.push(e);
              }
            }
          }
        }
      });
      this.sonlist = arr;
    },
    // 清空筛选
    clearSelect() {
      this.air = {
        airport: "",
        flightTimes: "",
        company: "",
        volume: ""
      };
      this.sonlist = this.airTicket;
    }
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
  .promise {
    border: 1px solid #eee;

    .demon {
      padding: 10px 0;
      .iconThres {
        flex: 1;

        text-align: center;
        i {
          width: 40px;
          height: 42px;
          display: block;
          font-size: 40px;
          color: #409eff;
          margin: 0 auto;
        }
        &:nth-child(2) {
          i {
            color: green;
          }
        }
        span {
          font-size: 12px;
        }
      }
    }

    > span {
      width: 100%;
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      box-sizing: border-box;
      display: block;
      font-size: 14px;
      background-color: #f6f6f6;
    }
  }
  .history {
    margin-top: 10px;
    border: 1px solid #eee;
    padding: 0 10px;
    align-items: center;
    .title {
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      font-size: 16px;
    }
    .content {
      .content-list {
        padding: 10px 0;
        align-items: center;
        .adress {
          p {
            font-size: 14px;
          }
          span {
            font-size: 12px;
            color: #666;
          }
        }
        .select {
          span {
            border-radius: 5px;
            display: block;
            width: 45px;
            height: 20px;
            font-size: 12px;
            text-align: center;
            line-height: 20px;
            background-color: orange;
            color: #fff;
          }
        }
      }
    }
  }
}
/deep/ .el-select {
  width: 115px;
}
</style>