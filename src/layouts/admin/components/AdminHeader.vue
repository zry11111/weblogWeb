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
      <el-dropdown class="flex items-center justify-center">
        <span
          class="el-dropdown-link flex items-center justify-center text-gray-700 text-xs"
        >
          <!-- 头像 Avatar -->
          <el-avatar :size="25" src="/mikufans.jpg" />Admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useMenuStore } from "@/stores/menu";
import { useFullscreen } from "@vueuse/core";
const { isFullscreen, toggle } = useFullscreen();

// 引入了菜单 store
const menuStore = useMenuStore();

// icon 点击事件
const handleMenuWidth = () => {
  console.log("点击了菜单收缩按钮");
  // 动态设置菜单的宽度大小
  menuStore.handleMenuWidth();
  console.log(menuStore.menuWidth);
};
const handleRefresh = () => location.reload();
</script>
