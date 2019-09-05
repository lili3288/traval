<template>
  <div class="flights">
    <el-row type="flex" :gutter="20">
      <el-col :span="18" class="left">
        <div class="title">
          <el-row type="flex">
            <div class="adress">
              <span>单程：广州-上海/2019-02-03</span>
              <!-- <span>{{airTicket.infos.departCity}}</span> -->
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
        <ticket :resdata="airTicket" v-if="airTicket.length>0"></ticket>
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
           <el-row type="flex" class="content-list">
             <el-col :span="18" class="adress">
               <p>广州 - 北京</p>
               <span>2019-02-12</span>
             </el-col>
             <el-col :span="6" class="select">
               <span>选择</span>
             </el-col>
           </el-row>
           <el-row type="flex" class="content-list">
             <el-col :span="18" class="adress">
               <p>广州 - 北京</p>
               <span>2019-02-12</span>
             </el-col>
             <el-col :span="6" class="select">
               <span>选择</span>
             </el-col>
           </el-row>
           <el-row type="flex" class="content-list">
             <el-col :span="18" class="adress">
               <p>广州 - 北京</p>
               <span>2019-02-12</span>
             </el-col>
             <el-col :span="6" class="select">
               <span>选择</span>
             </el-col>
           </el-row>
           <el-row type="flex" class="content-list">
             <el-col :span="18" class="adress">
               <p>广州 - 北京</p>
               <span>2019-02-12</span>
             </el-col>
             <el-col :span="6" class="select">
               <span>选择</span>
             </el-col>
           </el-row>
           <el-row type="flex" class="content-list">
             <el-col :span="18" class="adress">
               <p>广州 - 北京</p>
               <span>2019-02-12</span>
             </el-col>
             <el-col :span="6" class="select">
               <span>选择</span>
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
      airTicket: []
    };
  },
  mounted() {
    let query = this.$route.query;
    this.$axios({
      url: "/airs",
      params: query
    }).then(res => {
      console.log(res);
      if (res.request.status === 200) {
        this.airTicket = res.data.flights;
        console.log(123, this.airTicket);
        console.log(this.airTicket.flights.length, 123);
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
  .history{
    margin-top: 10px;
    border: 1px solid #eee;
    padding: 0 10px;
    align-items: center;
    .title{
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      font-size: 16px;
    }
    .content{
      .content-list{
        padding: 10px 0;
           align-items: center;
        .adress{
          p{
            font-size: 14px;
          }
          span{
            font-size: 12px;
            color: #666;
          }
        }
        .select{
             
          span{
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