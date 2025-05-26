import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserInfo } from "@/api/admin/user";
import { removeToken } from '@/composables/cookie'
export const useUserStore = defineStore(
  "user",
  () => {
    // 用户信息
    const userInfo = ref({});

    // 设置用户信息
    function setUserInfo() {
      // 调用后头获取用户信息接口
      getUserInfo().then((res) => {
        if (res.success == true) {
          userInfo.value = res.data;
          console.log("用户信息", userInfo.value);
        }
      });
    }
    function logout() {
      // 清除 token
      removeToken();
      // 清除用户信息
      userInfo.value = {};
    }
    return { userInfo, setUserInfo,logout };
  },
  {
    // 开启持久化
    persist: true,
  }
);
