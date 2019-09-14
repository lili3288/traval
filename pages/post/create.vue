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

        <el-input v-model="title" placeholder="请输入标题"></el-input>

        <template>
          <div id="app">
            <VueEditor :config="config" />
          </div>
        </template>
      </div>
    </el-row>
  </div>
</template>
  

<script>
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "app",
  data() {
    return {
      title: "",
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {
            console.log('中间',res)
          },
          uploadSuccess(res, insert) {
            console.log('成功',res,insert)
            insert(res.data[0].url);
          },
          uploadError() {},
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      }
    };
  },

  components: {
    VueEditor
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