<template>
  <div class="sale">
    <div class="title">
      <i class="el-icon-s-promotion"></i>
      <span>特价机票</span>
    </div>
    <el-row type="flex" class="ticket">
      <div class="content" v-for="(item,index) in ticket" :key="index">
        <img :src="item.cover"/>
        <div class="text">
          <span>{{item.departCity}}-{{item.destCity}}</span>
          <i>&yen;{{item.price}}</i>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticket: []
    };
  },
  mounted() {
    // 获取特价机票
    this.$axios({
      url: "/airs/sale"
    }).then(res => {
      console.log(res);
      if (res.request.status === 200) {
        this.ticket = res.data.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.sale {
    margin-bottom: 50px;
  .title {
    color: #409eff;
    font-size: 20px;
    margin: 20px 0;
  }
  .ticket {
    border: 1px solid #ddd;
    width: 100%;
    padding: 20px;
    .content {
      position: relative;
      height: 140px;
      width: 25%;
      overflow: hidden;
      margin-right: 20px;

      &:nth-child(4) {
        margin-right: 0;
      }
      img {
        width: 100%;
      }
      .text {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 15px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        i {
          float: right;
        }
      }
    }
  }
}
</style>
