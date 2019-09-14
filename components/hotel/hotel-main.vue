<template>
  <div class="main">
    <el-row
      type="flex"
      class="hotelItem"
      :gutter="5"
      v-for="(item,index) in hotelList"
      :key="index"
    >
      <el-col :span="8" class="left">
        <img :src="item.photos" alt />
      </el-col>
      <el-col :span="12" class="middle">
        <!-- 标题 -->
        <h3>{{item.name}}</h3>
        <el-row class="type">
          {{item.alias}}
          {{item.hoteltype.name}}
          <!-- iconfont iconhuangguan -->
        </el-row>
        <el-row type="flex" class="about">
          <el-rate
            :value="item.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>

          <span class="comment">
            <i>31</i>条评价
          </span>
          <span>
            <i>{{item.good_remarks}}</i>篇游记
          </span>
        </el-row>
        <div class="local">
          <i class="el-icon-location"></i> 位于：{{item.address}}
        </div>
      </el-col>
      <el-col :span="6" class="right">
        <el-row type="flex" class="hotellink" justify="space-between" v-for="(val,num) in item.products" :key="num">
          <span>{{val.name}}</span>
          <span>
            <i>&yen;{{val.price}}</i>起
            <i class="el-icon-arrow-right"></i>
          </span>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3.4,
      hotelList: []
    };
  },
  mounted() {
    let id = this.$route.query.id;
    this.$axios({
      url: "/hotels",
      params: {
        city: id
      }
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.hotelList = res.data.data;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.main {
  .hotelItem {
    padding: 25px 0;
    border-bottom: 1px solid #eee;
    .left {
      img {
        width: 320px;
        height: 210px;
      }
    }
    .middle {
      h3 {
        font-size: 24px;
        font-weight: 400;
      }
      .type {
        color: #999;
      }
      span {
      }
      .about {
        padding: 20px 0;
        .comment {
          margin: 0 50px 0 20px;
        }
        span {
          i {
            color: #f90;
          }
        }
      }
      .local {
        font-size: 14px;
        color: #666;
      }
    }
    .right {
      font-size: 14px;
      padding: 20px 10px 0;
      .hotellink {
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 15px 0;
        span {
          i {
            color: #f90;
          }
        }
      }
    }
  }
}
</style>