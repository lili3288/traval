<template>
  <div class="hotel">
    <!-- 头部搜索和区域展示 -->
    <hoteltop/>
    <!-- 展示酒店列表 -->
    <hotelmain/>
  </div>
</template>

<script>
import hoteltop from "@/components/hotel/hotel-top";
import hotelmain from "@/components/hotel/hotel-main";
export default {
  components: {
    hoteltop,hotelmain
  }
};
</script>

<style lang="less" scoped>
.hotel{
  padding: 20px 0;
  width: 1000px;
  margin: 0 auto;
}
</style>