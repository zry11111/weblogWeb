<template>
  <div class="bg-white h-[64px] flex pr-4 border-b border-slate-100">
    <!-- 左边栏收缩、展开 -->
    <div
      class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
      @click="handleMenuWidth"
    >
      <!-- 加一层div 防止Element Plus 内部的样式覆盖 Tailwind CSS 的样式 -->
      <el-icon>
        <Fold v-if="menuStore.menuWidth == '250px'" />
        <Expand v-else />
      </el-icon>
    </div>

    <!-- 右边容器，通过 ml-auto 让其在父容器的右边 -->
    <div class="ml-auto flex">
      <!-- 点击刷新页面 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="刷新"
        placement="bottom"
      >
        <div
          class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
          @click="handleRefresh"
        >
          <el-icon>
            <Refresh />
          </el-icon>
        </div>
      </el-tooltip>
      <!-- 点击全屏展示 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="全屏"
        placement="bottom"
      >
        <div
          class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 mr-2 hover:bg-gray-200"
          @click="toggle"
        >
          <el-icon>
            <FullScreen v-if="!isFullscreen" />
            <Aim v-else />
          </el-icon>
        </div>
      </el-tooltip>

      <!-- 登录用户头像 -->
      <el-dropdown
        class="flex items-center justify-center"
        @command="handleCommand"
      >
        <span
          class="el-dropdown-link flex items-center justify-center text-gray-700 text-xs"
        >
          <!-- 头像 Avatar -->
          <el-avatar :size="25" src="/mikufans.jpg" />
          {{ userStore.userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="updatePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!-- 修改密码 -->
  <!-- <el-dialog
    v-model="dialogVisible"
    title="修改密码"
    width="40%"
    :draggable="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="formRef" :rules="rules" :model="form">
      <el-form-item label="用户名" prop="username" label-width="120px">
        <el-input
          size="large"
          v-model="form.username"
          placeholder="请输入用户名"
          clearable
          disabled
        />
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="120px">
        <el-input
          size="large"
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword" label-width="120px">
        <el-input
          size="large"
          type="password"
          v-model="form.rePassword"
          placeholder="请确认密码"
          clearable
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog> -->
  <!-- 这里把修改密码的表单对话框组件也修改一下 -->
  <FormDialog
    ref="formDialogRef"
    title="修改密码"
    confirmText="确认"
    destroyOnClose
    @submit="onSubmit"
  >
    <el-form ref="formRef" :rules="rules" :model="form">
      <el-form-item label="用户名" prop="username" label-width="120px">
        <el-input
          size="large"
          v-model="form.username"
          placeholder="请输入用户名"
          clearable
          disabled
        />
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="120px">
        <el-input
          size="large"
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword" label-width="120px">
        <el-input
          size="large"
          type="password"
          v-model="form.rePassword"
          placeholder="请确认密码"
          clearable
          show-password
        />
      </el-form-item>
    </el-form>
  </FormDialog>
</template>
<script setup>
import { useMenuStore } from "@/stores/menu";
import { useFullscreen } from "@vueuse/core";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { showModel, showMessage } from "@/composables/utils";
import { ref, reactive, watch } from "vue";
import { updateAdminPassword } from "@/api/admin/user";
import FormDialog from "@/components/FormDialog.vue";
import { Dial } from "flowbite";
const router = useRouter();
const { isFullscreen, toggle } = useFullscreen();
const userStore = useUserStore();
// 对话框
const formDialogRef = ref(null);

// 引入了菜单 store
const menuStore = useMenuStore();
// 表单引用
const formRef = ref(null);
// 修改用户密码表单对象
const form = reactive({
  username: userStore.userInfo.username || "",
  password: "",
  rePassword: "",
});

// 规则校验
const rules = {
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
  ],
  rePassword: [
    {
      required: true,
      message: "确认密码不能为空",
      trigger: "blur",
    },
  ],
};

// icon 点击事件
const handleMenuWidth = () => {
  console.log("点击了菜单收缩按钮");
  // 动态设置菜单的宽度大小
  menuStore.handleMenuWidth();
  console.log(menuStore.menuWidth);
};
const handleRefresh = () => location.reload();
// 下拉菜单事件处理
const handleCommand = (command) => {
  // 更新密码
  if (command == "updatePassword") {
    formDialogRef.value.open();
    // 省略...
  } else if (command == "logout") {
    // 退出登录
    logout();
  }
};

// 退出登录
function logout() {
  showModel("是否确认要退出登录？").then(() => {
    userStore.logout();
    showMessage("退出登录成功！");
    // 跳转登录页
    router.push("/login");
  });
}
const onSubmit = () => {
  // formDialogRef.value.close()
  // 先验证 form 表单字段
  formRef.value.validate((valid) => {
    if (!valid) {
      console.log("表单验证不通过");
      return false;
    }
    formDialogRef.value.showBtnLoading();
    if (form.password != form.rePassword) {
      showMessage("两次密码输入不一致，请检查！", "warning");
      return;
    }

    // 调用修改用户密码接口
    updateAdminPassword(form).then((res) => {
      console.log(res);
      // 判断是否成功
      if (res.success == true) {
        showMessage("密码重置成功，请重新登录！");
        // 退出登录
        userStore.logout();

        // 关闭表单
        formDialogRef.value.close();

        // 跳转登录页
        router.push("/login");
      } else {
        // 获取服务端返回的错误消息
        let message = res.message;
        // 提示消息
        showMessage(message, "error");
      }
    }).finally(() => {
      formDialogRef.value.closeBtnLoading();
    });
  });
};
// 监听 Pinia store 中值的变化,将用户名同步到表单中
watch(
  () => userStore.userInfo.username,
  (newValue, oldValue) => {
    form.username = newValue;
  }
);
</script>
