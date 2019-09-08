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
    </el-popover>-->
    <el-row type="flex">
      <!-- 左侧 -->
      <el-col :span="6">
        <!-- 推荐城市列表 -->
        <div class="recom">
          <div class="recom-list" v-for="(item,index) in recomCity" :key="index"   @mouseover="showContent(index)"
           @mouseout="hideContent">
            <div
              class="recom-list-each"
              :class="{noborder:index===isShow}"
            
            >
              <span>{{item.type}}</span>
              <i class="el-icon-arrow-right"></i>
            </div>
            <!-- 隐藏详情 -->
            <div class="recom-content" :class="{active:index===isShow}">
              <div class="content-list" v-for="(value,num) in item.children" :key="num">
                <span>{{num+1}}</span>
                <i>{{value.city}}</i>
                {{value.desc}}
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="18">
        <list></list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import list from '@/components/post/list'
export default {
  data() {
    return {
      recomCity: [],
      isShow: -1
    };
  },
  components:{
    list
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
  },
  methods: {
    showContent(index) {
      this.isShow = index;
    },
    hideContent(){
       this.isShow =-1;
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  width: 1000px;
  margin: 0 auto;
  margin-bottom: 500px;
  padding: 20px 0;
  .recom {
    border: 1px solid #ddd;
    border-right: 0;
    width: 240px;
    position: relative;
    // box-sizing: border-box;
    .recom-list {
      height: 40px;

      // box-sizing: border-box;

      line-height: 40px;
      border-bottom: 1px solid #ddd;
      
      .recom-list-each {
        background-color: #fff;
        font-size: 14px;

        border-right: 1px solid #ddd;
        position: relative;
        padding: 0 20px;
        // box-sizing: border-box;
        z-index: 10;

        i {
          position: absolute;
          height: 40px;
          line-height: 40px;
          right: 10px;
          top: 0;
        }
      }
      .noborder {
        border-right: 1px solid rgba(209, 49, 49, 0);
        color: orange;
      }
      &:last-child {
        border-bottom: 0;
      }
      .recom-content {
        border: 1px solid #ddd;
        z-index: 6;
        background-color: #fff;
        position: absolute;
        left: 239px;
        // box-sizing: border-box;
        top: -1px;
        display: none;
        width: 300px;
        .content-list {
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
          font-size: 12px;
          color: #999;
          span {
            font-size: 30px;
            color: orange;
          }
          i {
            font-size: 16px;
            color: orange;
            margin: 0 10px;
          }
        }
      }
      .active {
        display: block;
      }
    }
  }
}
</style>