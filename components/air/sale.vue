<template>
  <div class="sale">
      <div class="title">
          <i class="el-icon-s-promotion"></i>
          <span>特价机票</span>
      </div>
      <el-row type="flex" class="ticket">
            <div class="content">
                <img src="https://imgsrc.baidu.com/baike/pic/item/a71ea8d3fd1f41340d8f3dec281f95cad0c85ee3.jpg" alt="">
                    <div class="text">
                        <span>上海-北京</span>
                        <i>&yen;699</i>
                    </div>
            </div>
                <div class="content">
                <img src="https://imgsrc.baidu.com/baike/pic/item/a71ea8d3fd1f41340d8f3dec281f95cad0c85ee3.jpg" alt="">
                    <div class="text">
                        <span>上海-北京</span>
                        <i>&yen;699</i>
                    </div>
            </div>
                <div class="content">
                <img src="https://imgsrc.baidu.com/baike/pic/item/a71ea8d3fd1f41340d8f3dec281f95cad0c85ee3.jpg" alt="">
                    <div class="text">
                        <span>上海-北京</span>
                        <i>&yen;699</i>
                    </div>
            </div>
                <div class="content">
                <img src="https://imgsrc.baidu.com/baike/pic/item/a71ea8d3fd1f41340d8f3dec281f95cad0c85ee3.jpg" alt="">
                    <div class="text">
                        <span>上海-北京</span>
                        <i>&yen;699</i>
                    </div>
            </div>
      </el-row>
  </div>
</template>

<script>
export default {
    data(){
        return {
            ticket:[]
        }
    },
    mounted(){
        // 获取特价机票
        this.$axios({
            url:'/airs/sale'
        }).then(res=>{
          if(res.request.status===200){
              this.ticket=res.data.data
          }
        })
    }
};
</script>

<style lang="less" scoped>
.sale{
    .title{
        color: #409eff;
        font-size: 20px;
        margin: 20px 0;
    }
    .ticket{
        border: 1px solid #eee;
        width: 100%;
        padding: 20px;
        .content{
            position: relative;
            height: 140px;
            width: 25%;
            overflow: hidden;
            margin-right:20px;
            
            &:nth-child(4){
                margin-right: 0;
            }
            img{
                width: 100%;
            }
            .text{
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                height: 30px;
                padding: 0 15px;
                background-color: rgba(0,0,0,.5);
                color: #fff;
                i{
                    float: right;
                }
            }
        }
    }
}
</style>
