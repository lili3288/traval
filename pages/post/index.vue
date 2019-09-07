<template>
  <div class="index">
    <!-- <el-popover
      placement="right"
      width="400"
      trigger="hover"
      v-for="(item,index) in recomCity"
      :key="index"
    >
      <div v-for="(value,num) in item.children" :key="num">
          {{value.city}}
      </div>
      <el-button slot="reference">{{item.type}}</el-button>
    </el-popover> -->
    <el-row type="flex">
      <el-col :span="4"></el-col>
      <el-col :span="20"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recomCity: []
    };
  },
  mounted() {
    // 获取推荐
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      if (res.request.status === 200) {
        this.recomCity = res.data.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.index{
  width: 1000px;
  margin: 0 auto;
}
</style>