<template>
  <div class="com">
    <div class="comments">
      <div class="comments-item" v-for="(item,index) in comList" :key="index">
        <el-row type="flex" justify="space-between">
          <div class="left">
            <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
            <span>{{item.account.nickname}}</span>
            <i>{{item.created_at|time}}</i>
          </div>
          <div class="right">{{item.level}}</div>
        </el-row>
        <comments  v-if="item.level!==1" :comList="item.parent"></comments>
        <div class="main" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { time } from "@/middleware/filter";
export default {
  name: "comments",
  props: {
    comList: {
      type: Array,
      default:[]
    }
  },
  filters: {
    time
  },
};
</script>

<style lang="less" scoped>
// 评论列表
.comments {
  border: 1px solid #999;
  .comments-item {
    font-size: 12px;
    padding: 20px 20px 5px;
    border-bottom: 1px dashed #999;

    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
    i {
      color: #999;
    }
    .main {
      padding-top: 10px;
    }
  }
}
</style>