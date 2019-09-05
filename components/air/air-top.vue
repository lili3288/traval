<template>
  <div class="top">
    <div class="title">
      <i class="iconfont iconfeiji"></i>
      <span>国内机票</span>
    </div>
    <div class="main clearfix">
      <!-- 选择出发地 -->
      <el-col :gutter="20">
        <el-col :span="8">
          <div class="adress">
            <!-- 导航 -->
            <el-row type="flex" class="adress-top">
              <span v-for="(item,index) in ['单程','往返']" :key="index">{{item}}</span>
            </el-row>
            <!-- 选择出发和目的地 -->
            <el-form
              :model="tikect"
              ref="ruleForm"
              :rules="rules"
              label-width="80px"
              class="demo-ruleForm tikect"
            >
              <!-- 切换地点 -->
              <div class="changeAdress" @click="changeAdress">
                <span>换</span>
              </div>
              <el-form-item label="出发城市" prop="departCity">
                <el-autocomplete
                  v-model="tikect.departCity"
                  :fetch-suggestions="querySearch"
                  placeholder="请搜索出发城市"
                  @select="handlecity"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="到达城市" prop="destCity">
                <el-autocomplete
                  v-model="tikect.destCity"
                  :fetch-suggestions="querySearch2"
                  placeholder="请搜索到达城市"
                  @select="handleArrivecity"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="出发时间" prop="date">
                <el-date-picker
                  v-model="tikect.departDate"
                  type="date"
                  placeholder="选择日期时间"
                  style="width:100%"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
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
        departCity: "北京 ", //出发城市
        departCode: "", //出发城市代码
        destCity: "上海", //目标城市
        destCode: "", //目标城市代码
        departDate: "" //日期
      },
      // 存放匹配到的出发城市列表
      startCity: [],
      // 存放匹配到的到达城市列表
      arrivetCity: [],
      rules: {
        departCity: [
          { required: true, message: "请输入出发城市", trigger: "blur" }
        ],
        destCity: [
          { required: true, message: "请输入目的城市", trigger: "blur" }
        ],
        date: [
          // { required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    //   输入匹配城市
    querySearch(value, cb) {
      this.$axios({
        url: `/airs/city?name=${value}`
      }).then(res => {
        if (res.request.status === 200) {
          // 得到匹配到的城市列表
          let data = res.data.data;

          data.forEach(e => {
            // arr.push({ value: e.name });
            e.value = e.name;
          });
          this.startCity = data;
          cb(data);
        }
      });
    },
    querySearch2(value, cb) {
      this.$axios({
        url: `/airs/city?name=${value}`
      }).then(res => {
        if (res.request.status === 200) {
          // 得到匹配到的城市列表
          let data = res.data.data;
          data.forEach(e => {
            e.value = e.name;
          });
          this.arrivetCity = data;
          cb(data);
        }
      });
    },
    // 选择出发城市
    handlecity(data) {
      console.log(123, data);
      this.tikect.departCode = data.sort;
    },
    // 选择到达城市
    handleArrivecity(data) {
      this.tikect.destCode = data.sort;
    },
    // 切换出发到达城市
    changeAdress() {
      const other = this.tikect.departCity;
      this.tikect.departCity = this.tikect.destCity;
      this.tikect.destCity = other;
      const code = this.tikect.departCode;
      this.tikect.departCode = this.tikect.destCode;
      this.destCode = code;
    },
    // 搜索机票
    searchTicket() {
      console.log(this.tikect);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(typeof this.tikect.departDate);
          this.$axios({
            url: "/airs",
            params: this.tikect
          }).then(res => {
            console.log(res);
          });
          if (this.tikect.destCode === "" || this.tikect.departCode === "") {
            this.$message.info("出发或到达城市不存在，请在下拉列表选择城市");
            return;
          }
          this.$router.push({ path: "/air/flights", query: this.tikect });
        } else {
          this.$message.info("请正确填写必填项");
        }
      });
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
    .advert {
      float: right;
      img {
        height: 100%;
        vertical-align: middle;
      }
    }
  }
}
</style>