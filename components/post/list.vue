<template>
  <!-- 推荐文章列表 -->
  <div class="strategy">
    <div class="top">
      <!-- <el-input v-model="input" placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search" style="background-color: #fff;border:none;"></el-button>
      </el-input>-->
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" style=" border:none"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  }
};
</script>

<style lang="less" scoped>
.strategy {
  .top {
    .el-input{
      border: 3px solid orange;
      font-size: 16px;
      height: 20px;
      box-sizing: border-box;
      
    }
  }
}
/deep/ .el-input-group__append {
  border: none;
  background-color: #fff;
}
/deep/ .el-input__inner {
  border: none;

  // font-size: 50px;
}
</style>