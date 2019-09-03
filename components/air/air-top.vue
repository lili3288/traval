<template>
  <div class="top">
    <div class="title">
      <i class="iconfont iconfeiji"></i>
      <span>国内机票</span>
    </div>
    <div class="main clearfix" >
      <!-- 选择出发地 -->
      <el-col :gutter="20">
        <el-col :span="8">
          <div class="adress">
            <!-- 导航 -->
            <el-row type="flex" class="adress-top">
              <span v-for="(item,index) in ['单程','往返']" :key="index">{{item}}</span>
            </el-row>
            <!-- 选择出发和目的地 -->
            <el-form :model="tikect" ref="ruleForm" label-width="80px" class="demo-ruleForm tikect">
              <!-- 切换地点 -->
              <div class="changeAdress" @click="changeAdress">
                <span>换</span>
              </div>
              <el-form-item label="出发城市" prop="name">
                <el-autocomplete
                  v-model="tikect.departCity"
                  :fetch-suggestions="querySearch"
                  placeholder="请搜索出发城市"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="到达城市" prop="name">
                <el-input v-model="tikect.arrive" placeholder="请搜索到达城市"></el-input>
              </el-form-item>
              <el-form-item label="出发时间" prop="name">
                <el-date-picker
                  v-model="tikect.date"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00"
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width:100%" @click="searchTicket">
                  <i class="el-icon-search" style="margin-right:5px"></i>搜索
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="16" style="height:350px;">
          <div class="advert">
            <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
          </div>
        </el-col>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tikect: {
        departCity: "",
        arrive: "",
        date: ""
      }
    };
  },
  methods: {
    //   选择未完成
    querySearch(value, cb) {
      var arr = [{ value: "广州" }, { value: "北京" }, { value: "上海" }];
      let city = [];
      arr.forEach(e => {
        if (e.value.indexOf(value) !== -1) {
          city.push(e.value);
        }
      });
      console.log(city);
      cb(city);
    },
    // 切换出发到达城市
    changeAdress() {
      const other = this.tikect.departCity;
      this.tikect.departCity = this.tikect.arrive;
      this.tikect.arrive = other;
    },
    // 搜索机票
    searchTicket() {
      console.log(this.tikect);
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  .title {
    font-size: 20px;
    color: orange;
    margin: 10px 0;
    i {
      font-size: 20px;
    }
  }
  .main {
    .adress {
      border: 1px solid #eee;
      height: 350px;
      box-sizing: border-box;
      .adress-top {
        span {
          display: block;
          width: 180px;
          height: 50px;
          background-color: #eeeeee;
          line-height: 50px;
          text-align: center;
        }
      }
      .tikect {
        padding: 15px 50px 15px 15px;
        position: relative;

        .changeAdress {
          position: absolute;
          top: 35px;
          right: 25px;
          height: 62px;
          width: 100px;
          border: 1px solid skyblue;
          border-left: none;
          span {
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background-color: #999;
            display: block;
            position: absolute;
            right: -10px;
            top: 21px;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
    .advert{
        float: right;
        img{
            height: 100%;
            vertical-align:middle;
        }
    }
  }
}
</style>