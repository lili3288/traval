<template>
  <div class="com">
    <div class="comments">
      <div class="hide" v-if="comList.length===0">暂无评论,赶紧抢占沙发</div>
      <div class="comments-item" v-for="(item,index) in comList" :key="index">
        <el-row type="flex" justify="space-between">
          <div class="left">
            <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
            <span>{{item.account.nickname}}</span>
            <i>{{item.created_at|time}}</i>
          </div>
          <div class="right">{{item.level}}</div>
          <div v-if="item.parent">{{item.parent.id}}</div>
        </el-row>
        <!-- <comments  v-if="item.parent" :comList="item.parent"></comments> -->
        <div class="main" v-html="item.content"></div>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin:20px 0;"
    ></el-pagination>
  </div>
</template>

<script>
import { time } from "@/middleware/filter";
export default {
  name: "comments",
  props: {
    comList: {
      type: Array,
      default: []
    }
  },
  mounted() {},
  data() {
    return {
      total: 0,
      list: [],
      pageSize: 5,
      pageNum: 1
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    }
  },
  filters: {
    time
  },
  watch: {
    comList(n, o) {
      this.list = n;
      console.log(this.list);
      this.total = this.list.length;
    }
  }
};
</script>

<style lang="less" scoped>
// 评论列表
.comments {
  border: 1px dashed #999;
  .hide{
    padding: 20px 0;
    text-align: center;
    color: #999;
    font-size: 14px;
  }
  .comments-item {
    font-size: 12px;
    padding: 20px 20px 5px;
    border-bottom: 1px dashed #999;
    &:last-child {
      border-bottom: 0;
    }
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