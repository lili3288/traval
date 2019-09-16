<template>
  <div class="main">
    <!-- 筛选开始 -->
    <el-row type="flex" class="select">
      <!-- 价格 -->
      <el-col :span="8">
        <el-row type="flex" class="desc" justify="space-between">
          <span>价格</span>
          <span>0-4000</span>
        </el-row>
        <el-slider v-model="price" :max="4000" input-size="mini"></el-slider>
      </el-col>
      <!-- 住宿等级 -->
      <el-col :span="6">
        <el-row class="desc">
          <span>住宿等级</span>
        </el-row>
        <el-select
          v-model="select.hotellevel"
          placeholder="请选择"
          size="mini"
          class="selectItem"
          @change="selectStart"
        >
          <el-option v-for="item in type.levels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <!-- 住宿类型 -->

      <el-col :span="6">
        <el-row class="desc">
          <span>住宿类型</span>
        </el-row>
        <el-select
          v-model="select.hoteltype"
          placeholder="请选择"
          size="mini"
          class="selectItem"
          @change="changeItem"
        >
          <el-option v-for="item in type.types" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <!-- 酒店设施 -->

      <el-col :span="6">
        <el-row class="desc">
          <span>酒店设施</span>
        </el-row>
        <el-select v-model="select.hotelasset" placeholder="请选择" size="mini" class="selectItem">
          <el-option v-for="item in type.assets" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <!-- 酒店品牌 -->
      <el-col :span="6">
        <el-row class="desc">
          <span>酒店品牌</span>
        </el-row>
        <el-select v-model="select.hotelbrand" placeholder="请选择" size="mini" class="selectItem">
          <el-option v-for="item in type.brands" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 筛选结束 -->

    <!-- 酒店列表开始 -->
    <el-row
      type="flex"
      class="hotelItem"
      :gutter="20"
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
          <i class="el-icon-location"></i>
          位于：{{item.address}}
        </div>
      </el-col>
      <el-col :span="6" class="right">
        <el-row
          type="flex"
          class="hotellink"
          justify="space-between"
          v-for="(val,num) in item.products"
          :key="num"
        >
          <span>{{val.name}}</span>
          <span>
            <i>&yen;{{val.price}}</i>起
            <i class="el-icon-arrow-right"></i>
          </span>
        </el-row>
      </el-col>
    </el-row>
    <!-- 酒店列表结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3.4,
      hotelList: [],
      price: 0,

      type: {
        assets: [],
        brands: [],
        levels: [],
        types: []
      },
      // 筛选酒店的请求数据
      select: {
        id: "", // 酒店id(酒店详情)
        city: "", // 城市id
        price_in: "", // 酒店价格/
        scenic: "", // 景点id
        name_contains: "", // 名字模糊查询
        hotellevel: "", // 酒店星级
        hoteltype: "", // 酒店类型
        hotelbrand: "", // 酒店品牌
        hotelasset: "", // 酒店设施
        enterTime: "", // 入店时间/
        person: "", // 人数
        _sort: "", // 排序
        _limit: 100, // 条数
        _start: 1 // 开始数据（分页）
      },
      finally: {}
    };
  },
  mounted() {
    // 酒店列表
    let id = this.$route.query.id;
    this.select.city = id;
    console.log(this.select);
    this.$axios({
      url: "/hotels"
    }).then(res => {
      if (res.status === 200) {
        this.hotelList = res.data.data;
        let arr = [];

        this.hotelList.forEach(e => {
          // console.log(e.location);
          let position = [];
          position.push(e.location.longitude)
          position.push(e.location.latitude)
          arr.push({
            position,
            
          })
        });
        // console.log(arr)
        this.$store.commit('hotel/getlocalInfo',arr)
      }
    });

    // 酒店类型
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      this.type = res.data.data;
    });
  },
  methods: {
    changeItem() {
      this.$axios({
        url: "/hotels",
        params: {
          city: this.select.city,
          // hoteltype:this.select.hoteltype,
          price_lt: 4000,
          hoteltype_in: 3
        }
      }).then(res => {
        if (res.status === 200) {
          this.hotelList = res.data.data;
          let arr = [];
          this.hotelList.forEach(e => {
            arr.push(e.location);
          });
        }
      });
    },
    // 选择星级
    selectStart() {
      this.$axios({
        url: "/hotels",
        params: {
          city: this.select.city,
          // hoteltype:this.select.hoteltype,
          hotellevel: this.select.hotellevel,

          price_lt: 4000
        }
      }).then(res => {
        if (res.status === 200) {
          this.hotelList = res.data.data;
          let arr = [];
          this.hotelList.forEach(e => {
            arr.push(e.location);
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  // 筛选
  .select {
    border: 1px solid skyblue;
    margin-top: 20px;
    .el-col {
      border-right: 1px solid #666;
      padding: 5px 20px;
      .desc {
      }
      .selectItem {
        padding: 10px 0;
        border: 0;
      }
      &:last-child {
        border-right: 0;
      }
    }
  }
  // 酒店列表
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
        cursor: pointer;
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 15px 20px;
        &:hover {
          background-color: #f5f7fa;
        }
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