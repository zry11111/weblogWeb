import axios from '@/axios';
export function getBlogSettings() {
    return axios.post("/admin/blog/settings/detail")
}
// 更新博客设置
export function updateBlogSettings(data) {
    return axios.post("/admin/blog/settings/update", data)
}
