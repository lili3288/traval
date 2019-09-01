<template>
  <div class="tab">
    <div class="title">
      <span
        v-for="(val,index) in ['体育','娱乐','经济'] "
        :key="index"
        @mouseover="changeindex(index)"
        :class="{active:current===index}"
      >{{val}}</span>
    </div>
    <!-- 内容 -->
    <div v-show="current===0">
      <ul>
        <li>体育新闻</li>
        <li>体育新闻</li>
        <li>体育新闻</li>
      </ul>
    </div>
    <div v-show="current===1">
      <ul>
        <li>娱乐新闻</li>
        <li>娱乐新闻</li>
        <li>娱乐新闻</li>
      </ul>
    </div>
    <div v-show="current===2">
      <ul>
        <li>经济新闻</li>
        <li>经济新闻</li>
        <li>经济新闻</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    changeindex(index) {
      this.current = index;
    }
  }
};
</script>
<style lang="less" scoped>
.tab {
    width: 1200px;
  margin: 20px auto;
  
}
span{
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
}
.title{
    margin-bottom: 20px
}
.active{
    color:red
}
</style>