

<template>
  <div class="hello">
    <div class="div" v-for="(item,index) in aa" :key="index">
      <div class="ddd" v-if="item.data">{{item.data.tt}}</div>
      第一层：{{item.name}}
      
      <tt :aa="item.children" />
    </div>
  </div>
</template>


<script>
export default {
  props: ["aa"],
  name: "tt"
};
</script>

<style lang="less" scoped>
</style>