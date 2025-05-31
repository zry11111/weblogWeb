<template>
  <!-- 使用 grid 网格布局，并指定列数为 2，高度占满全屏 -->
  <div class="grid grid-cols-2 h-screen">
    <!-- 默认先适配移动端，占两列，order 用于指定排列顺序，md 用于适配非移动端（PC 端）；背景色为黑色 -->
    <div class="col-span-2 order-2 p-10 md:col-span-1 md:order-1 bg-green-300">
      <!-- 指定为 flex 布局，并设置为屏幕垂直水平居中，高度为 100% -->
      <div
        class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInLeft animate__fast"
      >
        <h2 class="font-bold text-4xl mb-7 text-white">WebBlog 博客登录</h2>
        <!-- 指定图片宽度为父级元素的 1/2 -->
        <img src="@/assets/mikufans.jpg" class="w-1/2" />
      </div>
    </div>
    <div class="col-span-2 order-1 md:col-span-1 md:order-2 bg-white">
      <!-- flex-col 用于指定子元素垂直排列 -->
      <div
        class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInRight animate__fast"
      >
        <!-- 大标题，设置字体粗细、大小、下边距 -->
        <h1 class="font-bold text-4xl mb-5">欢迎回来</h1>
        <!-- 设置 flex 布局，内容垂直水平居中，文字颜色，以及子内容水平方向 x 轴间距 -->
        <div
          class="flex items-center justify-center mb-7 text-gray-400 space-x-2"
        >
          <!-- 左边横线，高度为 1px, 宽度为 16，背景色设置 -->
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>账号密码登录</span>
          <!-- 右边横线 -->
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <!-- 移动端设置宽度为 5/6，PC 端设置为 2/5 -->
        <el-form class="w-5/6 md:w-2/5" ref="formRef" :rules="rules" :model="form">
          <el-form-item prop="username">
            <!-- 输入框组件 -->
            <el-input
              size="large"
              placeholder="请输入用户名"
              :prefix-icon="User"
              clearable
              v-model="form.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <!-- 密码框组件 -->
            <el-input
              size="large"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              clearable
              v-model="form.password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <!-- 登录按钮，宽度设置为 100% -->
            <el-button
              class="w-full"
              size="large"
              type="primary"
              @click="onSubmit"
              :loading="loading"
            >
              登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { login } from "@/api/admin/user";
import { ref, reactive,onMounted,onBeforeUnmount} from "vue";
import router from "@/router";
import { showMessage } from "@/composables/utils";
import { setToken } from "@/composables/cookie";
import { useUserStore } from "@/stores/user"
const userStore = useUserStore()
const form = reactive({
  username: "稚生1234",
  password: "123456",
});
// 登录状态加载
const loading = ref(false);
const formRef = ref(null);
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
};
const onSubmit = () => {
  console.log("登录");
  formRef.value.validate((valid) => {
    if (!valid) {
      console.log("验证失败");
      return false;
    }
    loading.value = true;
    login(form.username, form.password).then((res) => {
      console.log(res);
      if (res.success == true) {
        showMessage("登录成功");
        // 设置 token
        setToken(res.data.token)
        // 设置用户信息，在 方法中调用获取用户信息的接口
        userStore.setUserInfo()
        router.push("/admin/index");
      }else{
        showMessage(res.message,"error")
      }
    })
    .finally(() => {
      loading.value = false;
    });
  });
};
// 按回车键后，执行登录事件
function onKeyUp(e) {
    console.log(e)
    if (e.key == 'Enter') {
        onSubmit()
    }
}

// 添加键盘监听
onMounted(() => {
    // console.log('添加键盘监听')
    document.addEventListener('keyup', onKeyUp)
})

// 移除键盘监听
onBeforeUnmount(() => {
    document.removeEventListener('keyup', onKeyUp)
})
</script>