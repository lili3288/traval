<template>
  <!-- 写游记 -->
  <div class="create">
    <el-row type="flex">
      <!-- 左侧 -->
      <div class="left">
        <div class="top">
          <p>发表新攻略</p>
          <span>分享你的个人游记，让更多人看到哦！</span>
        </div>

        <el-input v-model="title" placeholder="请输入标题" ></el-input>
      </div>
      <!-- 右侧 -->
      <div class="right"></div>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      title:''
    }
  }
};
</script>

<style lang="less" scoped>
.create {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  .left {
   width: 750px;
    .top {
      padding-bottom: 10px;
      p {
        font-size: 22px;
        padding-bottom: 10px;
      }
      span {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>