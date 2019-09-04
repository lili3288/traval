<template>
  <div class="flights">
    <el-row type="flex" class="row-bg">
      <el-col :span="20">
        <div class="title">
          <el-row type="flex">
            <div class="adress">
              <span>单程：广州-上海/2019-02-03</span>
            </div>
            <div class="select">
              <el-select v-model="value" placeholder="起飞机场">
                <el-option
                  v-for="item in [{value:'1',label:'1'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="value" placeholder="起飞时间">
                <el-option
                  v-for="item in [{value:'1',label:'1'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="value" placeholder="航空公司">
                <el-option
                  v-for="item in [{value:'1',label:'1'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="value" placeholder="机型">
                <el-option
                  v-for="item in [{value:'1',label:'1'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">1</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted() {
    let query = this.$route.query;
    console.log(query);
    this.$axios({
      url: "/airs",
      params: query
    }).then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang="less" scoped>
.flights {
  width: 1000px;
  margin: 0 auto;
  .left {
    .title {
      .adress {
        span {
          font-size: 14px;
        }
      }
      .select {
        width: 100%;
      }
    }
  }
}
/deep/ .el-select {
  width: 20%;
}
</style>