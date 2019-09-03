<template>
  <div class="index">
    <!-- 轮播图 -->
    <el-carousel height="700px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div class="img" :style="`background:url(${$axios.defaults.baseURL+item.url})no-repeat `"></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="search">
      <el-row class="entry" type="flex">
        <span
          v-for="(item, index) in searchWord"
          :key="index"
          @click="change(index)"
          :class="{active:index===current}"
        >
          <i>{{item.title}}</i>
        </span>
      </el-row>

      <el-row type="flex" class="search-input" justify="space-around ">
        <input type="text" :placeholder="searchWord[current].desc" />
        <i class="el-icon-search icon-search"></i>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图
      banners: [
        // 'http://157.122.54.189:9095/assets/images/th01.jfif',
        // 'http://157.122.54.189:9095/assets/images/th02.jfif',
        // 'http://157.122.54.189:9095/assets/images/th03.jfif'
      ],
      // 搜索
      searchWord: [
        {
          title: "攻略",
          desc: "搜索城市"
        },
        {
          title: "酒店",
          desc: "输入城市搜索酒店"
        },
        {
          title: "机票",
          desc: ""
        }
      ],
      current: 0,
      input: ""
    };
  },
  methods: {
    change(index) {
      this.current = index;
      if (index === 2) {
        this.$router.push({ path: "/user/login" });
      }
    }
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      console.log(res);
      console.dir(this.$axios);
      this.banners = res.data.data;
    });
  }
};
</script>
<style lang="less">
.img {
  width: 100%;
  height: 700px;
}
.search {
  position: absolute;
  left: 50%;
  margin-left: -250px;
  top: 400px;
  z-index: 10;
  .entry {
    // 搜索词高亮
    .active {
      i {
        color: #333 !important;
      }

      &::after {
        background-color: #eeeeee !important;
      }
    }
    span {
      i {
        position: absolute;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
        color: #fff;
      }

      width: 82px;
      height: 36px;
      display: block;
      text-align: center;
      cursor: pointer;
      position: relative;
      margin-right: 8px;
      &::after {
        transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
        content: "";
        background-color: rgba(0, 0, 0, 0.3);
        top: 0;
        left: 0;
        transform-origin: bottom left;
      }
    }
  }

  .search-input {
    width: 500px;
    height: 45px;
    background-color: #fff;
    text-align: center;
    line-height: 45px;
    border-radius: 5px;
    border-top-left-radius: 0;
    input {
      width: 85%;
      border: none;
      outline: none;
      :focus {
        border: none;
      }
    }
    .icon-search {
      font-size: 25px;
      display: block;
      line-height: 45px;
    }
  }
}
</style>