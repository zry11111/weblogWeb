import axios from "axios"
import { getToken } from "@/composables/cookie"
import { showMessage } from "@/composables/utils";
import { useUserStore } from "@/stores/user"
const instance = axios.create({
    baseURL: "/api",
    timeout: 7000, // 请求超时时间
    // headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    // },
})
instance.interceptors.request.use(
    function(config){
        //在发送请求之前做一些处理
        // 比如这里在每个请求头部添加token
        const token = getToken()
        if(token){
            //当token存在时，添加到请求头中
            config.headers["Authorization"] = "Bearer " + token
        }
        return config;
    },
    function(error){
        // 请求错误时做些事
        return Promise.reject(error);
    }
)
instance.interceptors.response.use(
    function(response){
        // 对响应数据做些事
        return response.data;
    },
    // 当响应状态码大于2XX时调用
    function(error){
        let status = error.response.status
        if(status === 401){
            let useStore = useUserStore()
            useStore.logout() // 清除用户信息
            //刷新页面，或者将用户重定向到登录页面，这里要导入路由，算了
            location.reload()
        }
        let message = error.response.data.message || '请求失败'
        showMessage(message, 'error')

        return Promise.reject(error);
    }
)
export default instance