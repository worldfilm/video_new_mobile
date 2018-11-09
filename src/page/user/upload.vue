<template>
<div class="Upload" v-loading="loading">
  <header-bar></header-bar>
  <div class="content">
    <p>
      <span class="title">标题</span>
      <input maxlength="78" type="text" :placeholder="Showtitletx" class="titletex" v-model='titletex' @blur='btitletex' :class='ctitle'>
    </p>
    <p class="textareap">
      <span class="title">描述</span>
      <textarea class='textarea' :placeholder="Showtextareatx" maxlength="150" v-model='textareatex' @blur='btextarea' :class='ctextarea'></textarea>
      <p class="choese">
          <el-button type="primary" @click="selectTags">选择标签</el-button>
          <div class="tags">
            <el-tag v-for="(tag, index) in tags" :key="tag.id" closable @close="tagClose(index)" type="primary">
              {{tag.title}}
            </el-tag>
          </div>
      <p>
        <span class="title">是否匿名</span>
        <el-switch v-model="isAnonymous" active-color="#fe7a94" ></el-switch>
      </p>
          <p class="info"><i class="iconfont icon-ziyuan"></i><span>点击"上传"，既表示您同意服务条款，并且您愿意提供任何信息的要求。</span></p>
      <p class="choese">
        <el-upload class="upload-demo" ref="upload" :on-change='onchange' :on-success='success' :action='uploadUrl' :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" :disabled='filedisable' :class="fileupload">上传到服务器</el-button>
          <div style="padding: 0.3rem 0" slot="tip" class="el-upload__tip">感谢您的每个视频，视频的发布和转换需要一点时间来处理，此过程需要24-48小时， 具体的时间取决与视频容量，格式，服务器负载等，发布完成后，会及时推送信息。</div>
        </el-upload>
      </p>
      <p class="surep">
        <button type="button" name="button" :disabled='changedisable' :class="sureupload" @click='surebtn'>确认上传</button>
      </p>
  </div>
  <tag-list @cancel="cancel" @sure="getSelectedTags" v-show="showTagsPage"></tag-list>
</div>
</template>
<script>
import headerBar from "@/components/layout/headerBar.vue";
import tagList from './components/tagList.vue'

export default {
  data() {
    return {
      loading: false,
      showTagsPage:false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      checkedu: true,
      filedisable: true,
      ShowUmsg: false,
      showMask: false,
      tags: [],
      tagIds: [],
      videoUrl: null,
      uploadUrl: null, //上传链接地址
      sendingtext: null,
      titletex: null,
      textareatex: null,
      isText: false,
      isUpload: false,
      isTextare: false,
      isTags: false,
      changedisable: true,
      sureupload: 'dissureupload',
      fileupload: 'filesureupload',
      api_token:null,
      filename: null,
      Showtitletx: '视频标题',
      Showtextareatx: '描述最多可以输入150个字符',
      id: "xx",
      fileList: [{
        name: "",
        url: ""
      }],
      isAnonymous: false,
      imgurl: null,
      ctitle: '',
      ctextarea: '',
      loading:false,
    };
  },
  methods: {
    cancel(){
      this.showTagsPage = false;
    },
    getSelectedTags(tagIds, tags){
      this.showTagsPage = false
      this.tagIds = tagIds
      this.tags = tags
    },
    tagClose (index) {
      this.tagIds.splice(index, 1)
      this.tags.splice(index, 1)
    },
    selectTags () {
      this.showTagsPage = true
    },
    btitletex() {
      if(this.titletex==null){
        this.ctitle = 'ctitle'
        this.Showtitletx = '标题不能为空'
      }else{
        this.ctitle = ''
      }
    },
    btextarea() {
      if(this.titletex==null){
        this.ctextarea = 'ctextarea'
        this.Showtextareatx = '描述内容不能为空'
      }else{
        this.ctextarea = ''
      }
      // this.Showtitletx = false
    },
    // 上传后回调
    success(response) {
      if(response.status ==405){
        this.loading = false
        this.$refs.upload.clearFiles();
      }
      if (response.message == "请先登录") {
        this.loading = false
        this.$user.removeUserInfo()
        this.$message({
          message: '帐号在其他设备或者不同浏览器登录，请重新登录',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({
            path: "/Logoin"
          });
        }, 3000);
      }
      if (response.status == 0) {
        this.$message({
                message: response.message,
                type: 'success'
              });
        this.loading = false
        this.isUpload=true
        this.videoUrl = response.data.video_url;
        this.imgurl = response.data.thumb_img_url
      }

    },
    maskerc() {
      this.showTagsPage = true;
    },
    onchange(file, fileList) {
      let name=file.name.split('.')[file.name.split('.').length-1]
      let fileReg = /flv|rvmb|mp4|avi|wmv/;
      if (fileReg.test(name)) {
        this.filedisable=false
        this.fileupload = ''
      } else {
        this.filedisable=true
      this.$message({
                message: '请选取视频格式文件',
                type: 'error'
              });
        this.fileupload = 'filesureupload'
        
        this.$refs.upload.clearFiles();
      }
    },
    //上传到服务器
    submitUpload() {
      this.loading = true
      let name = this.$refs.upload.uploadFiles[0];
      if (name != undefined) {
        let obj = this.$refs.upload.uploadFiles[0].response;
      }
      this.$refs.upload.submit();
    },
    // 确认上传
    surebtn() {
      this.loading=true
      if (this.titletex && this.textareatex && this.videoUrl) {
        let params = {
          title: this.titletex,
          description: this.textareatex,
          tags: this.tagIds,
          is_anonymous: Number(this.isAnonymous),
          video_url: this.videoUrl,
          thumb_img_url: this.imgurl,
        };
        this.$http.post("/api/video/addMyVideo", params).then(data => {
          if (data.status == 0) {
            this.loading=false
            this.$message({
                message: data.message,
                type: 'success'
              });
          } else {
            this.loading=false
            this.$message({
                message: data.message,
                type: 'error'
              });
          }
        });
      } else {
        this.loading=false
      }
    },
    tageclosed(index) {
      this.tagIds.splice(index, 1);
      this.tags.splice(index, 1);
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    selectMark(name, id) {
      if (this.tags.indexOf(id) > -1) {
        this.showMask = false;
        return;
      }
      this.tags.push(id);
      this.tagIds.push(name);
      this.showMask = false;
    },
    
    checkInfo() {
      if (this.isText && this.isTextare && this.isUpload && this.isTags ) {
        this.changedisable = false
        this.sureupload = 'sureupload'
      } else {
        this.changedisable = true
        this.sureupload = 'dissureupload'
      }
    },
  },
  mounted() {
    this.$refs.upload.clearFiles();
  },
  components: {
    headerBar,tagList
  },
  created() {
    let api_token = this.$user.getUserInfo().api_token;
    let urlr=this.$MyConfig.baseURL
    this.uploadUrl = urlr+"/api/video/upload?api_token=" + api_token
    if (!api_token) {
      this.$router.push({
        path: "/Logoin"
      });
    }
  },
  watch: {
    titletex: function(curVal, oldVal) {
      if (curVal) {
        this.isText = true
      }
      this.checkInfo()
    },
    textareatex: function(curVal, oldVal) {
      if (curVal) {
        this.isTextare = true
      }
      this.checkInfo()
    },
    tags: function(curVal, oldVal) {
      if (curVal) {
        this.isTags = true
      }
      this.checkInfo()
    },
    isUpload:function(curVal, oldVal) {
      if (curVal) {
        this.changedisable = false
      }
      this.checkInfo()
    },
  },
}
</script>

<style lang="scss" scoped>
.Upload {
    .content {
        margin: 0 auto;
        padding:1rem 0.5rem;
        font-size: 0.35rem;
        p {
            height: 0.75rem;
            line-height: 0.75rem;
            margin: 0.3rem 0;
            .titletex {
                width: 5rem;
                height: .7rem;
                background-color: #fff;
                border: 1px solid #ccc;
                padding: 0 16px;
                border-radius: 4px;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
            }
            .ctitle {
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                border-color: #f70a48;
                -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #e61026;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ea153d;
            }
            .ctitle::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                color:   #f70a48;
            }
            .ctitle:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
               color:   #f70a48;
            }
            .ctitle::-moz-placeholder { /* Mozilla Firefox 19+ */
               color:    #f70a48;
            }
            .ctitle:-ms-input-placeholder { /* Internet Explorer 10-11 */
               color:    #f70a48;
            }

            .titletex:focus {
                border-color: #fe7a94;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #fe7a94;
            }
            .textarea {
                outline: none;
                resize: none;
                height: 1.3rem;
                background-color: #fff;
                border: 1px solid #ccc;
                padding: 0 16px;
                border-radius: 4px;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
                width:5rem;
                margin-top: 10px;
                padding: 15px;
            }
            .textarea:focus {
                border-color: #fe7a94;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #fe7a94;
            }
            .ctextarea{
              box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
              border-color: #f70a48;
              -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #e61026;
              box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ea153d;
            }
            .ctextarea::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                color:   #f70a48;
            }
            .ctextarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
               color:   #f70a48;
            }
            .ctextarea::-moz-placeholder { /* Mozilla Firefox 19+ */
               color:    #f70a48;
            }
            .ctextarea:-ms-input-placeholder { /* Internet Explorer 10-11 */
               color:    #f70a48;
            }

            .sureupload {
               width:3rem;
                height: .75rem;
            }
            .dissureupload {
                width:3rem;
                height: .75rem;
                background: #b4b6bb;
                cursor: not-allowed;
            }
            .filesureupload {
                background: #b4b6bb;
                cursor: not-allowed;
                border: 1px #b4b6bb solid;
            }
            span .title {
                padding: 0.2rem;
            }
        }
        .radio {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
        }
        .surep {
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            border-top: 0.02rem dashed #ada0a0;
            margin-top: 0.3rem
        }
        button {
            padding: 0.1rem 0.15rem;
            border-radius: 0.1rem;
            background: #fe7a94;
            color: #fff;
            font-size: 0.3rem;
        }
        .infotext {
            height: 80px;
            line-height: 25px;
        }
        .choese {
            height: 100%;
            line-height: 100%;
            .sendingtext {
                height: 27px;
                line-height: 26px;
                display: inline-block;
                padding-left: 20px;
                .el-upload__tip {}
            }
            .tageclosed {}
        }
        .textareap {
            height: 120px;
            span {
                float: left;
            }
        }
        .title {
            padding-right: 10px;
        }
        .info {
            color: #e47c21;
        }
        .el-tag + .el-tag {
            margin-left: 10px;
        }
        .el-button--success:active{
          background: #fe7a94;
          border-color: #fe7a94;
        }
        .el-button--success{
          background: #fe7a94;
          border-color: #fe7a94;
        }
    }
}
</style>
