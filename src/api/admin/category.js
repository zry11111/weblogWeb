import axios from '@/axios'
//c查询分类列表
export function getCategoryPageList(data){
    return axios.post("/admin/category/list",data)
}
// 添加分类
export function addCategory(data) {
    return axios.post("/admin/category/add", data)
}
