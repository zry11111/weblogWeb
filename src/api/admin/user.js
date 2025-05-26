import axios from "@/axios";

// 登录接口
export function login(username, password) {
    return axios.post("/login", {username, password})
}
export function getUserInfo() {
    return axios.get("/admin/user/info")
}
// 修改用户密码
export function updateAdminPassword(data) {
    return axios.post("/admin/password/update", data)
}
