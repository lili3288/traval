<template>
  <div class="hello">
      <div v-for='item in showList'>{{item}}</div>
      <div @click="showAll = !showAll" class="show-more">{{word}}</div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      toLearnList:[
        'html','css','javascript','java','php'   //进行显示的数据
      ],
      showAll:false,  　　　　　　　　　　　　　　　　//标记数据是否需要完全显示的属性
    }
  },
  computed:{
    
    showList:function(){
      if(this.showAll == false){                    //当数据不需要完全显示的时候
        var showList = [];　　　　　　　　　　　　　　　 //定义一个空数组
        if(this.toLearnList.length > 3){　　　　　　　//这里我们先显示前三个
          for(var i=0;i<3;i++){
            showList.push(this.toLearnList[i])
          }
        }else{
          showList = this.toLearnList
        }
        return showList;　　　　　　　　　　　　　　　　 //返回当前数组
      }else{
        return this.toLearnList;
      }
    },
    word:function(){
      if(this.showAll == false){　　　　　　　　　　　//对文字进行处理
        return '点击展开'
      }else{
        return '点击收起'
      }
    }
  }
};
</script>

<style lang="less" scoped>
.box{
  width: 100px;
  height: 100px;
  background-color: skyblue;
  transform: rotate(-12deg)
}
</style>