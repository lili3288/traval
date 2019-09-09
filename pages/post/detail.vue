<template>
  <!-- 文章详情页 -->
  <div class="datail">
    <el-row type="flex">
      <!-- 左侧 -->
      <div class="left">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bear">
          <el-breadcrumb-item>旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 标题 -->
        <div class="title">{{post.title}}</div>
        <!-- 发布时间 -->
        <div class="creatTime">
          <span>攻略：{{post.created_at|time}} 阅读：6783</span>
        </div>
        <!-- 文章内容 -->
        <div class="content" v-html="post.content"></div>
        <!-- 点赞 -->
        <div class="like">
          <div class="like-item">
            <i class="el-icon-edit"></i>
            <p>评论()</p>
          </div>
            <div class="like-item">
            <i class="el-icon-edit"></i>
            <p>评论()</p>
          </div>
            <div class="like-item">
            <i class="el-icon-edit"></i>
            <p>评论()</p>
          </div>
            <div class="like-item">
            <i class="el-icon-edit"></i>
            <p>评论()</p>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right"></div>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      post: []
    };
  },
  mounted() {
    const id = this.$route.query.id;
    this.$axios({
      url: "/posts",
      params: { id }
    }).then(res => {
      console.log(res);
      this.post = res.data.data[0];
      console.log(this.post);
    });
  },
  filters: {
    time(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="less" scoped>
.datail {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  .left {
    width: 700px;
    // 面包屑导航
    .bear {
      // margin: 20px 0;
    }
    // 标题
    .title {
      font-size: 32px;
      font-weight: 600;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }
    .creatTime {
      width: 100%;
      text-align: right;
      padding: 20px;
      color: #999;
      box-sizing: border-box;
    }
    .content {
      /deep/ img {
        max-width: 700px;
        padding: 10px 0;
      }
      /deep/ p {
        margin: 5px 0;
      }
    }
    // .content >>> img {
    //   width: 100px;
    // }
  }
}
</style>