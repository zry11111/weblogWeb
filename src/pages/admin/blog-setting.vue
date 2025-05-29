<template>
  <div>
    <!-- 指定卡片没有阴影 -->
    <el-card shadow="never">
      <el-form ref="formRef" :model="form" label-width="160px" :rules="rules">
        <el-form-item label="博客名称" prop="name">
          <el-input v-model="form.name" clearable />
          <!-- clearable表示当输入框中有内容时，显示一个X来清除输入框中的内容 -->
        </el-form-item>
        <el-form-item label="作者名" prop="author">
          <el-input v-model="form.author" clearable />
        </el-form-item>
        <el-form-item label="博客 LOGO" prop="logo">
          <!-- auto-upload为true的情况下，会自动向action发送文件 -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleLogoChange"
          >
            <img v-if="form.logo" :src="form.logo" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="作者头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarChange"
          >
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="介绍语" prop="introduction">
          <el-input v-model="form.introduction" type="textarea" />
        </el-form-item>

        <!-- 开启 Github 访问 -->
        <el-form-item label="开启 GihHub 访问">
          <el-switch
            v-model="isGithubChecked"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            @change="githubSwitchChange"
          />
        </el-form-item>
        <el-form-item label="GitHub 主页访问地址" v-if="isGithubChecked">
          <el-input
            v-model="form.githubHomepage"
            clearable
            placeholder="请输入 GitHub 主页访问的 URL"
          />
        </el-form-item>

        <!-- 开启 Gitee 访问 -->
        <el-form-item label="开启 Gitee 访问">
          <el-switch
            v-model="isGiteeChecked"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            @change="giteeSwitchChange"
          />
        </el-form-item>
        <el-form-item label="Gitee 主页访问地址" v-if="isGiteeChecked">
          <el-input
            v-model="form.giteeHomepage"
            clearable
            placeholder="请输入 Gitee 主页访问的 URL"
          />
        </el-form-item>

        <!-- 开启 CSDN 访问 -->
        <el-form-item label="开启 CSDN 访问">
          <el-switch
            v-model="isCSDNChecked"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            @change="csdnSwitchChange"
          />
        </el-form-item>
        <el-form-item label="CSDN 主页访问地址" v-if="isCSDNChecked">
          <el-input
            v-model="form.csdnHomepage"
            clearable
            placeholder="请输入 CSDN 主页访问的 URL"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="btnLoading">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { Check, Close } from "@element-plus/icons-vue";
import { getBlogSettings, updateBlogSettings } from "@/api/admin/blogsettings";
import { uploadFile } from "@/api/admin/file";
import { showMessage } from "@/composables/utils";
const form = reactive({
  name: "",
  author: "",
  logo: "",
  avatar: "",
  introduction: "",
  githubHomepage: "",
  giteeHomepage: "",
  csdnHomepage: "",
});
const rules = {
  name: [{ required: true, message: "请输入博客名称", trigger: "blur" }],
  author: [{ required: true, message: "请输入作者名", trigger: "blur" }],
  logo: [{ required: true, message: "请上传博客 LOGO", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传作者头像", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍语", trigger: "blur" }],
};
// 是否开启 GitHub
const isGithubChecked = ref(false);
// 是否开启 Gitee
const isGiteeChecked = ref(false);
// 是否开启知乎
const isZhihuChecked = ref(false);
// 是否开启 CSDN
const isCSDNChecked = ref(false);
// 监听 Github Switch 改变事件
const githubSwitchChange = (checked) => {
  if (checked == false) {
    form.githubHomepage = "";
  }
};

// 监听 Gitee Switch 改变事件
const giteeSwitchChange = (checked) => {
  if (checked == false) {
    form.giteeHomepage = "";
  }
};

// 监听 CSDN Switch 改变事件
const csdnSwitchChange = (checked) => {
  if (checked == false) {
    form.csdnHomepage = "";
  }
};
function initBlogSettings() {
  getBlogSettings().then((res) => {
    if (res.success == true) {
      // 设置表单数据
      form.name = res.data.name;
      form.author = res.data.author;
      form.logo = res.data.logo;
      form.avatar = res.data.avatar;
      form.introduction = res.data.introduction;
      if (res.data.githubHomepage) {
        isGithubChecked.value = true;
        form.githubHomepage = res.data.githubHomepage;
      }
      if (res.data.giteeHomepage) {
        isGiteeChecked.value = true;
        form.giteeHomepage = res.data.giteeHomepage;
      }
      if (res.data.csdnHomepage) {
        isCSDNChecked.value = true;
        form.csdnHomepage = res.data.csdnHomepage;
      }
    }
  });
}
initBlogSettings();
const handleLogoChange = (file) => {
  let formData = new FormData();
  formData.append("file", file.raw);
  uploadFile(formData).then((e) => {
    // 响参失败，提示错误消息
    if (e.success == false) {
      let message = e.message;
      showMessage(message, "error");
      return;
    }

    // 成功则设置 logo 链接，并提示成功
    form.logo = e.data.url;
    showMessage("Logo上传成功");
  });
};
const handleAvatarChange = (file) => {
  let formData = new FormData();
  formData.append("file", file.raw);
  uploadFile(formData).then((e) => {
    // 响参失败，提示错误消息
    if (e.success == false) {
      let message = e.message;
      showMessage(message, "error");
      return;
    }

    // 成功则设置 avatar 链接，并提示成功
    form.avatar = e.data.url;
    showMessage("头像上传成功");
  });
};
// 表单引用
const formRef = ref(null);
const btnLoading = ref(false);
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      console.log("表单验证不通过");
      return false;
    }
    btnLoading.value = true;
    updateBlogSettings(form)
      .then((res) => {
        if (res.success == true) {
          // 对数据进行重新初始化，回显？
          initBlogSettings()
          showMessage("保存成功");
        } else {
          let message = res.message;
          showMessage(message, "error");
        }
      })
      .finally(() => {
        btnLoading.value = false;
      });
  });
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<style>
/* 这里因为样式冲突，element-plus的样式被覆盖，设置以下解决 textarea :focus 状态下，边框消失的问题 */
.el-textarea__inner:focus {
  outline: 0 !important;
  box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>