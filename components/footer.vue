<template>
  <div class="footer">
    <!-- 关于和服务 -->
    <div class="top w">
      <el-row type="flex" justify="space-between">
        <!-- 网站数据简介 -->
        <div class="traval-data">
          <h3>闲云旅游旅游网</h3>
          <p>上亿旅行者共同打造的"旅行神器"</p>
          <p><span>60,000</span> 多个全球旅游目的地</p>
          <p><span>600,000</span> 个细分目的地新玩法</p>
          <p><span>760,000,000</span> 次攻略下载</p>
          <p><span>38,000</span> 家旅游产品供应商</p>
        </div>
        <!-- 关于我们 -->
        <div class="about">
          <h3>闲云旅游旅游网</h3>
          <p>隐私政策 商标声明"旅行神器"</p>
          <p>服务协议 游记协议</p>
          <p>商城平台服务协议</p>
          <p>网络信息侵权通知指引</p>
          <p>闲云旅游旅游网服务监督员</p>
          <p>网站地图加入闲云旅游</p>
        </div>
        <!-- 旅行服务 -->
        <div class="server">
          <h3>旅行服务</h3>
          <p>旅游攻略 酒店预订</p>
          <p>旅游特价 国际租车</p>
          <p>旅游问答 旅游保险</p>
          <p>旅游指南 订火车票</p>
          <p>旅游资讯 APP下载</p>
        </div>
        <!-- 关注我们 -->
        <div class="attention">
          <img src="http://157.122.54.189:9093/images/1556522965.png" alt />
          <p>关注我们</p>
        </div>
      </el-row>
    </div>
    <!-- 备案号 -->
    <div class="record">
      <p>京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer {
  background-color: #333;
  color: #fff;
  font-size: 12px;
  .w {
    width: 1000px;
    margin: 0 auto;
  }
  .top {
    padding: 30px 0;
    border-bottom: 1px solid #666666;
    .traval-data{
        span{
            color: orange;
        }
    }
    .traval-data,
    .about,
    .server {
      h3 {
        font-weight: 100;
        margin-bottom: 10px;
      }
      p {
        
        margin-bottom: 5px;
      }
    }
    .attention {
      img {
        display: block;
        width: 140px;
        height: 140px;
      }
      p{
          text-align: center;
          margin-top: 10px;
      }
    }
  }
  .record {
    padding: 50px 0;
    text-align: center;
  }
}
</style>