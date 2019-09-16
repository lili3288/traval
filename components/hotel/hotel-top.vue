<template>
  <div class="top">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel?city=74' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="searchArray">
      <!-- 酒店选择 -->
      <el-autocomplete
        class="inline-input"
        v-model="city"
        :fetch-suggestions="findHotel"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
      <!-- 时间选择 -->
      <el-date-picker
        v-model="date"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']"
      ></el-date-picker>
      <!-- 人数 -->
      <el-select v-model="person" placeholder="请选择">
        <el-option value="123" label="1645">
          <el-row type="flex" class="person">
            <span class="personText">456465</span>
            <el-select v-model="item" placeholder="请选择" size="small" style="width:100px;">
              <el-option value="123" label="1645">112</el-option>
            </el-select>
            <el-select v-model="item1" placeholder="请选择" size="small" style="width:100px;">
              <el-option value="123" label="1645">112</el-option>
            </el-select>
          </el-row>
        </el-option>
      </el-select>
      <el-button type="primary">查看价格</el-button>
    </div>
    <el-row type="flex" class="cityInfo">
      <!-- 左侧展示地址 -->
      <div class="left">
        <el-row type="flex">
          <el-col :span="2">区域：</el-col>
          <el-col :span="22">
            <i>全部</i>
            <span v-for="(item,index) in cityAdress" :key="index">{{item.name}}</span>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="2">攻略:</el-col>
          <el-col
            :span="22"
          >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="2">均价:</el-col>
          <el-col :span="22">
            <i class="el-icon-star-on"></i>
          </el-col>
        </el-row>
      </div>
      <!-- 右侧地图 -->
      <div class="right">
        <!-- 高德地图 -->
        <div id="container"></div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      date: "",
      person: "",
      item: "",
      item1: "",
      // 循环城市地址
      cityAdress: [],
      markerList: []
    };
  },
  watch: {
    "$store.state.hotel.localInfo"(n, o) {
      this.markerList = n;
    }
  },
  mounted() {
    setTimeout(() => {
      let id = this.$route.query.id;

      this.$axios({
        url: "/cities",
        params: { name: "南京" }
      }).then(res => {
        if (res.request.status === 200) {
          this.cityAdress = res.data.data[0].scenics;
        }
      });
      var markerList = this.markerList;
      console.log(markerList);

      var center = this.markerList[0].position;
      // 高德地图
      window.onLoad = function() {
        var map = new AMap.Map("container", {
          resizeEnable: true,
          zoom: 11, //级别
          center: center //中心点坐标
        });

        var marker = [];

        markerList.forEach(e => {
          new AMap.Marker({
            map: map,
            content: e.icon,
            position: [e.position[0], e.position[1]],
            offset: new AMap.Pixel(-13, -30)
          });
        });

        // 将创建的点标记添加到已有的地图实例：
        map.add(marker);
        // 创建一个 Marker 实例：
        // // 多个点实例组成的数组
        // var markerList = [marker1, marker2, marker3];

        // map.add(markerList);
      };
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=17ea097313c08492c412329601d60414&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }, 10);
  },
  methods: {
    // 搜索城市
    findHotel(val, cb) {
      this.$axios({
        url: "/cities",
        params: { name: val }
      }).then(res => {
        if (res.request.status === 200) {
          let data = res.data.data;
          data.forEach(e => {
            e.value = e.name.replace("市", "");
          });
          cb(res.data.data);
        }
      });
    },
    // 选择城市
    handleSelect(value) {
      this.city = value;
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  .searchArray {
    margin: 20px 0;
    clear: both;
    .person {
      width: 100%;
      align-items: right;
      position: relative;
      background-color: #fff;
      .personText {
        // position: absolute;
        // left: 0;
      }
    }
  }
  // 城市信息
  .cityInfo {
    width: 100%;
    .left {
      width: 60%;
      font-size: 14px;
      .el-row {
        margin-bottom: 10px;
      }
      span {
        padding: 0 10px;
        color: #666;
      }
    }
    .right {
      width: 40%;
      #container {
        width: 400px;
        height: 260px;
      }
    }
  }
}
/deep/ .amap-icon img {
  width: 30px;
  height: 50px;
}
/deep/ .demon {
  position: relative;
  img {
    width: 25px;
    height: 34px;
  }
  span{
    position: absolute;
    left: 50%;
    margin-left: -5px;
    top: 0;
    color :#fff;
  }
}
</style>